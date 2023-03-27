import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../Component/Logout";

function Navbar() {
  const [image, setImage] = useState(null);
  const [staffData,setStaffData] = useState({ProfilePicture:null});
  let staffName = sessionStorage.getItem("username")

const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        const selectedImage = event.target.files[0];
        setImage({
          url: URL.createObjectURL(selectedImage),
          blob: selectedImage
        });
      }
   }
   const onSaveButtonClick = () => {
    onSaveImage();
  }
  const onSaveImage = async () => {
    if (!image) 
    {
    alert("no image")
    return;
    }
        

    const reader = new FileReader();
    reader.readAsDataURL(image.blob);
    reader.onload = async () => {
      // Convert the image to a base64-encoded string
      const base64Image = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

      // Update staff object with new profile picture
      const updatedStaff = { ...staffData, ProfilePicture: base64Image };
      setStaffData(updatedStaff);

      // Send updated staff data to server
      const resp = await fetch(`https://localhost7057/api/staffs/${staffName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStaff),
      });
      const newData = await resp.json();
      console.log(newData);
    };
  };
  useEffect(() => {
    async function fetchStaffData() {
      const resp = await fetch(`https://localhost7057/api/staffs/${staffName}`);
      const data = await resp.json();
      setStaffData(data);
    }
    fetchStaffData();
  }, []);
  return (
    <div className="top-container">
      <h1>Company</h1>
      <nav>
        <ul>
          <li>
            <Link to="/staffPanel">Dashboard</Link>
          </li>
          <li>
            <Link to="/staffTickets">My Tickets</Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      <div className="profile">
      <div>
      <div className="img" style={{backgroundImage: `url(data:image/png;base64,${staffData.ProfilePicture})`}}></div>
      <div>
        <input className="file" type="file"  onClick={onImageChange} accept="image/*"/>
      </div>
      <div>
        <button className="save" onClick={onSaveButtonClick}>Save</button>
      </div>
      </div>
      </div>
    </div>
  );
}
export default Navbar;
