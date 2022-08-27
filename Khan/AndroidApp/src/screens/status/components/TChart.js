import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import OrbitControlsView from 'expo-three-orbit-controls';
import React, {useState, useRef, useEffect} from 'react';
import * as THREE from 'three';
import perfectChart from './perfectChart.js';

let Config =
{
  "size": {
    "x": 3,
    "y": 3,
    "z": 3,
    "tilesize": 5
  },
  "door": {
    "show": true,
    "direction": "A"//"4 hướng là 4 cạnh của hình chữ nhật có thể đánh dấu A B C D"
  },
  "axis-labels": {
    "axis-x": {
      "show": true,
      "list": [0, 5, 12, 19]
    },
    "axis-y": {
      "show": true,
      "list": [2, 6]
    },
    "axis-z": {
      "show": true,
      "list": [5, 9]
    }
  }
}

let _3rd = () => {
  let iMin = 999;
  let iMax = -999;
  let rd;
  return { values: new Array(50).fill(0).map(
  x => new Array(23).fill(0).map(
    x => new Array(24).fill(0).map(
      x => {
        rd = Math.random()*1024;
        if (rd < iMin) iMin = rd;
        if (rd > iMax) iMax = rd;
        return rd;
      }
      )
    )
  ),
  min: iMin,
  max: iMax
  }
};
let Data =
{
	"values":
	[[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	],
	[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	],
	[
		[0, 1, 2],
		[0, 1, 2],
		[0, 1, 2]
	]],
	"min": 0,
	"max": 2
}

let Slice =
{
    origin: null,
    destination: null
}

export default function App(){
    //const [s, setS] = new useState(null)

    useEffect(()=>{
    },[])

    return(
        <>
            <Chart config={Config} data={Data} slice={Slice}/>
        </>
    )
}

class nativeChart extends perfectChart{
    initWorld(gl){
        console.log("=> initWorld");
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x151A30);

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);

        const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
        camera.up.set(0,0,1);
        const sz = this.config.size;
        camera.position.set(
            (sz.x+5)*sz.tilesize,
            (sz.y+5)*sz.tilesize,
            (sz.z+5)*sz.tilesize
        );

        //make axesHelper
        let axesHelper = new THREE.AxesHelper(7749);
        scene.add(axesHelper);

        let animate = () => {
            let timeout = requestAnimationFrame(animate);
            this.timeout = timeout;
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        animate();

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.axesHelper = axesHelper;
        console.log("initWorld =>");
    }
}

function Chart(props) {
    const orbitControls = useRef(null);
    const [camera, setCamera] = useState(null);
    const chartView = useRef(null);

    const onContextCreate = async (gl) => {
        console.log("=> onContextCreate");
        let chart = new nativeChart(null);
        chart.setConfig(props.config);
        chart.initWorld(gl);
        setCamera(chart.camera);
        chart.makeDoor();
        chart.makeWireFrame();
        chart.reCalculationLimit(props.slice);
        chart.makeFrame();
        chart.updateChart(props.data);
        console.log("onContextCreate =>");
    };

    const initChartView = () => {
        // https://github.com/expo/expo/issues/3877
        (chartView.current==null) && (
            console.log("=> initChartView"),
            chartView.current = React.createElement(GLView,{
                style: { flex: 1 },
                onContextCreate: onContextCreate
            }),
            console.log("initChartView =>")
        )

        let centering = setInterval(()=>{
          let ctrl = null;
          try{ctrl = orbitControls.current.getControls()} catch{}
          if (ctrl){
           
              let sz = props.config.size;
              
              ctrl.target.set(
                  sz.x/2*sz.tilesize,
                  sz.y/2*sz.tilesize,
                  sz.z/2*sz.tilesize);
                  console.log(ctrl.target);
               clearInterval(centering); 
          }
      },100);
    }

    useEffect(() => {
        console.log("\n".repeat(3)+"===== START =====");
        initChartView();
        return () => {
            console.log("===== END =====");
            //Clear the animation loop when the component unmounts
            //clearTimeout(timeout);
            //chartView.current = null;
        }
    }, []);

    return (
        <>
            {console.log("=> Component return")}
            <OrbitControlsView style={{ flex: 1,width:"100%",height:"100%" }} camera={camera} ref={orbitControls}>
                {
                    initChartView(),
                    chartView.current
                }
            </OrbitControlsView>
            {console.log("Component return =>")}
        </>
    );
}