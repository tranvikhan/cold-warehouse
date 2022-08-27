import React from "react";
import { Media } from "reactstrap";
import imageCpu from "assets/icons/Devices/CPU1.svg";
import classNames from "classnames";
const SensorItem = (props) => {
  const colorStatus = () => {
    switch (props.status) {
      case "Đang chạy":
        return "badge badge-soft-success";
      case "Đang tắt":
        return "badge badge-soft-danger";
      case "Đã thêm vào kho":
        return "badge badge-soft-warning";
      default:
        return "badge badge-soft-primary";
    }
  };
  return (
    <Media className="mt-1 border-top pt-2">
      <img src={imageCpu} className="avatar rounded mr-3" alt="" />

      <Media left>
        <h6 className="mt-1 mb-0 font-size-15">{props.name}</h6>
        <h6 className="text-muted font-weight-normal mt-1">
          {Math.round(props.value * 100) / 100 + " "}
          <i className="uil uil-celsius"></i>
        </h6>
      </Media>
      <Media body></Media>
      <span
        className={classNames(
          colorStatus(),
          "py-1 px-1 align-self-center mr-2"
        )}
      >
        {props.status}
      </span>
      {
        <div className="align-self-center float-right">
          <button
            tag="button"
            className="btn btn-link p-0 dropdown-toggle text-muted"
            onClick={() => {
              props.EditInfoSensor(props.id);
            }}
          >
            <i className="uil uil-ellipsis-v"></i>
          </button>
        </div>
      }
    </Media>
  );
};
export default SensorItem;
