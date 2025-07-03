import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddDoctor() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [loading, setLoading] = useState(false);

  const { aToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!docImg) {
        setLoading(false)
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setAbout("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={onSubmitHandler}>
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border text-gray-300 rounded w-full max-w-4xl max-h-[80vh]: overflow-y-scroll no-scrollbar">
        {/* HEADING */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload-image"
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        {/* MAIN */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* LEFT SIDE */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                type="text"
                placeholder="Name"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                type="email"
                placeholder="Your email"
                className="border rounded px-3 py-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className="border rounded px-3 py-2"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              >
                <option value={"1 Year"}>1 Year</option>
                <option value={"2 Year"}>2 Year</option>
                <option value={"3 Year"}>3 Year</option>
                <option value={"4 Year"}>4 Year</option>
                <option value={"5 Year"}>5 Year</option>
                <option value={"6 Year"}>6 Year</option>
                <option value={"7 Year"}>7 Year</option>
                <option value={"8 Year"}>8 Year</option>
                <option value={"9 Year"}>9 Year</option>
                <option value={"10 Year"}>10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="text"
                placeholder="Your fees"
                className="border rounded px-3 py-2"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                name=""
                id=""
                className="border rounded px-3 py-2"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <p>Address</p>
              <input
                type="text"
                placeholder="Addesss 1"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
              />
              <input
                type="text"
                placeholder="Addesss 2"
                required
                className="border rounded px-3 py-2"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </div>
        <div className="text-gray-600">
          <p className="mt-4 mb-2">About me</p>
          <textarea
            className="w-full px-4 pt-2 border rounded"
            placeholder="write about yourself"
            rows={5}
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          >
            {" "}
          </textarea>
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 rounded-full text-white"
          onClick={onSubmitHandler}
        >
          {loading ? (
            <span>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />{" "}
              Adding Doctor...
            </span>
          ) : (
            "Add doctor"
          )}
        </button>
      </div>
    </form>
  );
}
