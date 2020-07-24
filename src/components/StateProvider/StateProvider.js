// setup data layer 
//we need this to track the basket

import React, { createContext, useContext, useReducer } from "react";

// This is the data layer
export const StateContext = createContext();

// Build the Provider 
export const StateProvider = ({ })