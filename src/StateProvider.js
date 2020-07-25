// setup data layer
// we need this to trackk the basket

import React, { createContext, useContext, useReducer } from "react";

// This is the data layer 
export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)