import React, { useContext } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Container} from 'react-bootstrap';
import { NavLink, useHistory } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer ( () => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
      localStorage.setItem('token', '')
    }

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
                  onClick={()=>logOut()}>
                    Выйти
                </Button>
          </Nav>
          :
          <Nav style={{color:'white'}} className="ml-auto">
                <Button 
                  variant={'outline-light'} 
                  onClick={()=>history.push(LOGIN_ROUTE)}>
                    Авторизация
                </Button>
                <Button
                  style={{marginLeft:'10px'}}
                  variant={'outline-light'} 
                  onClick={()=>history.push(REGISTRATION_ROUTE)}>
                    Регистрация
                </Button>
          </Nav>
          }
        </Container>
        </Navbar>
    )
})

export default NavBar