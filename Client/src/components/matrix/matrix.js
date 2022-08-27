import HueBar from "components/HueBar";
import MySlice from "components/MySlice";
import React, { useEffect, useState, useRef } from "react";
// import MySlice from 'components/MySlice.js'
// import HueBar from 'components/HueBar.js'
import "./matrix.css";

class Helper {
  constructor() {
    this.xRuler = document.createElement("p");
    this.yRuler = document.createElement("p");
  }
  setProps(props) {
    this.data = props.data;
    this.min = props.min;
    this.max = props.max;
    this.width = this.data[0].length;
    this.height = this.data.length;
    this.onClick = props.onClick;
    this.config = props.config;
  }
  setAxis(axis) {
    this.axis = axis;
  }
  createElement(tagName, attribute = {}) {
    let e = document.createElement(tagName);
    Object.assign(e, attribute);
    return e;
  }
  createEmptyElement() {
    return this.createElement("p");
  }
  makeRow(rowNumber, container) {
    const { data: DATA, min: MIN, max: MAX, width: WIDTH } = this;

    let row = this.createElement("tr");

    for (let ix = 0; ix < WIDTH; ix++) {
      let temp = DATA[rowNumber][ix];
      let hue = 240 - (240 * (temp - MIN)) / (MAX - MIN);
      row.appendChild(
        this.createElement("td", {
          onclick: () => this.onClick(ix, rowNumber, hue, temp),
          onmouseenter: () => this.onMouseEnter(ix, rowNumber),
          onmouseout: () => this.onMouseOut(ix, rowNumber),
          style: `background: hsl(${hue},100%,50%);`,
          className: "cell",
        })
      );
    }
    container.appendChild(row);
  }
  makeTable(container) {
    const table = this.createElement("table", {
      className: "text-center",
    });

    for (let iy = this.height - 1; iy >= 0; iy--) {
      this.makeRow(iy, table);
    }

    container.innerHTML = "";
    container.appendChild(table);
    container.appendChild(this.xRuler);
    container.appendChild(this.yRuler);
    this.xRuler.className = this.yRuler.className = "label";
  }
  onMouseEnter(x, y) {
    let router = {
      x: {
        f: "y",
        s: "z",
      },
      y: {
        f: "z",
        s: "x",
      },
      z: {
        f: "y",
        s: "x",
      },
    };
    this.xRuler.innerHTML = `<strong>${router[this.axis].s}</strong>: ` + x;
    this.yRuler.innerHTML = `<strong>${router[this.axis].f}</strong>: ` + y;
  }
  onMouseOut(x, y) {
    delete [x, y];
  }
  handleRuler(container, event) {
    this.xRuler.style = this.yRuler.style = "display;";
    let fkRect = container.getBoundingClientRect();
    let x = event.clientX - fkRect.left - this.xRuler.clientWidth / 2;
    let y = event.clientY - fkRect.top - this.yRuler.offsetHeight / 2;
    this.xRuler.style = `background: #afa;
            left: ${x}px;
            top: ${container.offsetHeight}px;`;
    this.yRuler.style = `background: #faa;
            left: ${container.offsetWidth}px;
            top: ${y}px;`;
  }
  removeRuler() {
    this.xRuler.style.display = this.yRuler.style.display = "none";
  }
  initData(sz) {
    return {
      values: new Array(sz.x)
        .fill(0)
        .map((e) =>
          new Array(sz.y)
            .fill(0)
            .map((e) => new Array(sz.z).fill(0).map((e) => 0))
        ),
      min: 0,
      max: 0,
    };
  }
}

const TwoDimensionalChart = (props) => {
  const [container, setContainer] = useState(document.createElement("p"));
  const helper = new Helper();

  useEffect(() => {
    helper.setProps(props);
    helper.setAxis(props.axis);
    helper.makeTable(container);
    let parent = container.parentElement || container;
    let sm =
      parent.offsetWidth < parent.offsetHeight
        ? parent.offsetWidth
        : parent.offsetHeight;
    const { width: WIDTH, height: HEIGHT } = helper;
    Object.assign(container.style, {
      width: `${(sm / HEIGHT) * WIDTH}px`,
      height: `${sm}px`,
    });
  }, [container, props]);

  return (
    <div
      ref={(e) => setContainer(e)}
      className="matrixContainer"
      onMouseOver={(event) => helper.handleRuler(container, event)}
      onMouseOut={() => helper.removeRuler()}
    />
  );
};

TwoDimensionalChart.defaultProps = {
  data: [[]],
  axis: "x",
  min: 0,
  max: 0,
  onClick: (x, y, hue, temp) => {
    console.log(x, y, hue, temp);
  },
};

const MatrixView = (props) => {
  const [dat, setData] = useState([[]]);
  const [axis, setAxis] = useState("x");
  const [sLv, setLevel] = useState(0);
  const markCell = useRef(console.log);
  const min = props.data.min;
  const max = props.data.max;

  const threeToTwo = (inp, config, axis, level) => {
    let route = {
      x: {
        fast: "y",
        slow: "z",
        map: (a, i, f, s) => a[i][f][s],
      },
      y: {
        fast: "x",
        slow: "z",
        map: (a, i, f, s) => a[f][i][s],
      },
      z: {
        fast: "x",
        slow: "y",
        map: (a, i, f, s) => a[f][s][i],
      },
    };

    let ret = [],
      flatRet = [],
      size = config.size;
    let iFast = size[route[axis].fast];
    let iSlow = size[route[axis].slow];
    let iImmutable = size[axis] - level - 1;
    for (let s = 0; s < iSlow; s++) {
      for (let f = 0; f < iFast; f++) {
        flatRet.push(route[axis].map(inp, iImmutable, f, s));
      }
      ret.push(flatRet);
      flatRet = [];
    }
    return ret;
  };

  useEffect(() => {
    setData(threeToTwo(props.data.values, props.config, axis, sLv));
  }, [props, sLv]);

  return (
    <React.Fragment>
      <div style={{ width: "inherit", height: 300 }}>
        <TwoDimensionalChart
          data={dat}
          axis={axis}
          min={min}
          max={max}
          onClick={(x, y, h, t) => {
            markCell.current(Math.trunc(h));
          }}
        />
      </div>
      <br />
      <br />
      {max != 99 ? (
        <HueBar
          min={min}
          max={max}
          width="100%"
          height={10}
          markCell={markCell}
        />
      ) : (
        <div className="text-center text-warning mt-2">
          <i className="uil uil-exclamation-octagon mr-1"></i>
          Chưa có dữ liệu nhiệt độ
        </div>
      )}
      <MySlice
        min={0}
        max={props.config.size[axis] - 1}
        onChangeValue={(v) => setLevel(v)}
        onChangeAxis={(ax) => setAxis(ax)}
      />
    </React.Fragment>
  );
};

MatrixView.defaultProps = {
  data: {
    values: [[[]]],
    min: 0,
    max: 0,
  },
  config: {
    size: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
};

export default MatrixView;
