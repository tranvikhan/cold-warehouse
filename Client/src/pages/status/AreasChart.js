// @flow
import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
const { timeToString } = require("helpers/datetimeCover");
// StackedAreaChart

const AreasChart = (props) => {
  const apexAreaChart2Opts = {
    chart: {
      id: "realtime",

      stacked: false,
      events: {
        selection: function (chart, e) {
          console.log(new Date(e.xaxis.min));
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      width: 2,
      curve: "smooth",
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      itemMargin: {
        horizontal: 12,
        vertical: 5,
      },
    },
    xaxis: {
      type: "text",
    },

    yaxis: {
      labels: {
        show: true,
        formatter: (value) => {
          return Math.round(value * 100) / 100 + "°C";
        },
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#f1f3fa",
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
        },
      },
    ],
  };

  const areaData = useSelector((state) => state.RoomData.areaData);
  const data = () => {
    if (areaData) {
      if (areaData.length > 0)
        return areaData[0].areas.map((areaT, index) => {
          return {
            name: areaT.name,
            data: areaData.map((data) => ({
              x: timeToString(data.time),
              y: data.areas[index].average
                ? Math.round(data.areas[index].average * 100) / 100
                : Math.round(data.areas[index].value * 100) / 100,
            })),
          };
        });
    }
    return [];
  };
  const [crData, setCrData] = React.useState(data());
  React.useEffect(() => {
    setCrData(data());
  }, [areaData]);

  return (
    <Chart
      options={apexAreaChart2Opts}
      series={crData}
      type="line"
      className="apex-charts"
      height={450}
    />
  );
};

export default AreasChart;
