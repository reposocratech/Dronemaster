import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(LinearScale, CategoryScale, PointElement);

export const CourseStatsChart = ({ inscriptionDates }) => {
  console.log(inscriptionDates);
  const dateInMilliseconds = inscriptionDates?.map((date) =>
    new Date(date).getTime()
  );

  const data = {
    datasets: [
      {
        label: "Número de Alumnos",
        data: dateInMilliseconds?.map((timestamp, index) => ({
          x: timestamp,
          y: index + 1,
        })),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: {
            month: "MMM YYYY",
          },
        },
        title: {
          display: true,
          text: "Fechas de Inscripción",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Número de Alumnos",
        },
      },
    },
  };

  return (
    <div>
      <h2>Gráfica de Número de Alumnos</h2>
      <Line data={data} options={options} />
    </div>
  );
};
