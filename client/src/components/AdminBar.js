import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";

const AdminBar = observer(() => {
  const { admin } = useContext(Context);

  return (
    <ListGroup as="ul" className="mt-3">
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        as="li"
        onClick={() => admin.setNumberOfList(0)}
        active={admin.numberOfList === 0}
      >
        Создать новые позиции
      </ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        as="li"
        onClick={() => admin.setNumberOfList(1)}
        active={admin.numberOfList === 1}
      >
        Удалить позиции
      </ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        as="li"
        onClick={() => admin.setNumberOfList(2)}
        active={admin.numberOfList === 2}
      >
        Изменить позиции
      </ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        as="li"
        onClick={() => admin.setNumberOfList(3)}
        active={admin.numberOfList === 3}
      >
        Заказы
      </ListGroup.Item>
    </ListGroup>
  );
});

export default AdminBar;
