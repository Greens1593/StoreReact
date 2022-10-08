import React, { createContext } from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import AdminStore from './store/AdminStore';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

export const Context = createContext(null)

console.log(process.env.REACT_APP_API_URL)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        admin: new AdminStore(),
    }}>
        <App />
    </Context.Provider>,
);
