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
    },[props.slice, props.data])

    useEffect(()=>{
        chart.current.updateChart(props.data);
    },[props.data]);

    return (
        <div className="chartContainer" ref={(self)=>{container.current = self}}/>
    );
};

TChart.defaultProps = {
    config: {
        size: {
            x: 3, y: 3, z: 3, tilesize: 25
        },
        door: {
            show: true, direction: "A"
        },
        "axis-labels": {
            "axis-x": {
                "show": false, "list": [0, 5, 12, 19]
            },
            "axis-y": {
                "show": false, "list": [2, 6]
            },
            "axis-z": {
                "show": false, "list": [5, 9]
            }
        }
    },
    slice: {
        origin: null, destination: null
    },
    data: {	"values":
	    [[
	    	[0, 1, 2],
	    	[3, 4, 5],
	    	[6, 7, 8],
	    ],
	    [
	    	[6, 7, 8],
            [0, 1, 2],
	    	[3, 4, 5],
	    ],
	    [
	    	[0, 1, 2],
	    	[6, 7, 8],
	    	[3, 4, 5],
	    ]],
	    "min": 0,
        "max": 8
    }
}

export default TChart;