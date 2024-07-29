import React, { useState, useEffect } from 'react';

export const MonteCarlo: React.FC = () => {
  const [result, setResult] = useState<string>('');

  const calculateIntegral = () => {
    const numPoints = 100000;
    const a = 0;
    const b = Math.PI;
    let underCurve = 0;

    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * (b - a) + a;
      const y = Math.random() * 3;

      if (y < (Math.sin(x) + Math.sin(2 * x) + Math.sin(5 * x))) {
        underCurve++;
      }
    }

    const area = (underCurve / numPoints) * (b - a) * 3;
    setResult(`Przybliżona całka z f(x) = sin(x) + sin(2x) + sin(5x) od 0 do π wynosi ${area.toFixed(4)}`);
  };

  useEffect(() => {
    calculateIntegral();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Całkowanie Monte Carlo</h1>
      <div id="result" className="text-gray-800 text-lg">{result}</div>
    </div>
  );
};
