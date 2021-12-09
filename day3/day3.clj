(require '[clojure.string :as str])

(def input (slurp "day3/day3-input.txt"))

(defn invert [bits] (map #(- 1 %) bits))

(defn ones?
  [lines pos]
  (let [chars (map #(nth % pos) lines)
        {zeros \0, ones \1} (frequencies chars)]
    (>= ones zeros)))

(defn binary-to-decimal
  [binary]
  (-> binary
      str/join
      (Long/parseLong 2)))

(defn filter-by-frequency
  [lines keep-ones keep-zeros]
  (loop [lines lines
         pos 0]
    (if (<= (count lines) 1)
      lines
      (let [keep (if (ones? lines pos) keep-ones keep-zeros)]
        (recur (filter #(= keep (nth % pos)) lines) (inc pos))))))

(-> input
    str/split-lines
    (filter-by-frequency \0 \1)
    binary-to-decimal)

(defn part1
  [input]
  (let [lines (str/split-lines input)
        binary (for [pos (range (count (first lines)))]
                 (if (ones? lines pos) 1 0))
        gamma (binary-to-decimal binary)
        epsilon (binary-to-decimal (invert binary))]
    (* gamma epsilon)))

(defn part2
  [input]
  (let [lines (str/split-lines input)
        o2 (-> lines
               (filter-by-frequency \1 \0)
               binary-to-decimal)
        co2 (-> lines
                (filter-by-frequency \0 \1)
                binary-to-decimal)]
    (* o2 co2)))

(print "Part 1" (part1 input))
(print "Part 2" (part2 input))

