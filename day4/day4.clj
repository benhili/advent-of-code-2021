(require '[clojure.string :as str])

(def input (str/split (slurp "day4/day4-input.txt") #"\n\n"))

(def board-input (->> input
                      rest
                      (map #(str/split % #"\n"))))

(def moves (map #(Integer/parseInt %) (-> input first (str/split #","))))

(defn parse-board [board]
  (map (fn [row]
         (map #(Integer/parseInt %) (-> row
                                        (str/trim)
                                        (str/split #"\s+"))))
       board))

(def boards
  (map parse-board board-input))

(defn line-complete? [line moves] (let [move-set (set moves)] (every? (set move-set) line)))

(defn winning-board?
  [board moves]
  (or
   (not (nil? (some #(line-complete? % moves) board)))
   (not (nil? (some #(line-complete? % moves) (apply map list board))))))

(defn calculate-score
  [board steps]
  (* (->> (flatten board)
          (remove (set steps))
          (reduce +))
     (last steps)))

(defn part1 []
  (loop [n 1]
    (or
     (let [steps (take n moves)]
       (some-> boards #(winning-board? % steps) (calculate-score steps)))
     (recur (inc n)))))


(let [steps (take 30 moves)]
  (some #(winning-board? % steps) boards))

(print "Part 1" (part1))
;; TODO (print "Part 2" (part2))

