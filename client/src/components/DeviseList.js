import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "..";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  const brands = device.brands;
  return (
    <Row className="d-flex">
      {device.devices.map((device) => {
        const brand = brands.filter((brand) => brand.id === device.brandId);
        const oneDevice = { ...device, brand: brand };
        return <DeviceItem key={device.id} device={oneDevice} />;
      })}
    </Row>
  );
});

export default DeviceList;
