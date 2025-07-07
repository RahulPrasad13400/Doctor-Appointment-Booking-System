import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

export default function DoctorContextProvider({ children }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if(data.success){
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if(data.success){
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        backendUrl,
        dToken,
        setDToken,
        getAppointments,
        appointments,
        setAppointments,
        cancelAppointment,
        completeAppointment
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}
