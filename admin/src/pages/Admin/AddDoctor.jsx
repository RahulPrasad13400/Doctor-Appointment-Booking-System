import { assets } from "../../assets/assets";

export default function AddDoctor() {
  return (
    <form>
      <p>Add Doctor</p>
      <div>
        {/* HEADING */}
        <div className="flex items-center text-sm">
          <label htmlFor="doc-img">
            <img src={assets.upload_area} alt="upload-image" />
          </label>
          <input type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        {/* MAIN */}
        <div>
          {/* LEFT SIDE */}
          <div>
            <div>
              <p>Doctor name</p>
              <input type="text" placeholder="Name" required />
            </div>

            <div>
              <p>Doctor Email</p>
              <input type="email" placeholder="Your email" />
            </div>

            <div>
              <p>Doctor Password</p>
              <input type="password" placeholder="Password" />
            </div>

            <div>
              <p>Experience</p>
              <select>
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

            <div>
              <p>Fees</p>
              <input type="text" placeholder="Your fees" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div>
              <p>Speciality</p>
              <select name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p>Education</p>
              <input type="text" placeholder="Education" required />
            </div>

            <div>
              <p>Address</p>
              <input type="text" placeholder="Addesss 1" required />
              <input type="text" placeholder="Addesss 2" required />
            </div>
          </div>

          <div>
            <p>About me</p>
            <textarea placeholder="write about yourself" rows={5}>
              {" "}
            </textarea>
          </div>

          <button type="submit">Add doctor</button>
        </div>
      </div>
    </form>
  );
}
