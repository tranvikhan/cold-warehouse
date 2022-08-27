import React from 'react';
import Chart from 'react-apexcharts';
import MySlice from '../../components/MySlice';

// StackedAreaChart
const Matrix = () => {
    const apexAreaChart2Opts = {
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: false,
                colorScale: {
                    ranges: [
                        {
                            from: -30,
                            to: -25,
                            name: 'low',
                            color: '#00A100',
                        },
                        {
                            from: -26,
                            to: -20,
                            name: 'medium',
                            color: 'hsl(144, 100%, 50%)',
                        },
                        {
                            from: -20,
                            to: -15,
                            name: 'high',
                            color: '#FFB200',
                        },
                        {
                            from: -15,
                            to: 0,
                            name: 'extreme',
                            color: '#FF0000',
                        },
                    ],
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 1,
        },
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    showLocation(config);
                },
            },
            toolbar: {
                show: false,
            },
        },

        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return (
                    '<div ><span class="badge badge-light shadow p-3 border-dark">' +
                    series[seriesIndex][dataPointIndex] +
                    ' °C</span></div>'
                );
            },
        },
    };
    const showLocation = function (context) {
        alert('x= ' + context.dataPointIndex + ' y= ' + context.seriesIndex);
    };
    const generateData = (count, yrange) => {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = i;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push([x, y]);
            i++;
        }
        return series;
    };
    const apexAreaChart2Data = [
        {
            name: '0',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
        {
            name: '1',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
        {
            name: '2',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
        {
            name: '3',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
        {
            name: '4',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
        {
            name: '5',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
        {
            name: '6',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
        {
            name: '7',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
        {
            name: '8',
            data: generateData(54, {
                min: -30,
                max: 0,
            }),
        },
    ];

    return (
        <>
            <Chart
                options={apexAreaChart2Opts}
                series={apexAreaChart2Data}
                type="heatmap"
                className="heatmap-charts"
                height={300}
            />
            <MySlice max={10} min={0} />
        </>
    );
};

export default Matrix;
