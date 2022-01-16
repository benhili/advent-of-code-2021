(defn parseInput
  [input]
  (-> input
      (str/split #"\n")))

(parseInput (slurp "day12/example.txt"))