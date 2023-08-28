import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AiOutlineLineChart } from "react-icons/ai";
import { Container } from "react-bootstrap";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const AdminChartCard = ({ inscriptionDates, setInscriptionDates }) => {
  const [chartData, setChartData] = useState(null);

  const countDatesPerMonth = (dateArray) => {
    const counts = Array(12).fill(0);

    dateArray.forEach((dateObj) => {
      const dateStr = dateObj.start_date;
      const dateObjParsed = new Date(dateStr);
      const month = dateObjParsed.getMonth();

      counts[month]++;
    });

    return counts;
  };

  useEffect(() => {
    if (inscriptionDates && inscriptionDates.length > 0) {
      const dateCounts = countDatesPerMonth(inscriptionDates);

      const data = {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Inscripciones totales por año",
            data: dateCounts,
            backgroundColor: "#f7ac1652",
            borderColor: "#f7ab16",
            tension: 0.4,
            fill: true,
          },
        ],
      };

      setChartData(data);
    }
  }, [inscriptionDates]);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },

    maintainAspectRatio: false,
  };
  return (
    <Container className="adminTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineLineChart />{" "}
          </div>
          <div>
            <h5 className="titleText">Inscripciones</h5>
          </div>
        </div>

        <div className="adTable">
          {chartData ? (
            <Line data={chartData} options={options} className="grafica" />
          ) : (
            <h5 className="text-center">Sin resultados</h5>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AdminChartCard;
