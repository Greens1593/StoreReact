import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import { estimate, fetchOneItem } from "../http/deviceAPI";
import { getRatedDevice } from "../http/userAPI";
import RatigLauncher from "../components/RatigLauncher";
import { Context } from "..";

const DevicePage = () => {
  const { user } = useContext(Context);
  const [device, setDevice] = useState({ info: [] });
  const [deviceRating, setDeviceRating] = useState(0);
  const [abilityToEstimate, setAbilityToEstimate] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("token") !== "") {
      getRatedDevice().then((data) => {
        if (data.indexOf(id) === -1) {
          setAbilityToEstimate(true);
        }
      });
    }
    fetchOneItem("api/device/", id).then((data) => {
      setDevice(data);
      setDeviceRating(device.rating);
    });
  }, [id, device.rating]);
  const estimateDevice = (e) => {
    if (e.target.id) {
      const rate = e.target.id;
      estimate(`api/device/${id}`, { rate })
        .then((data) => {
          setDeviceRating(data);
          setAbilityToEstimate(false);
        })
        .catch((e) => alert(e.message));
    }
  };
  return !device.img ? (
    <Spinner animation="border" />
  ) : (
    <Container>
      <Row
        style={{
          display: "flex",
          marginTop: "3%",
        }}
      >
        <Col md={4}>
          <Image
            width={300}
            height={320}
            src={process.env.REACT_APP_API_URL + device.img}
            alt={device.name}
          />
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 320, fontSize: 32, border: "none" }}
          >
            <Row className="d-flex flex-column align-items-center">
              <h2>{device.name}</h2>
            </Row>
            <Row
              className="d-flex flex-column align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 250,
                height: 240,
                backgroundSize: "76%",
                fontSize: 45,
                fontWeight: 700,
              }}
            >
              {deviceRating}
            </Row>
            <div style={{ fontSize: 20, textAlign: "center", display: "flex" }}>
              {!user.isAuth ? (
                <Row className="mt-2">
                  Устройства могут оценивать только авторизированые пользователи
                </Row>
              ) : (
                <Row className="mt-2">
                  {abilityToEstimate ? (
                    <RatigLauncher onClick={estimateDevice} />
                  ) : (
                    <Row>Вы уже оценили это устройство</Row>
                  )}
                </Row>
              )}
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 320,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>От {device.price} грн.</h3>
            <Button variant={"outLine-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1 style={{ padding: 5 }}>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transpare",
              padding: 5,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
