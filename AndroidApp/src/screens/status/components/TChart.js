import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import OrbitControlsView from "expo-three-orbit-controls";
import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import perfectChart from "./perfectChart.js";

export default function Tchart(props) {
  return <Chart config={props.config} data={props.data} slice={props.slice} />;
}

class nativeChart extends perfectChart {
  initWorld(gl) {
    console.log("=> initWorld");
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fafafa");

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.up.set(0, 0, 1);
    const sz = this.config.size;
    camera.position.set(
      (sz.x + 25) * sz.tilesize,
      (sz.y + 25) * sz.tilesize,
      (sz.z + 25) * sz.tilesize
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
  const chart = useRef(null);

  const onContextCreate = async (gl) => {
    console.log("=> onContextCreate");
    chart.current = new nativeChart(null);
    chart.current.setConfig(props.config);
    chart.current.initWorld(gl);
    setCamera(chart.current.camera);
    chart.current.makeDoor();
    chart.current.makeWireFrame();
    chart.current.reCalculationLimit(props.slice);
    chart.current.makeFrame();
    chart.current.updateChart(props.data);
    console.log("onContextCreate =>");
  };

  const initChartView = () => {
    // https://github.com/expo/expo/issues/3877
    chartView.current == null &&
      (console.log("=> initChartView"),
      (chartView.current = React.createElement(GLView, {
        style: { flex: 1 },
        onContextCreate: onContextCreate,
      })),
      console.log("initChartView =>"));

    let centering = setInterval(() => {
      let ctrl = null;
      try {
        ctrl = orbitControls.current.getControls();
      } catch {}
      if (ctrl) {
        let sz = props.config.size;

        ctrl.target.set(
          (sz.x / 2) * sz.tilesize,
          (sz.y / 2) * sz.tilesize,
          (sz.z / 2) * sz.tilesize
        );
        console.log(ctrl.target);
        clearInterval(centering);
      }
    }, 100);
  };

  useEffect(() => {
    console.log("\n".repeat(3) + "===== START =====");
    initChartView();
    return () => {
      console.log("===== END =====");
      //Clear the animation loop when the component unmounts
      //clearTimeout(timeout);
      //chartView.current = null;
    };
  }, []);

  useEffect(() => {
    if (chart.current) chart.current.updateChart(props.data);
  }, [props.data]);

  useEffect(() => {
    console.log("Change Slice");
    if (chart.current) chart.current.reCalculationLimit(props.slice);
  }, [props.slice]);
  return (
    <>
      {console.log("=> Component return")}
      <OrbitControlsView
        style={{ flex: 1, width: "100%", height: "100%" }}
        camera={camera}
        ref={orbitControls}
      >
        {(initChartView(), chartView.current)}
      </OrbitControlsView>
      {console.log("Component return =>")}
    </>
  );
}
