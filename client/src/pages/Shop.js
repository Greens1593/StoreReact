import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviseList";
import TypeBar from "../components/TypeBar";
import { fetchItems } from "../http/deviceAPI";

const Shop = observer(() => {
    const {device} = useContext(Context)
    useEffect(()=> {
        fetchItems('api/type').then(data => device.setTypes(data))
        fetchItems('api/brand').then(data => device.setBrands(data))
        fetchItems('api/device').then(data => device.setDevices(data.rows))
    }, [])
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    )
})

export default Shop