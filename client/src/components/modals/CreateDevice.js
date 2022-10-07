import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal, Col, Row } from "react-bootstrap";
import { Context } from "../..";
import { createItem, fetchItems } from "../../http/deviceAPI";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    
    useEffect(()=> {
        fetchItems('api/type').then(data => device.setTypes(data))
        fetchItems('api/brand').then(data => device.setBrands(data))
    }, [])

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addInfo = () => {
        setInfo([...info, {title:'', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createItem('api/device', formData)
            .then(()=>onHide())
            .catch(e => console.log(e.message))
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
                Добавить устройство
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className='d-flex flex-column align-items-center'>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>
                      {device.selectedType.name || 'Выберите тип'}  
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type => 
                            <Dropdown.Item 
                                onClick={()=>device.setSelectedType(type)} 
                                key={type.id}>

                                    {type.name}

                            </Dropdown.Item>
                            )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle>
                        {device.selectedBrand.name || 'Выберите бренд'}   
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand => 
                            <Dropdown.Item
                            onClick={()=>device.setSelectedBrand(brand)} 
                            key={brand.id}>
                            
                                {brand.name}
                            
                            </Dropdown.Item>
                            )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    className="mt-3"
                    placeholder="Введите название устройства"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Form.Control
                    className="mt-3"
                    placeholder="Введите цену устройства"
                    type="number"
                    value={price}
                    onChange={e => setPrice(+e.target.value)}
                />
                <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFile}
                />
                <hr/>
                <Button
                    variant="outline-dark"
                    onClick={addInfo}
                >
                    Добавить новое свойство
                </Button>
                {info.map(i =>
                    <Row className="mt-3" key={i.number}>
                        <Col md={4}>
                            <Form.Control
                            placeholder="Название"
                            value={i.title}
                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                            placeholder="Описание"
                            value={i.description}
                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                            />
                        </Col>
                        <Col md={4}>
                            <Button variant="outline-danger"
                                onClick={()=> removeInfo(i.number)}
                                >
                                Удалить
                            </Button>
                        </Col>
                    </Row>
                    )}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
            <Button variant='outline-success' onClick={addDevice}>Добавить новое устройство</Button>
        </Modal.Footer>
    </Modal>        
    )
})

export default CreateDevice;