import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import AdminChangeItems from "../components/AbminChange";
import AdminBar from "../components/AdminBar";
import AdminCreateItems from "../components/AdminCreate";
import AdminRemoveItems from "../components/AdminRemove";

const choseItem = (arrayOfItems, index) => arrayOfItems[index];
const adminPanels = [
  <AdminCreateItems />,
  <AdminRemoveItems />,
  <AdminChangeItems />,
];

const Admin = observer(() => {
  const { admin } = useContext(Context);
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <AdminBar index="0" />
        </Col>
        <Col md={9}>{choseItem(adminPanels, admin.numberOfList)}</Col>
      </Row>
    </Container>
  );
});
export default Admin;
