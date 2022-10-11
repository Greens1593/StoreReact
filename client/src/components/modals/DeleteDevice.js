import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, InputGroup } from "react-bootstrap";
import { deleteteItem, fetchItems } from "../../http/deviceAPI";
import DeviceLauncher from "../DeviceLauncher";

const DeleteDevice = observer(({ show, onHide }) => {
  const [name, setName] = useState("");
  const [devices, setDevices] = useState([]);
  const [foundedDevice, setFoundedDevice] = useState([]);
  const [deviceForDelete, setDeviceForDelete] = useState([]);
  const [deleteOportunity, setDeleteOportunity] = useState(true);

  useEffect(() => {
    fetchItems("api/device").then((data) => {
      setDevices(data.rows);
    });
  }, []);

  const foundDevice = () => {
    const founded = devices.filter(
      (device) =>
        !(-1 === device.name.toLowerCase().indexOf(name.toLocaleLowerCase()))
    );
    setFoundedDevice(founded);
  };

  const chooseDeviceForDelete = (event) => {
    if (!event.target.id) {
      return;
    }
    const id = +event.target.id;
    const indexIdInArray = deviceForDelete.indexOf(id);
    if (indexIdInArray === -1) {
      deviceForDelete.push(id);
    } else {
      deviceForDelete.splice(indexIdInArray, 1);
    }
    setDeviceForDelete(deviceForDelete);
    if (deviceForDelete.length !== 0) {
      setDeleteOportunity(false);
    } else {
      setDeleteOportunity(true);
    }
  };

  const closeWindow = () => {
    setName("");
    onHide();
  };

  const deleteDevice = () => {
    deviceForDelete.forEach((id) => {
      deleteteItem(`api/device/${id}`)
        .then(() => {
          console.log("Device was deleted");
        })
        .catch((e) => console.log(e));
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Поиск</InputGroup.Text>
          <Form.Control
            placeholder="Введите название устройства"
            aria-label="Введите название устройства"
            aria-describedby="basic-addon1"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              foundDevice();
            }}
          />
        </InputGroup>
        <Row className="d-flex">
          {foundedDevice.length === 0 ? (
            <Row className="d-flex justify-content-center">
              Устройств с таким названием не найдено
            </Row>
          ) : (
            foundedDevice.map((device) => (
              <DeviceLauncher
                key={device.id}
                foundDevice={device}
                onClick={chooseDeviceForDelete}
                id={device.id}
              />
            ))
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={closeWindow}>
          Закрыть
        </Button>
        <Button
          variant="outline-success"
          onClick={deleteDevice}
          disabled={deleteOportunity ? true : false}
        >
          Удалить устройство
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteDevice;
