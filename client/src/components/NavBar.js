import React, { useContext } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer ( () => {
    const {user} = useContext(Context)
    return (
        <Navbar style={{display:'flex', padding:'20px', justifyContent:'space-between', color:'white'}} bg="dark" variant="dark">
          <NavLink style={{color:'white', textDecoration:'none'}} to={SHOP_ROUTE}>Store</NavLink>
          {user.isAuth ?
          <Nav style={{color:'white'}} className="mr-auto">
                <Button variant='outline-light'>Админпанель</Button>
                <Button style={{marginLeft:'4%'}} variant='outline-light' onClick={()=>user.setIsAuth(false)}>Выйти</Button>
          </Nav>
          :
          <Nav style={{color:'white'}} className="mr-auto">
                <Button variant='outline-light' onClick={()=>user.setIsAuth(true)}>Авторизация</Button>
          </Nav>
          }
        </Navbar>
    )
})

export default NavBar