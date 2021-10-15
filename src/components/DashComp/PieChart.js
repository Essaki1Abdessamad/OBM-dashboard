import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import  Chart  from "chart.js/auto";

const labels = ["Clicks", "Impressions", "Interactions"];
const data = {
  labels: labels,
  datasets: [
    {
      data: [50, 200, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(56, 168, 108)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
};

const chartConfig = {
  type: "doughnut",
  data: data,
  options: {
    maintainAspectRatio: false,
    cutout: 80,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  },
};

function PieChart() {
  const chartContainer = useRef(null);
  const [, setChart] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chartInstance = new Chart(chartContainer.current, chartConfig);
      chartInstance.canvas.parentNode.style.height = "380px";
      setChart(chartInstance);
    }
    return () => {
      chartContainer.current = null;
      setChart(null);
    };
  }, [chartContainer]);

  return (
    <div className="col-lg-4">
      <div className="card shadow">
        <div className="card-header py-3 text-primary fw-bold">Campaign Funnels</div>
        <div className="card-body">
          <canvas ref={chartContainer} />
        </div>
      </div>
    </div>
  );
}

export default PieChart;
