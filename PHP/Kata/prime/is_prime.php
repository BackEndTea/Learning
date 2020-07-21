<?php

namespace Kata\prime;

use SplFixedArray;
use function range;

function is_prime(int $n): bool {
    if ($n === 2) {
        return true;
    }

    if ($n < 2) {
        return false;
    }

    $range = new SplFixedArray($n +1);

    for($i = 2; $i < $n; $i ++) {
        if($range[$i] !== null) {
            continue;
        }

        try {
            $pow = $i ** 2;
            if($pow <= $n) {
                $innerRange = @range($i ** 2, $n, $i) ?: [];
            } else {
                $innerRange = [];
            }
            //PHP 8.0 compatibility
        } catch (\ValueError $e) {
            $innerRange = [];
        }

        foreach ($innerRange as $nonPrime) {
            $range[$nonPrime] = true;

            if ($n === $nonPrime) {
                return false;
            }
        }
    }
    return true;
}
