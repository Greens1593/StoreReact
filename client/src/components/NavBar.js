import React, { useContext } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Container} from 'react-bootstrap';
import { NavLink, useHistory } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer ( () => {
    const {user} = useContext(Context)
    const history = useHistory()
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink style={{color:'white', textDecoration:'none'}} to={SHOP_ROUTE}>Store</NavLink>
          {user.isAuth ?
            <Nav style={{color:'white'}} className="ml-auto">
                <Button 
                  variant={'outline-light'}
                  onClick={()=>history.push(ADMIN_ROUTE)}>
                    Админпанель
                </Button>
                <Button 
                  variant={'outline-light'} 
                  style={{marginLeft:'10px'}} 
                  onClick={()=>history.push(LOGIN_ROUTE)}>
                    Выйти
                </Button>
          </Nav>
          :
          <Nav style={{color:'white'}} className="ml-auto">
                <Button 
                  variant={'outline-light'} 
                  onClick={()=>user.setIsAuth(true)}>
                    Авторизация
                </Button>
          </Nav>
          }
        </Container>
        </Navbar>
    )
})

export default NavBar