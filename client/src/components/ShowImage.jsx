import { useEffect, useState } from "react";
import axios from "axios";

function ShowImage() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    async function getImageData() {
      const response = await axios.get("http://localhost:3333/images");
      setImageData(response.data.data);
    }
    getImageData();
  }, []);

  return (
    <div>
      {imageData?.map((image) => (
        <div key={image._id}>
          <h1 className="h-12">{image.name}</h1>
          <img src={image.image} alt={image.image} className="h-48 w-48" />
        </div>
      ))}
    </div>
  );
}

export default ShowImage;
