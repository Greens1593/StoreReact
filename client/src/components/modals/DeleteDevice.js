import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, InputGroup } from "react-bootstrap";
import { fetchItems } from "../../http/deviceAPI";
import DeviceLauncher from "../DeviceLauncher";

const DeleteDevice = observer(({show, onHide}) => {

    const [name, setName] = useState('')
    const [devices, setDevices] = useState([])
    const [foundedDevice, setFoundedDevice] = useState([])
    const [deviceForDelete, setDeviceForDelete] = useState([])

    const chooseDeviceForDelete = (devices) => {
        setDeviceForDelete(devices)   
    }    

    useEffect(()=> {
        fetchItems('api/device').then(data => {
            setDevices(data.rows)})
    }, [])


    const foundDevice = ()=>{
        const founded = devices.filter(device => (!(-1 === device.name.toLowerCase().indexOf(name.toLocaleLowerCase()))))
        setFoundedDevice(founded)
    }

    

    const closeWindow = () => {
        setName('')
        onHide()
    }

    const deleteDevice = () => {
        console.log(deviceForDelete)
        onHide()
    }

    return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Удалить устройство
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Поиск</InputGroup.Text>
                <Form.Control
                    placeholder="Введите название устройства"
                    aria-label="Введите название устройства"
                    aria-describedby="basic-addon1"
                    value={name}
                    onChange={e => {
                        setName(e.target.value)
                        foundDevice()
                    }}
                    />
                </InputGroup>
                    <Row className='d-flex'>
                        {foundedDevice.length === 0 ? 
                            <Row className="d-flex justify-content-center">Устройств с таким названием не найдено</Row> :
                                foundedDevice.map(device => 
                                    <DeviceLauncher 
                                    key={device.id} 
                                    foundDevice={device}
                                    onClick={chooseDeviceForDelete}
                                    />
                                )}
                    </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={closeWindow}>Закрыть</Button> 
            <Button 
                variant='outline-success' 
                onClick={deleteDevice}
                disabled={deviceForDelete ? true : false}
                >
                    Удалить устройство
            </Button>  
        </Modal.Footer>
    </Modal>        
    )
})

export default DeleteDevice;