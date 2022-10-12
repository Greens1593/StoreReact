import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ChangeBrand from "./modals/ChangeBrand";
import ChangeType from "./modals/ChangeType";
import DeleteDevice from "./modals/DeleteDevice";

const AdminChangeItems = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-3 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Изменить название типа
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-3 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Изменить название бренда
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-3 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Изменить информацию об устройстве
      </Button>

      <DeleteDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <ChangeBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <ChangeType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  );
};

export default AdminChangeItems;
