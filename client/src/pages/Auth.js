import { observer } from "mobx-react-lite";
import React, { useContext, useState  } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";

const Auth = observer(() => {
    const {user} = useContext(Context) 

    const history = useHistory()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
       try{
        let data
        if(isLogin){
            data = await login(email, password)
        } else if (!isLogin) {
            data = await registration(email, password)
        }
        
        user.setUser(user)
        user.setIsAuth(true)
        history.push(SHOP_ROUTE)
       } catch(e){
        alert(e.response.data.message)
        }
    }

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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-4"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={p => setPassword(p.target.value)}
                        type="password"
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
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth