import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowImage from "./components/ShowImage";
import Home from "./components/Home";
import UploadImage from "./components/UploadImage";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/showImages" element={<ShowImage />} />
          <Route path="/uploadImages" element={<UploadImage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
