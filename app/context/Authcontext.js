'use client';
import { createContext, useContext, useReducer, useEffect } from "react"
import Authreducer from "../Reducers/AuthReducer";

const Authcontext = createContext()

export default function AuthProvider({ children }) {

    // const storedAuthState = localStorage.getItem("authToken");


    const [authState, authDispatch] = useReducer(Authreducer, {
        isAuthenticated: false,
        user: ''
    })

    console.log(authState.user)

    useEffect(() => {
        const storedAuthState = localStorage.getItem("authToken");
        console.log(storedAuthState)
        if (storedAuthState) {
            authDispatch({
                type: "LOAD_AUTH_STATUS",
                payload: true
            })
        }
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            authDispatch({
                type: 'USER',
                payload: user
            })
        }
    }, [])


    return (
        <Authcontext.Provider value={{ authState, authDispatch }}>
            {children}
        </Authcontext.Provider>
    );
}

export const useAuthContext = () => {
    return useContext(Authcontext);
};