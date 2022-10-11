import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { deleteteItem, fetchItems } from "../../http/deviceAPI";

const DeleteBrand = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    
    useEffect(()=> {
        fetchItems('api/brand').then(data => device.setBrands(data))
    }, [device])

    const deleteBrand = () => {
        const id = device.selectedBrand.id
        deleteteItem(`api/brand/${id}`).then(() => {
            device.setSelectedBrand({})
            onHide()
        })
    }

    const closeWindow = () => {
        device.setSelectedBrand({})
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
                Удалить бренд
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>
                      {device.selectedBrand.name || 'Выберите тип'}  
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
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger' onClick={closeWindow}>Закрыть</Button>
            <Button variant='outline-success' onClick={deleteBrand}>Удалить бренд</Button>
        </Modal.Footer>
    </Modal>        
    )
})

export default DeleteBrand;