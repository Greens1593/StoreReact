import { observer } from "mobx-react-lite";
import React from "react";
import { Form } from "react-bootstrap";

const RatigLauncher = observer((props) => {
  return (
    <Form
      className="d-flex flex-column align-item-center mb-3"
      style={{ fontSize: "14px", fontWeight: 700 }}
      onClick={props.onClick}
    >
      <Form.Label>Ваша оценка устройства</Form.Label>
      <Form.Group className="mb-3 align-item-center" controlId="formBasicEmail">
        <Form.Check inline label="1" name="assеssment" type="radio" id={1} />
        <Form.Check inline label="2" name="assеssment" type="radio" id={2} />
        <Form.Check inline label="3" name="assеssment" type="radio" id={3} />
        <Form.Check inline label="4" name="assеssment" type="radio" id={4} />
        <Form.Check inline label="5" name="assеssment" type="radio" id={5} />
      </Form.Group>
    </Form>
  );
});

export default RatigLauncher;
