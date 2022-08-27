import React from 'react';
import Chart from 'react-apexcharts';
import { DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, DropdownItem, Row, Col } from 'reactstrap';
import MySlice from '../../components/MySlice';
import SensorItem from './sensorItem';

const SensorMap = () => {
    const apexAreaChart2Opts = {
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: false,
                colorScale: {
                    ranges: [
                        {
                            from: -1,
                            to: -1,
                            name: 'no-Sensor',
                            color: '#000000',
                        },

                        {
                            from: 0,
                            to: 0,
                            name: 'Sensor',
                            color: '#00A100',
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
            enabled: false,
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
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
        {
            name: '1',
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
        {
            name: '2',
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
        {
            name: '3',
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
        {
            name: '4',
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
        {
            name: '5',
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
        {
            name: '6',
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
        {
            name: '7',
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
        {
            name: '8',
            data: generateData(20, {
                min: -1,
                max: 0,
            }),
        },
    ];
    const records = [
        { id: 'SR0212154', name: 'SP012', x: 1, y: 2, z: 0, status: 'RUNNING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'ACTIVE' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'ACTIVE' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'ACTIVE' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'ACTIVE' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'ACTIVE' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'RUNNING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'RUNNING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'SLEPPING' },
        { id: 'SR0216554', name: 'SP013', x: 0, y: 1, z: 1, status: 'RUNNING' },
    ];
    return (
        <>
            <Chart
                options={apexAreaChart2Opts}
                series={apexAreaChart2Data}
                type="heatmap"
                className="heatmap-charts"
                height={450}
            />

            <MySlice min={0} max={100} />

            <Row className="mb-2 mt-5">
                <Col sm={3}>
                    <h5>List sensor</h5>
                </Col>

                <Col sm={9}>
                    <div className="float-sm-right mt-3 mt-sm-0">
                        <UncontrolledButtonDropdown className="d-inline-block">
                            <DropdownToggle tag="button" className="btn btn-secondary btn-sm dropdown-toggle">
                                <i className="uil uil-filter"></i>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>All</DropdownItem>
                                <DropdownItem>Running</DropdownItem>
                                <DropdownItem>Slepping</DropdownItem>
                                <DropdownItem>Active</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </Col>
            </Row>
            {records.map((record) => {
                return <SensorItem id={record.id} name={record.name} status={record.status} />;
            })}
        </>
    );
};

export default SensorMap;
