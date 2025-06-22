import React, { useState } from "react";
import { assets } from "../assets/assets";

export default function Login() {
  const [state, setState] = useState("Admin");

  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state} </span>
          Login
        </p>
        <div className="w-full">
          <p className="font-semibold">Email</p>
          <input type="email" required className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none" />
        </div>
        <div className="w-full">
          <p className="font-semibold">Password</p>
          <input type="password" required className="border border-[#DADADA] rounded w-full p-2 mt-1 outline-none" />
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
        {
          state === 'Admin' ? <p>Doctor Login <span className="text-primary underline cursor-pointer" onClick={()=>setState('Doctor')} >Click here</span></p> : 
          <p>Admin Login <span className="text-primary underline cursor-pointer" onClick={()=>setState('Admin')}>Click here</span> </p>
        }
      </div>
    </form>
  );
}
