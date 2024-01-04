import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="h-screen w-[100%] bg-green-100 flex ">
      <header className="w-[20%] flex flex-col">
        <Link to="/">home</Link>
        <Link to="/showImages">Images</Link>
        <Link to="/uploadImages">Upload</Link>
      </header>
      <main className="w-[70%]">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
