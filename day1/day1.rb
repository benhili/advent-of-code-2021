file = File.open("day1-test-input.txt")
data = file.read.split("\n").map { |x| x.to_i }


counter = 0
data.each_with_index do |num, index|
  next if index + 1 == data.length

  nextnum = data[index+1]

  if num < nextnum
    counter += 1 
  end
end

puts(counter)
