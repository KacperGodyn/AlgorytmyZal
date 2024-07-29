import React, { useState } from 'react';

export const CubicEquation: React.FC = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const solveCubic = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);
    const dNum = parseFloat(d);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || isNaN(dNum)) {
      setResult('Proszę wprowadzić poprawne współczynniki.');
      return;
    }

    const w = -bNum / (3 * aNum);
    const p = (3 * aNum * cNum - bNum * bNum) / (3 * aNum * aNum);
    const q = (2 * bNum * bNum * bNum - 9 * aNum * bNum * cNum + 27 * aNum * aNum * dNum) / (27 * aNum * aNum * aNum);
    const discriminant = q * q / 4 + p * p * p / 27;

    if (discriminant > 0) {
      const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
      const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
      const x1 = u + v + w;
      setResult(`Jedno rzeczywiste rozwiązanie: x1 = ${x1.toFixed(2)}`);
    } else if (discriminant < 0) {
      const r = Math.sqrt(-p / 3);
      const phi = Math.acos(-q / (2 * r * r * r));
      const x1 = 2 * r * Math.cos(phi / 3) + w;
      const x2 = 2 * r * Math.cos((phi + 2 * Math.PI) / 3) + w;
      const x3 = 2 * r * Math.cos((phi + 4 * Math.PI) / 3) + w;
      setResult(`Trzy rzeczywiste rozwiązania: x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}, x3 = ${x3.toFixed(2)}`);
    } else {
      const x1 = 2 * Math.cbrt(-q / 2) + w;
      const x2 = -Math.cbrt(-q / 2) + w;
      setResult(`Podwójne rozwiązanie: x1, x2 = ${x1.toFixed(2)}, oraz pojedyncze rozwiązanie: ${x2.toFixed(2)}`);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Równanie sześcienne</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          a:
          <input 
            type="text" 
            value={a} 
            onChange={(e) => setA(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          b:
          <input 
            type="text" 
            value={b} 
            onChange={(e) => setB(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          c:
          <input 
            type="text" 
            value={c} 
            onChange={(e) => setC(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          d:
          <input 
            type="text" 
            value={d} 
            onChange={(e) => setD(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          />
        </label>
      </div>
      <button 
        onClick={solveCubic} 
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
      >
        Rozwiąż
      </button>
      <div id="result" className="mt-4 text-gray-800">{result}</div>
    </div>
  );
};
