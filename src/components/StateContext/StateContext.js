import { createContext, useContext, useState } from "react";

export const StateContext = createContext();

export const StateContextProvider = (props) => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState({});
    const addToCart = (item) => {
        setItems(previous => [...previous, ...item]);
    }
    const removeItem = (id) => {
        const newItems = [...items];
        const index = items.findIndex(index => index.id === id);
        newItems.splice(index, 1);
        setItems(newItems);
    }

    const removeAllItems = () => {
        setItems([]);
    }

    const logIn = (response) => {
        setUser(response);
    }

    const initialState = {
        items,
        addToCart,
        removeAllItems,
        logIn,
        removeItem,
        user: user,
    }

    return <StateContext.Provider value={initialState}>
        {props.children}
    </StateContext.Provider>
}

export const UseStateValue = () => useContext(StateContext);

