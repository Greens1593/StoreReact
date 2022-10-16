import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { changeItem, fetchItems } from "../../http/deviceAPI";

const ChangeType = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  const [value, setValue] = useState("");
  const [changeOportunity, setChangeOportunity] = useState(true);
  const [chooseOrChange, setChooseOrChange] = useState(true);
  const [typeForChange, setTypeForChange] = useState({});

  useEffect(() => {
    fetchItems("api/type").then((data) => device.setTypes(data));
    device.setSelectedType({});
  }, [device]);

  const changeType = () => {
    changeItem(`api/type/`, typeForChange)
      .then(() => {
        setTypeForChange({});
        device.setSelectedType({});
        onHide();
      })
      .catch((e) => console.log(e));
  };

  const closeWindow = () => {
    device.setSelectedType({});
    setTypeForChange({});
    setChooseOrChange(true);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить название типа
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {chooseOrChange ? (
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>
                {device.selectedType.name || "Выберите тип"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map((type) => (
                  <Dropdown.Item
                    onClick={() => {
                      device.setSelectedType(type);
                      setChangeOportunity(false);
                      setChooseOrChange(false);
                      setValue(type.name);
                      setTypeForChange(type);
                    }}
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Form.Control
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setTypeForChange({ ...typeForChange, name: e.target.value });
              }}
              placeholder={"Введите название типа"}
            />
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={closeWindow}>
          Закрыть
        </Button>
        <Button
          variant="outline-success"
          disabled={changeOportunity}
          onClick={changeType}
        >
          Изменить тип
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeType;
