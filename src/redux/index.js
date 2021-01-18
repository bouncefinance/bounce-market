import React, { useReducer } from 'react'
import { reducer, initState } from './reducer'

export const myContext = React.createContext()

export const Reducer = (props) => {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <myContext.Provider value={{ state, dispatch }}>
            {props.children}
        </myContext.Provider>
    )
}
