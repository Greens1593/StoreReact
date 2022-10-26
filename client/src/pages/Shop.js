import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviseList";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import { fetchDevices, fetchItems } from "../http/deviceAPI";

const Shop = observer(() => {
  const { device } = useContext(Context);
  useEffect(() => {
    fetchItems("api/type").then((data) => device.setTypes(data));
    fetchItems("api/brand").then((data) => device.setBrands(data));
    fetchDevices("api/device", null, null, 1, 3)
      .then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      })
      .catch((e) => console.log(e));
  }, [device]);

  useEffect(() => {
    fetchDevices(
      "api/device",
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      3
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device, device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
          <Button
            variant="danger"
            className="mt-2"
            onClick={() => device.setSelectedType({})}
          >
            Показать все типы
          </Button>
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
