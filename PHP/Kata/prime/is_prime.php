<?php

namespace Kata\prime;

function is_prime(int $n): bool {
    if ($n <= 3) {
        return $n > 1;
    }

    if ($n % 2 === 0 || $n % 3 === 0) {
        return false;
    }

    $i = 5;

    while ($i**2 <= $n) {
        if($n % $i === 0 || $n % ($i +2) === 0) {
            return false;
        }

        $i +=6;
    }

    return true;
}
