// eslint-disable-next-line
import React from "react";
import TChart from "components/3DChart/3DChart.js";
import HueBar from "components/HueBar.js";
import MySlice from "components/MySlice.js";

export default function BoxChart(props) {
  const [axis, setAxis] = React.useState("x");
  const [slice, setSlice] = React.useState({
    origin: null,
    destination: null,
  });

  return (
    props.config != null &&
    props.data != null && (
      <React.Fragment>
        <TChart config={props.config} data={props.data} slice={slice} />
        <div className="p-x-4">
          {props.data.max != 99 ? (
            <HueBar
              min={props.data.min}
              max={props.data.max}
              width={"100%"}
              height={10}
            />
          ) : (
            <div className="text-center text-warning mt-2">
              <i className="uil uil-exclamation-octagon mr-1"></i>
              Chưa có dữ liệu nhiệt độ
            </div>
          )}
        </div>
        <MySlice
          max={0}
          max={props.config.size[axis] - 1}
          onChangeValue={(value) => {
            let vDes = {
              x: props.config.size.x,
              y: props.config.size.y,
              z: props.config.size.z,
            };
            vDes[axis] = props.config.size[axis] - value;
            setSlice({
              origin: null,
              destination: vDes,
            });
          }}
          onChangeAxis={(ax) => {
            setAxis(ax);
          }}
        />
      </React.Fragment>
    )
  );
}
