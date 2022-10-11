import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import { fetchOneItem } from "../http/deviceAPI";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneItem("api/device/", id).then((data) => setDevice(data));
  }, [id]);
  return (
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
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </Row>
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
