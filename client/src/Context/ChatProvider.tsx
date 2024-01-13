import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ChatContext = createContext({});

export const ChatProvider = ({children}: any) => {
const [user, setUser] = useState('');
const navigate = useNavigate();

const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'false');
useEffect(() => {
setUser(userInfo);

if (!userInfo) {
    navigate('/');
}
},[navigate]);

    return <ChatContext.Provider value={{user, setUser}}>{children}</ChatContext.Provider>
};

export const ChatState = () => {
    return useContext(ChatContext);
}