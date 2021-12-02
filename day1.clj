(require '[clojure.string :as str])

(def depths (map read-string (str/split (slurp "day1-input.txt") #"\n")))

(reduce (fn [count [prev next]]
          (cond (< prev next) (inc count)
                :else count))
        0 (partition 2 1 depths))
