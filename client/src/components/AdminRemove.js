import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "./modals/CreateBrand";
import CreateDevice from "./modals/CreateDevice";
import DeleteType from "./modals/DeleteType";


const AdminRemoveItems = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className='d-flex flex-column'>
            <Button 
                variant={'outline-dark'} 
                className='mt-3 p-2'
                onClick={() => setTypeVisible(true)}>
                    Удалить тип
            </Button>
            <Button 
                variant={'outline-dark'} 
                className='mt-3 p-2'
                onClick={() => setBrandVisible(true)}>
                    Удалить бренд
            </Button>
            <Button 
                variant={'outline-dark'} 
                className='mt-3 p-2'
                onClick={() => setDeviceVisible(true)}>
                    Удалить устройство
            </Button>
            
            <CreateDevice show={deviceVisible} onHide = {() => setDeviceVisible(false)}/>
            <CreateBrand show={brandVisible} onHide = {() => setBrandVisible(false)}/>
            <DeleteType show={typeVisible} onHide = {() => setTypeVisible(false)}/>
        
        </Container>
    )
}

export default AdminRemoveItems