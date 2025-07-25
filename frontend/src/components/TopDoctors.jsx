import { useNavigate } from "react-router-dom";
// import { doctors } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function TopDoctors() {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-[var(--grid-cols-auto)] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt={item.name} />
              <div className="p-4">
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></p>
                  <p>{item.available ? 'Available' : 'Not available'}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm ">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => navigate(`/doctors`)}
        className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 text-gray-600 hover:text-gray-800 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
}
