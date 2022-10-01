import React, { useContext } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Container} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer ( () => {
    const {user} = useContext(Context)
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink style={{color:'white', textDecoration:'none'}} to={SHOP_ROUTE}>Store</NavLink>
          {user.isAuth ?
            <Nav style={{color:'white'}} className="ml-auto">
                <Button variant={'outline-light'}>Админпанель</Button>
                <Button variant={'outline-light'} style={{marginLeft:'10px'}} onClick={()=>user.setIsAuth(false)}>Выйти</Button>
          </Nav>
          :
          <Nav style={{color:'white'}} className="ml-auto">
                <Button variant={'outline-light'} onClick={()=>user.setIsAuth(true)}>Авторизация</Button>
          </Nav>
          }
        </Container>
        </Navbar>
    )
})

export default NavBar