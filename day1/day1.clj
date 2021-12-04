(require '[clojure.string :as str])

(def data
  (map #(read-string %)
    (-> (slurp "day1/day1-input.txt")
        (str/split #"\n"))))

(defn count-depth
  [nums]
  (reduce (fn [count [prev next]]
            (cond (< prev next) (inc count)
                  :else count))
    0
    (partition 2 1 nums)))


(def windows
  (->> (partition 3 1 data)
       (map #(reduce + %))))

(print "Part 1:" (count-depth data))
(print "Part 2:" (count-depth windows))
