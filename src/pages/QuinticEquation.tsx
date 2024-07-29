import React, { useState } from 'react';

export const QuinticEquation: React.FC = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [e, setE] = useState<string>('');
  const [f, setF] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const solveQuintic = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);
    const dNum = parseFloat(d);
    const eNum = parseFloat(e);
    const fNum = parseFloat(f);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || isNaN(dNum) || isNaN(eNum) || isNaN(fNum)) {
      setResult('Proszę wprowadzić poprawne współczynniki.');
      return;
    }

    setResult('Obliczanie...');
    setTimeout(() => {
      const roots = newtonRaphsonMethod(aNum, bNum, cNum, dNum, eNum, fNum);
      setResult(`Pierwiastki: ${roots.map(r => r.toFixed(2)).join(', ')}`);
    }, 1000);
  };

  const newtonRaphsonMethod = (a: number, b: number, c: number, d: number, e: number, f: number) => {
    const fx = (x: number) => a * x ** 5 + b * x ** 4 + c * x ** 3 + d * x ** 2 + e * x + f;
    const dfx = (x: number) => 5 * a * x ** 4 + 4 * b * x ** 3 + 3 * c * x ** 2 + 2 * d * x + e;

    const roots: number[] = [];
    let guess = -10;
    while (guess < 10) {
      let x0 = guess;
      let x1;
      let iterations = 0;
      do {
        const fx0 = fx(x0);
        const dfx0 = dfx(x0);
        if (dfx0 === 0) break;
        x1 = x0 - fx0 / dfx0;
        x0 = x1;
        iterations++;
      } while (iterations < 100 && Math.abs(fx(x0)) > 0.0001);

      if (!roots.some(r => Math.abs(r - x0) < 0.1)) {
        roots.push(x0);
      }
      guess += 0.5;
    }
    return roots;
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Równanie piątego stopnia</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            a:
            <input 
              type="text" 
              value={a} 
              onChange={(e) => setA(e.target.value)} 
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            b:
            <input 
              type="text" 
              value={b} 
              onChange={(e) => setB(e.target.value)} 
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            c:
            <input 
              type="text" 
              value={c} 
              onChange={(e) => setC(e.target.value)} 
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            d:
            <input 
              type="text" 
              value={d} 
              onChange={(e) => setD(e.target.value)} 
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            e:
            <input 
              type="text" 
              value={e} 
              onChange={(e) => setE(e.target.value)} 
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            f:
            <input 
              type="text" 
              value={f} 
              onChange={(e) => setF(e.target.value)} 
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            />
          </label>
        </div>
      </div>
      <button 
        onClick={solveQuintic} 
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
      >
        Rozwiąż
      </button>
      <div id="result" className="mt-4 text-gray-800 text-lg">{result}</div>
    </div>
  );
};
