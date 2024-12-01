import { Link } from "react-router-dom";

function App() {

  return (
    <>
      <div className="w-full h-screen relative">
        <picture className="absolute inset-0">
          <Link to="/pokemon">
            <img src="/walpaperPika.jpeg" className="w-full h-screen object-contain bg-yellow-400" alt="" />
          </Link>
        </picture>
      </div>
    </>
  )
};

export default App;
