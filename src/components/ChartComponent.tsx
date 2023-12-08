import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Company {
  companyName: string;
  raisedCapital: number;
  turnover: number;
}

const ChartComponent = ({ company }: { company: Company }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!company || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Capital Raised", "Turnover"],
          datasets: [
            {
              label: company.companyName,
              data: [company.raisedCapital, company.turnover],
              backgroundColor: [
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 99, 132, 0.5)",
              ],
              borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => myChart.destroy();
    }
  }, [company]);

  return (
    <div className="w-full">
      <div
        className="chart-container"
        style={{ position: "relative", height: "20vh", width: "100%" }}
      >
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
