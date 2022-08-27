import React, { useEffect, useRef } from "react";
import "./3DChart.css";
import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";

class Helper {
  constructor(container) {
    this.container = container;
    this.tileSize = 20;
  }

  setConfig(config) {
    this.config = config;
  }

  setData(data) {
    this.data = data;
    const item = (x, y, z) => ({
      datatype_id: "",
      x,
      y,
      z,
      status: "IMPORTANT",
    });
    const sz = this.config.size;
    const dt = this.config.sensorDensity;
    const X = sz.x / dt - 1,
      Y = sz.y / dt - 1,
      Z = sz.z / dt - 1;
    const conner = [0, 0, 0, 0, 0, 0, 0, 0];
    data.forEach((e) => {
      if (e.x === 0 && e.y === 0 && e.z === 0) conner[0] += 1;
      if (e.x === 0 && e.y === 0 && e.z === Z) conner[1] += 1;
      if (e.x === 0 && e.y === Y && e.z === 0) conner[2] += 1;
      if (e.x === 0 && e.y === Y && e.z === Z) conner[3] += 1;
      if (e.x === X && e.y === 0 && e.z === 0) conner[4] += 1;
      if (e.x === X && e.y === 0 && e.z === Z) conner[5] += 1;
      if (e.x === X && e.y === Y && e.z === 0) conner[6] += 1;
      if (e.x === X && e.y === Y && e.z === Z) conner[7] += 1;
    });
    conner.forEach((e, i) => {
      if (e === 0)
        this.data.push(
          item(
            i < 4 ? 0 : X,
            Math.trunc(i / 2) % 2 === 0 ? 0 : Y,
            i % 2 === 0 ? 0 : Z
          )
        );
    });
  }

  setTileColor(faceOrder, i, value) {
    let iMin = this.data.min;
    let hue = (240 - (240 * (value - iMin)) / (this.data.max - iMin)) / 360;
    let currFace = this.cubeFrame.children[faceOrder].geometry.faces;
    currFace[2 * i].color.setHSL(hue, 1, 0.5);
    currFace[2 * i + 1].color.setHSL(hue, 1, 0.5);
  }

  initWorld() {
    //console.info("makeWorld");
    let e = new THREE.Scene();
    e.background = new THREE.Color("#f5f5f5");
    let t = new THREE.PerspectiveCamera(
      60,
      this.container.clientWidth / this.container.clientHeight
    );
    t.up.set(0, 0, 1);
    t.position.set(1350, 1350, 1350);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    let controls = new OrbitControls(t, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 1900;
    controls.maxPolarAngle = Math.PI;
    controls.rotateSpeed = 0.5;

    //make axesHelper
    let axesHelper = new THREE.AxesHelper(1500);
    e.add(axesHelper);

    let animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(e, t);
    };
    animate();
    this.scene = e;
    this.camera = t;
    this.controls = controls;
    this.renderer = renderer;
    this.axesHelper = axesHelper;
	this.container.innerHTML = "";
    this.container.appendChild(renderer.domElement);
  }
  makeDoor() {
    //console.info("makeDoor");
    let e = this.config.door;
    let sensorDensity = this.config.sensorDensity;
    if (e.show && this.scene) {
      let t = this.config.size,
        i = {
          x: (t.x * this.tileSize) / sensorDensity,
          y: (t.y * this.tileSize) / sensorDensity,
          z: (t.z * this.tileSize) / sensorDensity,
          e: 20 * this.tileSize,
        },
        n = {
          A: {
            x0: i.x / 2,
            y0: -i.e,
            z0: i.z / 2,
            x1: i.x / 2,
            y1: i.y,
            z1: i.z / 2,
          },
          B: {
            x0: i.x / 2,
            y0: i.y + i.e,
            z0: i.z / 2,
            x1: i.x / 2,
            y1: i.y,
            z1: i.z / 2,
          },
          C: {
            x0: -i.e,
            y0: i.y / 2,
            z0: i.z / 2,
            x1: i.x,
            y1: i.y / 2,
            z1: i.z / 2,
          },
          D: {
            x0: i.x + i.e,
            y0: i.y / 2,
            z0: i.z / 2,
            x1: i.x,
            y1: i.y / 2,
            z1: i.z / 2,
          },
        }[e.direction],
        s = new THREE.Vector3(n.x1 - n.x0, n.y1 - n.y0, n.z1 - n.z0),
        a = new THREE.Vector3(n.x0, n.y0, n.z0),
        r = 8 * this.tileSize,
        o = 2 * this.tileSize,
        c = 1 * this.tileSize,
        l = new THREE.ArrowHelper(s.normalize(), a, r, 0, o, c);
      l.up.set(0, 0, 1);
      this.scene.add(l);
    }
  }
  makeWireFrame() {
    //console.info("makeWireFrame");
    let e = new THREE.LineBasicMaterial({
        color: 0,
        linewidth: 2,
      }),
      d = this.config.sensorDensity,
      t = this.config.size,
      i = (t.x * this.tileSize) / d,
      n = (t.y * this.tileSize) / d,
      s = (t.z * this.tileSize) / d,
      a = [];
    a.push(new THREE.Vector3(0, 0, 0));
    a.push(new THREE.Vector3(i, 0, 0));
    a.push(new THREE.Vector3(i, n, 0));
    a.push(new THREE.Vector3(0, n, 0));
    a.push(new THREE.Vector3(0, 0, 0));
    a.push(new THREE.Vector3(0, 0, s));
    a.push(new THREE.Vector3(i, 0, s));
    a.push(new THREE.Vector3(i, n, s));
    a.push(new THREE.Vector3(0, n, s));
    a.push(new THREE.Vector3(0, 0, s));
    let r = new THREE.BufferGeometry().setFromPoints(a);
    (a = []).push(new THREE.Vector3(i, 0, 0));
    a.push(new THREE.Vector3(i, 0, s));
    a.push(new THREE.Vector3(i, n, s));
    a.push(new THREE.Vector3(i, n, 0));
    a.push(new THREE.Vector3(0, n, 0));
    a.push(new THREE.Vector3(0, n, s));
    let o = new THREE.BufferGeometry().setFromPoints(a),
      c = new THREE.Line(r, e);
    this.scene.add(c);
    let l = new THREE.Line(o, e);
    this.scene.add(l);
    this.controls.target.set(i / 2, n / 2, s / 2);
  }
  writeNumber(text = "", x = 0, y = 0, z = 0) {
    let t = this.tileSize;
    let element = document.createElement("canvas");
    let context = element.getContext("2d");
    element.height = 2 * t;
    element.width = 4 * t;
    context.font = "Bold " + 2 * t + "px Roboto";
    context.fillStyle = "#7F007F";
    context.textAlign = "center";
    context.fillText(text, t * 2, t * 1.5);
    let texture = new THREE.Texture(element);
    texture.needsUpdate = !0;
    let material = new THREE.SpriteMaterial({
      map: texture,
    });
    material.depthTest = false;
    let r = new THREE.Sprite(material);
    r.scale.set(t * 2, t, t);
    r.position.set((x + 0.5) * t, (y + 0.5) * t, (z + 0.5) * t);
    this.scene.add(r);
  }

  makeCubes() {
    if (!this.data) return;
    this.data.forEach((e) => {
      this.scene.add(this.cube(e.x, e.y, e.z, e.status));
      if (e.datatype_id !== "") this.writeNumber(e.datatype_id, e.x, e.y, e.z);
    });
  }

  cube(x = 0, y = 0, z = 0, status = "RUNNING") {
    const colorMap = {
      EMPTY: "#CCCCCC",
      RUNNING: "#28a745",
      ON: "#5369f8",
      USSING: "#ffc107",
      IMPORTANT: "#DC0404",
    };
    const g = new THREE.BoxGeometry(
      this.tileSize,
      this.tileSize,
      this.tileSize
    );
    const m = new THREE.MeshBasicMaterial({
      color: colorMap[status],
      // transparent: true,
      // opacity: 0.5
    });
    const c = new THREE.Mesh(g, m);
    c.position.x = x * this.tileSize + this.tileSize / 2;
    c.position.y = y * this.tileSize + this.tileSize / 2;
    c.position.z = z * this.tileSize + this.tileSize / 2;
    return c;
  }
}

const SensorMap3D = (props) => {
  const container = useRef();
  const chart = useRef();

  useEffect(() => {
    chart.current = new Helper(container.current);
  }, []);

  useEffect(() => {
    chart.current.setConfig(props.config);
    chart.current.setData(props.data);
    chart.current.initWorld();
    chart.current.makeDoor();
    chart.current.makeWireFrame();
    chart.current.makeCubes();
  }, [props.config, props.data]);

  return (
    <div
      className="chartContainer"
      style={{
        width: "inherit",
        height: "inherit",
      }}
      ref={(self) => {
        container.current = self;
      }}
    />
  );
};

SensorMap3D.defaultProps = {
  config: {
    size: {
      x: 0,
      y: 0,
      z: 0,
    },
    door: {
      show: false,
      direction: "A",
    },
    sensorDensity: 1,
  },
  data: [],
};

export default SensorMap3D;
