import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png"

const DevicePage = () => {
    const device = {id:1, name:'Iphone 12 pro', price: 25000, rating: 5, img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_8493_0_1_637780309584432932.webp'}
    const description = [
        {id:1, title:'Test', description:'Test'},
        {id:2, title:'Test', description:'Test'},
        {id:3, title:'Test', description:'Test'},
        {id:4, title:'Test', description:'Test'},
        {id:5, title:'Test', description:'Test'},
    ]
    return (
        <Container>
          <div style={{
            display:'flex',
            marginTop: '3%'
          }}>
            <Col md={4}>
                <Image width={300} height={300} src={device.img}/>
            </Col>
            <Col md={4}>
                <Row className="d-flex flex-column align-items-center">
                    <h2>{device.name}</h2>
                </Row>
                <Row
                    className="d-flex align-items-center justify-content-center"
                    style={{background: `url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundSize:'cover',fontSize:64}}
                >
                    {device.rating}
                </Row>
            </Col>
            <Col md={4}>
                <Card
                    className="d-flex flex-column align-items-center justify-content-around"
                    style={{width:300, height: 300, fontSize:32, border:'5px solid lightgray'}}
                >
                    <h3>От {device.price} грн.</h3>
                    <Button variant={'outLine-dark'}>Добавить в корзину</Button>
                </Card>
            </Col>
          </div>
          <Row className="d-flex flex-column m-3">
            <h1 style={{padding:5}}>Характеристики</h1>
            {description.map((info, index) => 
                <Row key={info.id} style={{background: (index % 2 === 0) ? 'lightgray' : 'transpare', padding:5}}>
                    {info.title}:{info.description}
                </Row>
                )}
          </Row>
        </Container>
    )
}

export default DevicePage