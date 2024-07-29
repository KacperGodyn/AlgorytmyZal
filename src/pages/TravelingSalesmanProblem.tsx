import React, { useEffect, useRef, useState } from 'react';

type Point = {
  x: number;
  y: number;
  label: string;
};

export const TravelingSalesmanProblem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [numPoints] = useState<number>(100);
  const [startPoint, setStartPoint] = useState<number>(0);
  const [endPoint, setEndPoint] = useState<number>(0);

  useEffect(() => {
    generatePoints();
  }, []);

  const generatePoints = () => {
    if (!canvasRef.current) return;
    const newPoints: Point[] = [];
    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * canvasRef.current.width;
      const y = Math.random() * canvasRef.current.height;
      newPoints.push({ x, y, label: `Punkt ${i + 1}` });
    }
    setPoints(newPoints);
    updateDropdowns(newPoints);
    updatePoints(newPoints, startPoint, endPoint);
  };

  const updateDropdowns = (points: Point[]) => {
    const startPointSelect = document.getElementById('startPoint') as HTMLSelectElement;
    const endPointSelect = document.getElementById('endPoint') as HTMLSelectElement;
    startPointSelect.innerHTML = '';
    endPointSelect.innerHTML = '';
    points.forEach((point, index) => {
      startPointSelect.options.add(new Option(point.label, index.toString()));
      endPointSelect.options.add(new Option(point.label, index.toString()));
    });
  };

  const updatePoints = (points: Point[], start: number, end: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach((point, index) => {
      drawPoint(ctx, point.x, point.y, index === start ? 'green' : index === end ? 'red' : 'black', 5);
    });
  };

  const solveTSP = () => {
    const start = parseInt((document.getElementById('startPoint') as HTMLSelectElement).value);
    const end = parseInt((document.getElementById('endPoint') as HTMLSelectElement).value);
    let current = points[start];
    let path = [current];
    let toVisit = points.filter((_, index) => index !== start && index !== end);

    while (toVisit.length > 0) {
      let next = toVisit.reduce((nearest, point) =>
        distance(current, point) < distance(current, nearest) ? point : nearest, toVisit[0]);
      path.push(next);
      toVisit = toVisit.filter(point => point !== next);
      current = next;
    }

    path.push(points[end]);
    drawPath(path);
  };

  const drawPath = (path: Point[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach(point => {
      ctx.lineTo(point.x, point.y);
      ctx.strokeStyle = 'green';
      ctx.stroke();
    });
    ctx.lineTo(path[0].x, path[0].y);
    ctx.stroke();
  };

  const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size: number) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fill();
  };

  const distance = (point1: Point, point2: Point) => {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Problem Komiwojażera</h1>
      <div className="flex justify-center mb-4">
        <canvas ref={canvasRef} id="tspCanvas" width={800} height={600} className="border border-gray-300"></canvas>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Startowy punkt:
            <select 
              id="startPoint" 
              onChange={(e) => setStartPoint(parseInt(e.target.value))}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            ></select>
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Końcowy punkt:
            <select 
              id="endPoint" 
              onChange={(e) => setEndPoint(parseInt(e.target.value))}
              className="ml-2 border border-gray-300 rounded px-2 py-1"
            ></select>
          </label>
        </div>
        <button 
          onClick={solveTSP} 
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Rozwiąż TSP
        </button>
      </div>
    </div>
  );
};
