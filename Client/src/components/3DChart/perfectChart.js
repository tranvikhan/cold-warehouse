import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";

class perfectChart {
  constructor(container) {
    this.config = null;
    this.data = null;
    this.slice = null;
    this.limit = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cubeFrame = null;
    this.axesHelper = null;
    this.container = container;
  }

  setConfig(config) {
    this.config = config;
  }
  reCalculationLimit(slice) {
    this.slice = slice;
    let vOrigin = this.slice.origin;
    let vDes = this.slice.destination;
    !vOrigin &&
      (vOrigin = {
        x: 0,
        y: 0,
        z: 0,
      });

    let sz = this.config.size,
      x = sz.x,
      y = sz.y,
      z = sz.z;
    !vDes &&
      (vDes = {
        x: x,
        y: y,
        z: z,
      });

    const max = (a, b) => (a > b ? a : b);
    const min = (a, b) => (a < b ? a : b);
    this.limit = {
      ix: x,
      iy: y,
      iz: z,
      idx: Math.abs(vOrigin.x - vDes.x),
      idy: Math.abs(vOrigin.y - vDes.y),
      idz: Math.abs(vOrigin.z - vDes.z),
      ix0: min(vOrigin.x, vDes.x), //origin
      iy0: min(vOrigin.y, vDes.y),
      iz0: min(vOrigin.z, vDes.z),
      ix1: max(vOrigin.x, vDes.x) - 1, //destination
      iy1: max(vOrigin.y, vDes.y) - 1,
      iz1: max(vOrigin.z, vDes.z) - 1,
    };
  }
  updateFaceAB(isFront) {
    //xzy
    let iCount = 0;
    let size = this.limit; //t = this.limit
    let i1st0 = size.ix0;
    let i1st1 = size.ix1;
    let i2nd0 = size.iz0;
    let i2nd1 = size.iz1;
    let iOrder = isFront ? 0 : 1;
    let iExtreme = size["iy" + (isFront ? "0" : "1")];
    for (let ii = i2nd0; ii <= i2nd1; ii++)
      for (let jj = i1st0; jj <= i1st1; jj++) {
        this.setTileColor(iOrder, iCount, this.data.values[jj][iExtreme][ii]);
        iCount++;
      }
    this.cubeFrame.children[iOrder].geometry.colorsNeedUpdate = true;
  }
  updateFaceCD(isFront) {
    //yzx
    let iCount = 0;
    let size = this.limit; //t = this.limit
    let i1st0 = size.iy0;
    let i1st1 = size.iy1;
    let i2nd0 = size.iz0;
    let i2nd1 = size.iz1;
    let iOrder = isFront ? 2 : 3;
    let iExtreme = size["ix" + (isFront ? "0" : "1")];
    for (let ii = i2nd0; ii <= i2nd1; ii++)
      for (let jj = i1st0; jj <= i1st1; jj++) {
        this.setTileColor(iOrder, iCount, this.data.values[iExtreme][jj][ii]);
        iCount++;
      }
    this.cubeFrame.children[iOrder].geometry.colorsNeedUpdate = true;
  }
  updateFaceEF(isFront) {
    //xyz
    let iCount = 0;
    let size = this.limit; //t = this.limit
    let i1st0 = size.ix0;
    let i1st1 = size.ix1;
    let i2nd0 = size.iy0;
    let i2nd1 = size.iy1;
    let iOrder = isFront ? 4 : 5;
    let iExtreme = size["iz" + (isFront ? "0" : "1")];
    for (let ii = i2nd0; ii <= i2nd1; ii++)
      for (let jj = i1st0; jj <= i1st1; jj++) {
        this.setTileColor(iOrder, iCount, this.data.values[jj][ii][iExtreme]);
        iCount++;
      }
    this.cubeFrame.children[iOrder].geometry.colorsNeedUpdate = true;
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
      this.container.clientWidth / this.container.clientHeight,
      1,
      3e3
    );
    t.up.set(0, 0, 1);
    t.position.set(1350, 1350, 1350);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    let n = new OrbitControls(t, renderer.domElement);
    n.enableDamping = true;
    n.dampingFactor = 0.05;
    n.screenSpacePanning = false;
    n.minDistance = 100;
    n.maxDistance = 1900;
    n.maxPolarAngle = Math.PI;
    n.rotateSpeed = 0.5;

    //make axesHelper
    let s = this.config.size;
    let axesHelper = new THREE.AxesHelper(
      s.tilesize * (1.7 * Math.max(s.x, s.y, s.z))
    );
    e.add(axesHelper);

    let animate = function () {
      requestAnimationFrame(animate);
      n.update();
      renderer.render(e, t);
    };
    animate();
    this.scene = e;
    this.camera = t;
    this.controls = n;
    this.renderer = renderer;
    this.axesHelper = axesHelper;
    this.container.innerHTML = "";
    this.container.appendChild(renderer.domElement);
  }
  makeDoor() {
    //console.info("makeDoor");
    let e = this.config.door;
    if (e.show && this.scene) {
      let t = this.config.size,
        i = {
          x: t.x * t.tilesize,
          y: t.y * t.tilesize,
          z: t.z * t.tilesize,
          e: 20 * t.tilesize,
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
        r = 8 * t.tilesize,
        o = 2 * t.tilesize,
        c = 1 * t.tilesize,
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
      t = this.config.size,
      i = t.x * t.tilesize,
      n = t.y * t.tilesize,
      s = t.z * t.tilesize,
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
  writeNumber() {
    let e = this;
    let t = this.config.size.tilesize;
    let i = (i, n, s, a) => {
      let r = (function (e) {
        let i = document.createElement("canvas"),
          n = i.getContext("2d");
        i.width = i.height = 2 * t;
        n.font = "Bold " + 1 * t + "px Roboto";
        n.fillStyle = "#2c3e50";
        n.textAlign = "center";
        n.fillText(e, t, 1.74591293182 * t);
        let s = new THREE.Texture(i);
        s.needsUpdate = !0;
        let a = new THREE.SpriteMaterial({
            map: s,
          }),
          r = new THREE.Sprite(a);
        r.scale.set(i.width, i.width, i.width);
        return r;
      })(String(i));
      r.position.set((n - 0.25) * t, (s - 0.25) * t, (a - 0.25) * t);
      e.scene.add(r);
    };
    let n = this.config["axis-labels"];
    n["axis-x"].show && n["axis-x"].list.forEach((e) => i(e, e, 0, 0));
    n["axis-y"].show && n["axis-y"].list.forEach((e) => i(e, 0, e, 0));
    n["axis-z"].show && n["axis-z"].list.forEach((e) => i(e, 0, 0, e));
  }
  makeFrame() {
    let t = { ...this.limit, ...this.config.size };
    t = {
      ...t,
      sx: t.idx * t.tilesize,
      sy: t.idy * t.tilesize,
      sz: t.idz * t.tilesize,
    };
    t = { ...t, hsx: t.sx / 2, hsy: t.sy / 2, hsz: t.sz / 2 };
    //console.info("make frame with size: ", t.idx, "x", t.idy, "x", t.idz);
    //this.controls.target.set(t.hsx, t.hsy, t.hsz);
    let i = [
        new THREE.Vector3((3 * Math.PI) / 2, 0, 0),
        new THREE.Vector3((3 * Math.PI) / 2, (3 * Math.PI) / 2, 0),
        new THREE.Vector3(Math.PI, 0, 0),
      ],
      n = this.limit.ix0 * t.tilesize,
      s = this.limit.iy0 * t.tilesize,
      a = this.limit.iz0 * t.tilesize,
      r = [
        new THREE.Vector3(t.hsx + n, 0 + s, t.hsz + a),
        new THREE.Vector3(t.hsx + n, t.sy + s, t.hsz + a),
        new THREE.Vector3(0 + n, t.hsy + s, t.hsz + a),
        new THREE.Vector3(t.sx + n, t.hsy + s, t.hsz + a),
        new THREE.Vector3(t.hsx + n, t.hsy + s, 0 + a),
        new THREE.Vector3(t.hsx + n, t.hsy + s, t.sz + a),
      ],
      o = function (i, n, s, a) {
        let r = i[0],
          o = i[1],
          c = new THREE.PlaneGeometry(
            t["s" + r],
            t["s" + o],
            t["id" + r],
            t["id" + o]
          ),
          l = new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors,
            side: a,
          });
        let h = new THREE.Mesh(c, l);
        h.position.copy(s);
        h.rotation.setFromVector3(n);
        return h;
      };
    let l = new THREE.Object3D();
    l.add(o("xzy", i[0], r[0], THREE.BackSide));
    l.add(o("xzy", i[0], r[1], THREE.FrontSide));
    l.add(o("yzx", i[1], r[2], THREE.FrontSide));
    l.add(o("yzx", i[1], r[3], THREE.BackSide));
    l.add(o("xyz", i[2], r[4], THREE.FrontSide));
    l.add(o("xyz", i[2], r[5], THREE.BackSide));
    this.scene.remove(this.cubeFrame);
    this.cubeFrame = l;
    this.scene.add(l);
    return l;
  }
  updateChart(data) {
    this.data = data;
    console.log("updateChart");
    this.updateFaceAB(true);
    this.updateFaceAB(false);
    this.updateFaceCD(true);
    this.updateFaceCD(false);
    this.updateFaceEF(true);
    this.updateFaceEF(false);
  }
}

export default perfectChart;
