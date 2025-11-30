import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export function Diagramma({ hoursX, dataY }) {
  const totalCount = [];
  for (let value of dataY) {
    let a = Object.values(value).reduce((acc, el) => acc + el, 0);
    totalCount.push(a);
  }
  const remainder = 10 - ((Math.max(...totalCount) * 1.15) % 10);

  const options = {
    responsive: true,
    scales: {
      y: {
        max: Math.max(...totalCount) * 1.15 + remainder,
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        external: CustomTooltip,
      },
    },
  };

  const labels = hoursX.map((hour) =>
    hour < 10 ? `0${hour}:00` : `${hour}:00`
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: totalCount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        detailed: dataY,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
function createTooltip(chart) {
  let tooltipElement =
    chart.canvas.parentNode.querySelector(".chartjs-tooltip");
  if (!tooltipElement) {
    tooltipElement = `<div class = 'chartjs-tooltip'>
	<div class = 'tooltip-content'></div>
	</div>`;
    chart.canvas.parentNode.insertAdjacentHTML("beforeend", tooltipElement);
  }
  return tooltipElement;
}
function CustomTooltip(context) {
  const { tooltip, chart } = context;
  const element = createTooltip(chart);

  element.style.opacity = 1;

  console.log(typeof tooltip.opacity);

  if (tooltip.opacity === 0) {
    element.style.opacity = 0;
    return;
  }

  const index = tooltip.dataPoints?.[0]?.dataIndex;
  const products = chart.data.datasets?.[0]?.detailed[index];
  let text = ``;
  Object.keys(products).forEach((key) => {
    text += `<p><span>${key}</span> : <span>${products[key]}</span></p>`;
  });

  if (typeof element === "object") {
    element.querySelector(".tooltip-content").innerHTML = text;
  }
}
