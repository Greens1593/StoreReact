import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { changeItem, fetchItems } from "../../http/deviceAPI";

const ChangeBrand = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  const [value, setValue] = useState("");
  const [deleteOportunity, setDeleteOportunity] = useState(true);
  const [chooseOrChange, setChooseOrChange] = useState(true);
  const [brandForChange, setBrandForChange] = useState({});

  useEffect(() => {
    fetchItems("api/brand").then((data) => device.setBrands(data));
    device.setSelectedBrand({});
  }, [device]);

  const changeBrand = () => {
    changeItem(`api/brand/`, brandForChange)
      .then(() => {
        setBrandForChange({});
        onHide();
        device.setSelectedBrand({});
      })
      .catch((e) => console.log(e));
  };

  const closeWindow = () => {
    device.setSelectedBrand({});
    setBrandForChange({});
    setChooseOrChange(true);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Изменить название бренда
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {chooseOrChange ? (
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>
                {device.selectedBrand.name || "Выберите бренд"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  <Dropdown.Item
                    onClick={() => {
                      device.setSelectedBrand(brand);
                      setDeleteOportunity(false);
                      setChooseOrChange(false);
                      setValue(brand.name);
                      setBrandForChange(brand);
                    }}
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Form.Control
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setBrandForChange({ ...brandForChange, name: e.target.value });
              }}
              placeholder={"Введите название бренда"}
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
          disabled={deleteOportunity ? true : false}
          onClick={changeBrand}
        >
          Изменить бренд
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeBrand;
