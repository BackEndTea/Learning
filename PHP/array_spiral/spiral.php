<?php
/*
 * Given integers `n` and `m`, both
 * greater than 0, return a
 * rectangular array of size n by m
 * filled with integers 1 through
 * n*m, arranged in an inwards
 * spiral patter starting at the
 * top left. For example, given 3 and 5 you should return
 * 1,  2,  3,  4,  5
 * 12, 13, 14, 15, 6
 * 11, 10, 9,  8,  7
 */

declare(strict_types=1);

// Sample data
$n = 5;
$m = 3;


if(isset($argv[2])) {
    $n = (int)$argv[1];
    $m = (int)$argv[2];
}

$a = [[]];
foreach(range(1, $n*$m) as $current) {
    list($j, $i) = get_i_and_j($current, $n, $m);
    $a[$i][$j] = $current;
}

for ($i=0; $i < $m; $i++) {
    for ($j=0; $j < $n; $j++) {
        print(($a[$i][$j] ?? 'n/a') . "\t");
    }
    print("\n");
}

function get_i_and_j(int $current, int $n, int $m): array{
    // Top part
    if($current <= $n){
        return [$current -1, 0];
    }

    // Going down on the right
    if ($current <= $n+$m -1 ){
        return [$n -1, $current - $n];
    }

    // Going left on the bottom
    if ($current <= 2* $n +$m - 2) {
        return [(2* $n +$m - 2) - $current, $m -1 ];
    }

    // Going up on the left
    if ($current <= 2*$n + 2*$m -4) {
        return [0,(2*$n + 2*$m -4) - $current + 1];
    }
    // We are in an inner loop
    list($i, $j) = get_i_and_j($current - (2*$n + 2*$m -4), $n -2, $m - 2);
    return [$i +1, $j +1];
    // return [9,9];
}
