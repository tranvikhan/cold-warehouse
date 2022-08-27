import React from "react";
import {
  Modal,
  ModalHeader,
  CardBody,
  ModalFooter,
  Card,
  Button,
  Label,
  ModalBody,
} from "reactstrap";
import { AvForm, AvGroup } from "availity-reactstrap-validation";
import Select from "react-select";
import AvField from "availity-reactstrap-validation/lib/AvField";
import Loader from "components/Loader";

const EditRoleUser = (props) => {
  const state = {
    Name: "Sửa quyền quản trị",
    color: "btn btn-primary mr-4 mb-3  mb-sm-0",
    icon: "uil uil-user-check mr-1",
    title: "Lưu thay đổi",
  };
  const getRoleName = {
    Owner: "Chủ kho lạnh",
    Manager: "Chỉnh sửa",
    Viewer: "Chỉ xem",
  };
  const [role, setRole] = React.useState({
    value: "Viewer",
    label: "Chỉ xem",
  });
  React.useEffect(() => {
    if (props.access.role) {
      setRole({
        value: props.access.role,
        label: getRoleName[props.access.role],
      });
    }
  }, [props]);

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
      <AvForm>
        {props.loading && <Loader />}
        <ModalHeader>{state.Name}</ModalHeader>
        <ModalBody>
          <AvGroup>
            <AvField
              name="user"
              label="Người dùng"
              type="text"
              value={props.access.user.fullname}
              disabled
            />
          </AvGroup>
          <AvGroup>
            <Label for="username">Quyền</Label>
            <Select
              className="react-select"
              classNamePrefix="react-select"
              value={role}
              onChange={(role) => {
                setRole(role);
              }}
              options={[
                {
                  value: "Viewer",
                  label: "Chỉ xem",
                },
                {
                  value: "Manager",
                  label: "Chỉnh sửa",
                },
              ]}
            ></Select>
          </AvGroup>
        </ModalBody>
        <ModalFooter className="text-right">
          <Button
            color={state.color}
            type="submit"
            disabled={props.access.role === role.value}
            onClick={() => props.onSubmit(role.value, props.access._id)}
          >
            <i className={state.icon}> </i>
            {state.title}
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};
export default EditRoleUser;
