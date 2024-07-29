import React, { useState } from 'react';

export const SieveOfEratosthenes: React.FC = () => {
  const [limit, setLimit] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const findPrimes = () => {
    const limitNum = parseInt(limit);
    if (isNaN(limitNum) || limitNum <= 1) {
      setResult('Proszę wprowadzić poprawną liczbę.');
      return;
    }
    const primeNumbers = sieveOfEratosthenes(limitNum);
    setResult(
      `Liczby pierwsze do ${limit}: ${primeNumbers.join(', ')}<br/>` +
      `Pary liczb pierwszych: ${formatPairs(pairPrimes(primeNumbers))}<br/>` +
      `Czwórki liczb pierwszych: ${formatQuadruplets(findPrimeQuadruplets(primeNumbers))}`
    );
  };

  const sieveOfEratosthenes = (n: number): number[] => {
    const primes = new Array(n + 1).fill(true);
    primes[0] = primes[1] = false;

    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (primes[i]) {
        for (let j = i * i; j <= n; j += i) {
          primes[j] = false;
        }
      }
    }

    return primes.reduce<number[]>((acc, isPrime, index) => {
      if (isPrime) acc.push(index);
      return acc;
    }, []);
  };

  const pairPrimes = (primeNumbers: number[]): [number, number][] => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < primeNumbers.length - 1; i++) {
      pairs.push([primeNumbers[i], primeNumbers[i + 1]]);
    }
    return pairs;
  };

  const findPrimeQuadruplets = (primes: number[]): [number, number, number, number][] => {
    const quadruplets: [number, number, number, number][] = [];
    for (let i = 0; i < primes.length - 3; i++) {
      if (primes[i + 3] - primes[i] === 8 && ![3].some(num => primes.slice(i, i + 4).includes(num))) {
        quadruplets.push([primes[i], primes[i + 1], primes[i + 2], primes[i + 3]]);
      }
    }
    return quadruplets;
  };

  const formatPairs = (pairs: [number, number][]): string => {
    return pairs.map(pair => `(${pair[0]}, ${pair[1]})`).join(', ');
  };

  const formatQuadruplets = (quadruplets: [number, number, number, number][]): string => {
    return quadruplets.map(quadruplet => `(${quadruplet.join(', ')})`).join(', ');
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Sito Eratostenesa</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Limit:
            <input 
              type="text" 
              value={limit} 
              onChange={(e) => setLimit(e.target.value)} 
              className="ml-2 border border-gray-300 rounded px-2 py-1 w-full max-w-xs"
              placeholder="Wprowadź limit"
            />
          </label>
        </div>
        <button 
          id="solveButton" 
          onClick={findPrimes} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Znajdź liczby pierwsze
        </button>
      </div>
      <div 
        id="result" 
        className="mt-4 text-gray-800 text-lg" 
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
};
