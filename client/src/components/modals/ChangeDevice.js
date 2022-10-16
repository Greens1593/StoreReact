import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Modal,
  Col,
  Row,
  InputGroup,
  Image,
} from "react-bootstrap";
import { Context } from "../..";
import { changeItem, fetchItems, fetchOneItem } from "../../http/deviceAPI";
import DeviceLauncher from "../DeviceLauncher";

const ChangeDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [changeOportunity, setChangeOportunity] = useState(true);
  const [foundedDevice, setFoundedDevice] = useState([]);
  const [deviceForChange, setDeviceForChange] = useState({ info: [] });
  const [chooseOrChange, setChooseOrChange] = useState(true);
  const [defaultImg, setDefaultImg] = useState(true);

  useEffect(() => {
    fetchItems("api/device").then((data) => device.setDevices(data.rows));
  }, [device]);

  const foundDevice = () => {
    const devices = device.devices;
    const founded = devices.filter(
      (device) =>
        !(-1 === device.name.toLowerCase().indexOf(name.toLocaleLowerCase()))
    );
    setFoundedDevice(founded);
  };

  const chooseDeviceForChange = async (event) => {
    if (!event.target.id) {
      return;
    }
    const id = +event.target.id;

    const deviceForChange = device.devices.filter(
      (device) => device.id === id
    )[0];
    const typeForChange = device.types.filter(
      (type) => type.id === deviceForChange.typeId
    )[0];

    const brandForChange = device.brands.filter(
      (brand) => brand.id === deviceForChange.brandId
    )[0];

    device.setSelectedType(typeForChange);
    device.setSelectedBrand(brandForChange);

    await fetchOneItem("api/device/", deviceForChange.id).then((data) => {
      setInfo(data.info);
    });

    setDeviceForChange(deviceForChange);
    setChooseOrChange(false);
    setChangeOportunity(false);
    setName(deviceForChange.name);
    setPrice(deviceForChange.price);
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", id: Date.now() }]);
  };
  const removeInfo = (id) => {
    setInfo(info.filter((i) => i.id !== id));
  };

  const changeInfo = (key, value, id) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const closeWindow = () => {
    device.setSelectedType({});
    device.setSelectedBrand({});
    setName("");
    setPrice(0);
    onHide();
  };

  const changeDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));
    formData.append("id", deviceForChange.id);
    console.log(formData);
    changeItem("api/device", formData)
      .then(() => onHide())
      .catch((e) => console.log(e.message));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить информацию об устройстве {deviceForChange.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chooseOrChange ? (
          <div>
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
                    onClick={chooseDeviceForChange}
                    id={device.id}
                  />
                ))
              )}
            </Row>
          </div>
        ) : (
          <Form className="d-flex flex-column align-items-center">
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>Тип: {device.selectedType.name}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map((type) => (
                  <Dropdown.Item
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle>
                Бренд: {device.selectedBrand.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  <Dropdown.Item
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Group>
              <Form.Label className="mt-3">Название устройства</Form.Label>
              <Form.Control
                className="mt-3"
                placeholder="Введите название устройства"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label className="mt-3">Цена устройства</Form.Label>
              <Form.Control
                className="mt-3"
                placeholder="Введите цену устройства"
                type="number"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
              {defaultImg ? (
                <Row style={{ justifyContent: "center" }}>
                  <Image
                    className="mt-3 mb-3 d-inline"
                    style={{ width: 76 }}
                    height={50}
                    width={76}
                    src={
                      process.env.REACT_APP_API_URL + "/" + deviceForChange.img
                    }
                    alt={deviceForChange.name}
                  />
                  <Button
                    className="d-inline"
                    height={50}
                    variant="outline-success"
                    onClick={() => {
                      setDefaultImg(false);
                    }}
                  >
                    Изменить изображение
                  </Button>
                </Row>
              ) : (
                <Form.Control
                  className="mt-3"
                  type="file"
                  onChange={selectFile}
                />
              )}
            </Form.Group>
            <hr />
            <Button variant="outline-dark" onClick={addInfo}>
              Добавить новое свойство
            </Button>
            {info.map((i) => (
              <Row className="mt-3" key={i.id}>
                <Col md={4}>
                  <Form.Control
                    placeholder="Название"
                    value={i.title}
                    onChange={(e) => changeInfo("title", e.target.value, i.id)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Описание"
                    value={i.description}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, i.id)
                    }
                  />
                </Col>
                <Col md={4}>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeInfo(i.id)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            ))}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={closeWindow}>
          Закрыть
        </Button>
        <Button
          variant="outline-success"
          onClick={changeDevice}
          disabled={changeOportunity}
        >
          Изменить информацию об устройстве
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeDevice;
