import { createContext } from "react";

const DoctorContext = createContext()

export default function DoctorContextProvider({ children }) {
  return (
    <DoctorContext.Provider value={{}}>
      {children}
    </DoctorContext.Provider>   
  )
}
