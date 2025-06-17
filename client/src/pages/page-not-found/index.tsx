import React from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../../components/constant";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#e8ecef] text-gray-800">
      <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">404</h1>
      <p className="text-xl md:text-2xl font-semibold mt-4">Oops! Page not found</p>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved. Try going back to the homepage.
      </p>
      <button
        onClick={() => navigate(path.LANDING_PAGE)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-md"
      >
        Return Home
      </button>
    </div>
  );
};

export default NotFoundPage;
