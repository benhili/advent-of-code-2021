(require '[clojure.string :as str])

(def data
  (->> (-> (slurp "day3/day3-input.txt")
           (str/split #"\n"))
       (map #(str/split % #""))
       (map #(map #(Long/parseLong %) %))))


(def gamma-rate
  (->> data
       (reduce (fn [total bits] (map + bits total)))
       (map (fn [num]
              (cond (< num (/ (count data) 2)) 1
                    :else 0)))
       ))

(def gamma (-> gamma-rate str/join (Long/parseLong 2)))
(def epsilon (-> (map #(- 1 %) gamma-rate) str/join (Long/parseLong 2)))

(print "Part 1"(* gamma epsilon))
