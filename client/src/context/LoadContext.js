import { createContext, useState } from 'react'

export const LoadContext = createContext(0)

export const LoadContextProvider = ({ children }) => {
    const [loadCount, setLoadCount] = useState(0)
    const loadValue = {loadCount, setLoadCount}
    
    return (
      <LoadContext.Provider
        value={loadValue}
      >
        {children}
      </LoadContext.Provider>
    )
  }