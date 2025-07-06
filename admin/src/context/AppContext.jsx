import { createContext } from "react";

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const slotDateFormat = (date) => {
    const dateArray = date.split("_");
    return `${dateArray[0]} ${months[dateArray[1]]} ${dateArray[2]}`;
  };

  const currency = "$";

  return (
    <AppContext.Provider value={{ calculateAge, slotDateFormat, currency }}>
      {children}
    </AppContext.Provider>
  );
}
