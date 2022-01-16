(require '[clojure.string :as str])

(def data
  (->> (str/split (slurp "day2/day2-input.txt") #"\n")
       (map #(let [[_ direction value] (re-matches #"([a-z]+) (\d)" %)]
               [(keyword direction) (Integer/parseInt value)]))))

(defn part-1
  []
  (let [[depth position]
        (reduce (fn [[depth position] [direction value]]
                  (case direction
                    :forward [depth (+ position value)]
                    :down [(+ depth value) position]
                    :up [(- depth value) position]))
                [0 0]
                data)]
    (* depth position)))

(defn part-2
  []
  (let [[depth position]
        (reduce (fn [[depth position aim] [direction value]]
                  (case direction
                    :forward [(+ depth (* aim value)) (+ position value) aim]
                    :down [depth position (+ aim value)]
                    :up [depth position (- aim value)]))
                [0 0 0]
                data)]
    (* depth position)))

(print "Part 1" (part-1))

(print "Part 2" (part-2))
