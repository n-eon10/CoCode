import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const [state, dispatch] = useReducer(authReducer, {
        user: userFromLocalStorage || null, // Set the initial state based on local storage
    });

    useEffect(() => {
        // No need to check local storage here since we've already set the initial state
        console.log("Authcontext state:", state);
    }, [state]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};