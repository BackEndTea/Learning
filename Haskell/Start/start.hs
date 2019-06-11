doubleMe x = x + x

doubleUs x y = doubleMe x + doubleMe y

doubleSmallNumber x = if x > 100
                        then x
                        else x*2

conanO'Brien = "It's a-me, Conan O'Brien!"

fac x =  product [1..x]

fac' x = if x == 1
            then x
            else x * fac (x - 1)

boomBangs xs = [ if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]

length' xs = sum [1 | _ <- xs]
