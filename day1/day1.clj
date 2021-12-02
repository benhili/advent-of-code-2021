(require '[clojure.string :as str])

(def depths (map read-string (str/split (slurp "day1/day1-input.txt") #"\n")))

(print "Part 1:"
       (reduce (fn [count [prev next]]
                 (cond (< prev next) (inc count)
                       :else count))
         0
         (partition 2 1 depths)))

(def windows (map #(reduce + %) (partition 3 1 depths)))

(print "\nPart 2:"
       (reduce (fn [count [prev next]]
                 (cond (< prev next) (inc count)
                       :else count))
         0
         (partition 2 1 windows)))
