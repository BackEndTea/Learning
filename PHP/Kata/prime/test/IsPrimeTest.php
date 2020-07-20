<?php

namespace Kata\prime\test;

use PHPUnit\Framework\TestCase;
use function Kata\prime\is_prime;

final class IsPrimeTest extends TestCase
{
    public function testExamples(): void
    {
        self::assertFalse(is_prime(0));
        self::assertFalse(is_prime(1));
        self::assertTrue(is_prime(2));
        self::assertTrue(is_prime(5), 'Your function should work for the example provided in the Kata Description');
    }
}
