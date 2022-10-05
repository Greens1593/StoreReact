import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import Star from "../assets/Star.png"
import {useHistory} from 'react-router-dom'
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <Col md={3} className={'mt-3'} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width:150, cursor:'pointer'}} border={'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + '/' + device.img} alt={device.name}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.brandId}</div>
                    <div className="d-flex align-items-center">
                        <div style={{paddingRight:3}}>{device.rating}</div>
                        <Image style={{width:18, height:18}} src={Star}/>
                    </div>
                </div>
                <div>Brand name</div>
            </Card>
        </Col>
    )
}

export default DeviceItem