import React, { createContext, useState } from 'react'



const Context = createContext()


export const Provider = (props)=>{
  const [detail, setDetail] = useState(null)


  return<Context.Provider value={{ setDetail, detail }}>
          { props.children }
        </Context.Provider>
}

export default Context
