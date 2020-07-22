<?php

namespace Kata\printer_errors\test;

use PHPUnit\Framework\TestCase;
use function Kata\printer_errors\printerError;

class PrinterErrorTest extends TestCase {
    private function revTest($actual, $expected) {
        $this->assertSame($expected, $actual);
    }
    public function testBasics() {
        $s="aaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbmmmmmmmmmmmmmmmmmmmxyz";
        $this->revTest(printerError($s), "3/56");
        $s = "kkkwwwaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbmmmmmmmmmmmmmmmmmmmxyz";
        $this->revTest(printerError($s), "6/60");
        $s = "kkkwwwaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbmmmmmmmmmmmmmmmmmmmxyzuuuuu";
        $this->revTest(printerError($s) , "11/65");
    }
}

