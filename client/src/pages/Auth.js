import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}
        >
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите email"
                    />
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите пароль"
                    />
                    <div 
                        style={{
                            display:'flex',
                            flexWrap:'nowrap', 
                            width: '100%', 
                            alignItems:'baseline', 
                            marginTop:'6%', 
                            justifyContent:'space-between'
                        }}>
                        {isLogin ? <div>
                            Нет аккаунта?  
                            <NavLink style={{paddingLeft:'3px'}} to={REGISTRATION_ROUTE}>
                                Зарегестрироватся
                            </NavLink>
                        </div> : <div>
                            Есть аккаунта?  
                            <NavLink style={{paddingLeft:'3px'}} to={LOGIN_ROUTE}>
                                Войдите
                            </NavLink>
                        </div>}
                        <Button
                            variant={"outline-success"}
                            style={{width:'auto'}}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default Auth