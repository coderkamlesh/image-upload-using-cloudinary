import { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("name", imageName);

    //another way of creating object
    const formData = {
      image,
      name: imageName,
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error("Error uploading image: ", error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />
        <input
          type="text"
          placeholder="Image Name"
          value={imageName}
          onChange={handleImageNameChange}
        />
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadImage;
