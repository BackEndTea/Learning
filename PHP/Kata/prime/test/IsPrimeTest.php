<?php

namespace Kata\prime\test;

use Generator;
use PHPUnit\Framework\TestCase;
use function Kata\prime\is_prime;

final class IsPrimeTest extends TestCase
{
    /**
     * @dataProvider providePrimes
     *
     * @testdox Detect $prime is a prime
     */
    public function testPrimes(int $prime): void
    {
        self::assertTrue(is_prime($prime));
    }


    public function providePrimes(): Generator
    {
        yield [2];
        yield [3];
        yield [5];
        yield [7];
        yield [11];
        yield [8191];
        yield [524287];

        yield [1000004249];
        yield [5234571809];
        yield [9294971353];
        yield [9294972289];
    }

    /**
     * @dataProvider provideNonPrimes
     * Negative numbers are not primes by definition
     * @dataProvider provideNegativeNumbers
     *
     * @testdox Detect $nonPrime is not a prime
     */
    public function testNonPrimes(int $nonPrime): void
    {
        self::assertFalse(is_prime($nonPrime));
    }

    public function provideNonPrimes(): Generator
    {
        yield [1];
        yield [4];
        yield [6];
        yield [8];
        yield [9];
        yield [10];
        yield [2047];
        yield [10000];
        yield [100000];
        yield [8388607];
        yield [5234571811];
        yield [5234571813];
    }

    public function provideNegativeNumbers(): Generator
    {
        yield [-12];
        yield [-8];
        yield [-7];
    }
}
