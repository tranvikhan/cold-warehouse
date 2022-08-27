// @flow
import React from "react";
import { Row, Col } from "reactstrap";
import * as FeatherIcon from "react-feather";
import StatisticsWidget from "../../components/StatisticsWidget";
import { useSelector } from "react-redux";

const Statistics = () => {
  const accesses = useSelector((state) => state.RoomAccess.accesses);
  const structure = useSelector((state) => state.RoomStructrure.structure);
  const areas = useSelector((state) => state.RoomArea.areas);
  const notifications = useSelector((state) => state.Notification.list);

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={3}>
          <StatisticsWidget
            description="Tổng số cảm biến"
            title={structure && structure.map.lenght ? "4" : "0"}
            icon={FeatherIcon.Cpu}
            iconClass="icon-dual-primary"
          ></StatisticsWidget>
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            description="Người quản lý"
            title={accesses && accesses.lenght ? "4" : "0"}
            icon={FeatherIcon.Users}
            iconClass="icon-dual-warning"
          ></StatisticsWidget>
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            description="Khu vực"
            title={areas && areas.lenght ? "4" : "0"}
            icon={FeatherIcon.Grid}
            iconClass="icon-dual-success"
          ></StatisticsWidget>
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget
            description="Thông báo"
            title={notifications && notifications.lenght ? "4" : "0"}
            icon={FeatherIcon.Bell}
            iconClass="icon-dual-info"
          ></StatisticsWidget>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Statistics;
