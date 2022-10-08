import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

const AdminBar = () =>{
    const [createVisible, setCreateVisible] = useState(true)
    const [removeVisible, setRemoveVisible] = useState(false) 

        return( 
            <ListGroup as="ul" className="mt-3">
                   <ListGroup.Item
                        style={{cursor:'pointer'}} 
                        as="li"
                    >
                        Создать новые позиции
                    </ListGroup.Item>
                    <ListGroup.Item
                        style={{cursor:'pointer'}} 
                        as="li"
                    >
                        Удалить позиции
                    </ListGroup.Item>
                    <ListGroup.Item
                        style={{cursor:'pointer'}} 
                        as="li"
                    >
                        Изменить позиции
                    </ListGroup.Item>
                    <ListGroup.Item
                        style={{cursor:'pointer'}} 
                        as="li"
                    >
                        Заказы
                    </ListGroup.Item>
            </ListGroup>
        )
}

export default AdminBar