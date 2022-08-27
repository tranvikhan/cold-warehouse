// @flow
import React from 'react';
import Chart from 'react-apexcharts';

// StackedAreaChart
const StatusChart = () => {
    const apexAreaChart2Opts = {
        chart: {
            height: 380,
            type: 'area',
            stacked: true,
            events: {
                selection: function (chart, e) {
                    console.log(new Date(e.xaxis.min));
                },
            },
        },
        colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b'],
        dataLabels: {
            enabled: false,
        },

        stroke: {
            width: 2,
            curve: 'smooth',
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.6,
                opacityTo: 0.8,
            },
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            itemMargin: {
                horizontal: 12,
                vertical: 5,
            },
        },
        xaxis: {
            type: 'datetime',
        },

        yaxis: {
            labels: {
                show: true,
                formatter: (value) => {
                    return '-' + value + '°';
                },
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
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

    const generateDayWiseTimeSeries = (baseval, count, yrange) => {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    };

    const apexAreaChart2Data = [
        {
            name: 'KV Cá Ngừ',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 50, {
                min: 0,
                max: 40,
            }),
        },
        {
            name: 'KV Cá Tra',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 50, {
                min: 0,
                max: 20,
            }),
        },

        {
            name: 'KV Tôm',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 50, {
                min: 0,
                max: 35,
            }),
        },
    ];

    return (
        <Chart
            options={apexAreaChart2Opts}
            series={apexAreaChart2Data}
            type="area"
            className="apex-charts"
            height={450}
        />
    );
};

export default StatusChart;
