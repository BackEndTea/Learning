fizzes = cycle ["","","Fizz"]
buzzes = cycle ["","","","","Buzz"]
fbwords = zipWith (++) fizzes buzzes
numbers = map show [1..]
choice = max
fizzbuzz = zipWith choice fbwords numbers
fizzbuzz_take n  = take n fizzbuzz

fizzbuzz' = zipWith max (zipWith (++) (cycle ["","","Fizz"]) (cycle ["","","","","Buzz"])) (map show [1..])
fizzbuzz'_take n  = take n fizzbuzz
