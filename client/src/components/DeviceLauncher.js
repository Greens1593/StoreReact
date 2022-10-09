import React from "react";
import { Image, Row } from "react-bootstrap";

const DeviceLauncher = ({device}) => {
    
    return (
        <Row className="d-flex flex-nowrap align-items-baseline" style={{width:498, cursor:'pointer'}} border={'light'}>
                <Image width={15} height={15} src={process.env.REACT_APP_API_URL + '/' + device.img} alt={device.name}/>
                <div>{device.brand.map(brand => brand.name)}</div> 
                <div>{device.name}</div>
        </Row>
    )
}

export default DeviceLauncher