import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { deleteteItem, fetchItems } from "../../http/deviceAPI";

const DeleteType = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  const [deleteOportunity, setDeleteOportunity] = useState(true);

  useEffect(() => {
    fetchItems("api/type").then((data) => device.setTypes(data));
  }, [device]);

  const deleteType = () => {
    const id = device.selectedType.id;
    deleteteItem(`api/type/${id}`).then(() => {
      device.setSelectedType({});
      onHide();
    });
  };

  const closeWindow = () => {
    device.setSelectedType({});
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedType.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => {
                    device.setSelectedType(type);
                    setDeleteOportunity(false);
                  }}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={closeWindow}>
          Закрыть
        </Button>
        <Button
          variant="outline-success"
          disabled={deleteOportunity ? true : false}
          onClick={deleteType}
        >
          Удалить тип
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteType;
