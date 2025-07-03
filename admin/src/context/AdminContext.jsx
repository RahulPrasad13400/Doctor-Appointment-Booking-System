import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //  IMPORTANT (.ENV FILE IL NINN VALUE KITTAN VENDI FRONT ENDIL)

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-doctors", {
        headers: { aToken },
      });
      if (data?.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const {data} = await axios.post(
        backendUrl + "/api/admin/change-availability",
        {docId},
        { headers: { aToken } }
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllDoctors()
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
