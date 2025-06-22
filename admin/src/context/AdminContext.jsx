import { createContext } from "react";

const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  return (
    <AdminContext.Provider value={{}}>
      {children}    
    </AdminContext.Provider>
  )
}
