<?php

namespace Kata\printer_errors;

use function in_array;
use function str_split;

function printerError(string $s): string {
    $allowedRange = range('a', 'm');

    $total = strlen($s);
    $incorrect = 0;

    foreach(str_split($s) as $char) {
        if(!in_array($char, $allowedRange, true)) {
            $incorrect++;
        }
    }

    return sprintf("%d/%d", $incorrect, $total);
}
