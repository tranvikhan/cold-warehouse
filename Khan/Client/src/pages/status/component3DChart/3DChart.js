import React, {
    useEffect, useRef
} from 'react';
import "./3DChart.css";
import perfectChart from "./perfectChart.js"

const TChart = (props) => {
    const container = useRef();
    const chart = useRef();

    useEffect(()=>{
        chart.current = new perfectChart(container.current);
    },[])

    useEffect(() => {
        chart.current.setConfig(props.config);
        chart.current.initWorld();
        chart.current.makeDoor();
        chart.current.makeWireFrame();
        chart.current.writeNumber();
    },[props.config]);

    useEffect(()=>{
        chart.current.reCalculationLimit(props.slice);
        chart.current.makeFrame();
        if(props.data != null)
            chart.current.updateChart(props.data);
    },[props.slice])

    useEffect(()=>{
        if(props.data != null)
        chart.current.updateChart(props.data);
    },[props.data]);

    return (
        <div className="chartContainer" ref={(self)=>{container.current = self}}/>
    );
};

export default TChart;