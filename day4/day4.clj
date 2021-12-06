(require '[clojure.string :as str])

(def input (str/split (slurp "day4/day4-input.txt") #"\n\n"))
(def moves (str/split (first input) #","))
(def boards
  (->> input
       rest
       (map #(str/split % #"\n"))
       (map #(map (fn [x] 
                    (-> x
                        (str/trim)
                        (str/split #"\s+"))
                    ) %))))


(defn line-complete? [line moves] (every? (set moves) line))

(defn winning-board?
  [board moves]
  (or
    (not (nil? (some #(line-complete? % moves) board)))
    (not (nil? (some #(line-complete? % moves) (apply map list board))))
   ))

(defn sum-unmarked
  [board steps]
  (->> (-> board flatten) 
       (remove (set steps))
       (map #(Integer/parseInt %))
       (reduce +))
  )

(defn part1 [] (first (for [i (range (count moves))
       board boards
       :let [steps (take i moves)]
       :when (winning-board? board steps)] (* (sum-unmarked board steps) (Integer/parseInt (last steps))))))

(print "Part 1" (part1))
(print "Part 2" (part2))

