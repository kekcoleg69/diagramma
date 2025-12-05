import "./Diagramma.css";
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

export function Diagramma({ hoursX, dataY, selectOption }) {
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
        borderColor: selectOption === "by_goods" ? "#4F31E4" : "#2196F3",
        backgroundColor: "rgba(0, 0, 0, 0)",
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
  return chart.canvas.parentNode.querySelector(".chartjs-tooltip");
}
function CustomTooltip(context) {
  const { tooltip, chart } = context;
  const element = createTooltip(chart);
  element.style.opacity = 1;

  if (tooltip.opacity === 0) {
    element.style.opacity = 0;
    return;
  }

  const coords = chart.canvas.getBoundingClientRect();
  console.log(coords);

  const tooltipX = tooltip.caretX + coords.left + 10;
  const tooltipY = tooltip.caretY + coords.top + window.pageYOffset;

  element.style.top = `${tooltipY}px`;
  element.style.left = `${tooltipX}px`;

  const index = tooltip.dataPoints?.[0]?.dataIndex;
  const products = chart.data.datasets?.[0]?.detailed[index];
  let text = ``;
  Object.keys(products).forEach((key) => {
    text += `<p class = 'product'><span class = 'product__name'>${key}</span> <span class = 'product__value'>${products[key]}</span></p>`;
  });

  element.querySelector(".tooltip-content").innerHTML = text;
}
