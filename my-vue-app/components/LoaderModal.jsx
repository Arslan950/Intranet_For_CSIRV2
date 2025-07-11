// components/LoaderModal.jsx
import React from "react";

const LoaderModal = ({ loading, message = "Loading..." }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg text-center w-60">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">{message}</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto" />
      </div>
    </div>
  );
};

export default LoaderModal;
