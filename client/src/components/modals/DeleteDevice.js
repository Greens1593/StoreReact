import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Row, InputGroup } from "react-bootstrap";
import { Context } from "../..";
import { fetchItems } from "../../http/deviceAPI";
import DeviceLauncher from "../DeviceLauncher";

const DeleteDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    
    useEffect(()=> {
        fetchItems('api/device').then(data => {
            device.setDevices(data.rows)})
    }, [device])

    const [name, setName] = useState('')

    const foundedDevice = device.devices.filter(device => device.name === name)

    const showLaunch = (foundedDevice) => {
        if(foundedDevice){
            return <DeviceLauncher device={foundedDevice}/>
        }
    }


    const closeWindow = () => {
        setName('')
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
                    onChange={e => setName(e.target.value)}
                    />
                </InputGroup>
                    <Row className='d-flex'>
                        
                    </Row>
                <hr/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={closeWindow}>Закрыть</Button>
            <Button variant='outline-success' onClick={onHide}>Удалить устройство</Button>
        </Modal.Footer>
    </Modal>        
    )
})

export default DeleteDevice;