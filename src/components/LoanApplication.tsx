import React from "react";
import { useNavigate } from "react-router-dom";

const LoanApplication: React.FC = () => {
  const navigate = useNavigate(); // For back navigation

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%]">
        <h2 className="text-xl font-bold mb-4">APDS Loan Application</h2>
        
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <input type="text" className="w-full border rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">School Name</label>
            <input type="text" className="w-full border rounded-md p-2" />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Submit</button>
        </form>

        <button onClick={() => navigate(-1)} className="mt-4 text-red-500">Back</button>
      </div>
    </div>
  );
};

export default LoanApplication;
