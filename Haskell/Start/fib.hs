slow_fib :: Int -> Integer
slow_fib 0 = 0
slow_fib 1 = 1
slow_fib n = slow_fib(n -2) + slow_fib(n-1)

mem_fib :: Int -> Integer
mem_fib = (map fib [0 ..] !!)
   where fib 0 = 0
         fib 1 = 1
         fib n = mem_fib (n-2) + mem_fib (n-1)
