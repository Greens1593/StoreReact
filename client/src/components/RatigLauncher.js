import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { Context } from "..";
import { check } from "../http/userAPI";

const RatigLauncher = observer(() => {
  const { user } = useContext(Context);
  const [estimateDevice, setEstimateDevice] = useState(true);
  console.log(user);
  useEffect(() => {
    if (user.isAuth) {
      check();
    }
  }, []);
  return (
    <div>
      {estimateDevice ? (
        <Form
          className="d-flex flex-column align-item-center mb-3"
          style={{ fontSize: "14px", fontWeight: 700 }}
          onClick={(e) => console.log(e.target.id)}
        >
          <Form.Label>Ваша оценка устройства</Form.Label>
          <Form.Group
            className="mb-3 align-item-center"
            controlId="formBasicEmail"
          >
            <Form.Check
              inline
              label="1"
              name="assеssment"
              type="radio"
              id={1}
            />
            <Form.Check
              inline
              label="2"
              name="assеssment"
              type="radio"
              id={2}
            />
            <Form.Check
              inline
              label="3"
              name="assеssment"
              type="radio"
              id={3}
            />
            <Form.Check
              inline
              label="4"
              name="assеssment"
              type="radio"
              id={4}
            />
            <Form.Check
              inline
              label="5"
              name="assеssment"
              type="radio"
              id={5}
            />
          </Form.Group>
        </Form>
      ) : (
        <Row>Вы уже оценили это устройство</Row>
      )}
    </div>
  );
});

export default RatigLauncher;
