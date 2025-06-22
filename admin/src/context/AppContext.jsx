import { createContext, useContext, useState } from 'react';

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}

