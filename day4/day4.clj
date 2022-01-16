(require '[clojure.string :as str])

(def input (str/split (slurp "day4/day4-input.txt") #"\n\n"))

(def card-input (->> input
                     rest
                     (map #(str/split % #"\n"))))

(def moves (map #(Integer/parseInt %) (-> input first (str/split #","))))

(defn parse-card [card]
  (map (fn [row]
         (map #(Integer/parseInt %) (-> row
                                        (str/trim)
                                        (str/split #"\s+"))))
       card))

(def cards
  (map parse-card card-input))

(defn line-complete? [line moves] (let [move-set (set moves)] (every? (set move-set) line)))

(defn winning-card?
  [card moves]
  (or
   (not (nil? (some #(line-complete? % moves) card)))
   (not (nil? (some #(line-complete? % moves) (apply map list card))))))

(defn calculate-score
  "Add all uncalled numbers on the bingo card and multiply by the last call"
  [card calls]
  (* (->> (flatten card)
          (remove (set calls))
          (reduce +))
     (last calls)))

(defn partition-cards
  "Split cards into winning and losing cards given a set of bingo calls"
  [cards calls]
  (group-by #(winning-card? % calls) cards))

(defn part1 [cards]
  (loop [n 1]
    (let [calls  (take n moves)
          winner (first ((partition-cards cards calls) true))]
      (if winner
        (calculate-score winner calls)
        (recur (inc n))))))

(defn part2 [cards]
  (loop [n 1
         cards cards]
    (let [calls               (take n moves)
          partitioned-cards   (partition-cards cards calls)
          pending-cards       (partitioned-cards false)
          winner              (first (partitioned-cards true))]
      (if winner
        ; remove winning cards until theres only 1 card left
        (if (= (count cards) 1)
          (calculate-score winner calls)
          (recur (inc n) pending-cards))
        (recur (inc n) cards)))))

(print "Part 1" (part1 cards))
(print "Part 2" (part2 cards))
