import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Loader from "components/Loader";
import { dateToString } from "helpers/datetimeCover";

const NotificationDetail = (props) => {
  const [loading, setLoading] = React.useState(false);
  const getIcon = () => {
    let icon;
    let color;
    let title;
    switch (props.content.type) {
      case "WARRING_LOW_TEMPERATURE":
        icon = "uil  uil-temperature-minus";
        color = "warning";
        title = "Cảnh báo nhiệt độ thấp";
        break;
      case "WARRING_HIGH_TEMPERATURE":
        icon = "uil  uil-temperature-plus";
        color = "danger";
        title = "Cảnh báo nhiệt độ cao";
        break;
      case "Access-Invite":
        icon = "uil uil-envelope-add";
        color = "success";
        title = "Lời mời cộng tác";
        break;
      case "SUCCESS":
        icon = "uil uil-check";
        color = "success";
        title = "Thành công";
        break;
      case "ERRO":
        icon = "uil uil-times";
        color = "danger";
        title = "Lỗi";
        break;

      default:
        icon = "uil  uil-exclamation-triangle";
        color = "warning";
        title = "Thông báo";
        break;
    }
    return {
      icon: icon,
      color: color,
      title: title,
    };
  };
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      size="md"
      className="modal-dialog-centered"
    >
      {loading && <Loader />}
      <ModalHeader toggle={props.toggle}>
        <i className={getIcon().icon + " mr-2"}></i>
        {getIcon().title}
      </ModalHeader>
      <ModalBody>
        <h5>{props.content.content}</h5>
        <small className="text-muted mt-4">
          {dateToString(props.content.updatedAt)}
        </small>
      </ModalBody>
      <ModalFooter className="text-right">
        {props.content.type === "Access-Invite" ? (
          <>
            <Button color="primary" onClick={props.sayYesAccess}>
              Chấp nhận
            </Button>
            <Button
              color="secondary"
              onClick={props.sayNoAccess}
              className="ml-1"
            >
              Từ chối
            </Button>
          </>
        ) : (
          <>
            <Button color="danger" onClick={props.deleteAction}>
              Xóa thông báo
            </Button>
            <Button color="secondary" className="ml-1" onClick={props.toggle}>
              Đóng
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};
export default NotificationDetail;
