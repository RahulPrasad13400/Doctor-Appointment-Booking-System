import { createContext, useState } from "react";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {

  const [aToken, setAToken] = useState(localStorage.getItem('aToken')||'')

  const backendUrl = import.meta.env.VITE_BACKEND_URL //  IMPORTANT (.ENV FILE IL NINN VALUE KITTAN VENDI FRONT ENDIL)

  return (
    <AdminContext.Provider value={{aToken, setAToken, backendUrl}}>
      {children}    
    </AdminContext.Provider>
  )
}
