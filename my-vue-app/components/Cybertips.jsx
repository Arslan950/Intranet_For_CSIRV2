// CyberSecurityTips.jsx

import React from 'react';

const CyberSecurityTips = ({Classes}) => {
  const tips = [
    "Use strong, unique passwords for all your accounts. Consider using a password manager.",
    "Enable two-factor authentication (2FA) wherever possible for an extra layer of security.",
    "Be cautious of suspicious emails and links. Always verify the sender before clicking.",
    "Keep your software, operating system, and antivirus up to date to protect against vulnerabilities.",
    "Regularly back up your important data to an external drive or cloud service.",
  ];

  return (
    <div className={`max-w-full ${Classes}  bg-box-col shadow-md border border-gray-300`}>
      {/* Header */}
      <div className="bg-heading py-2 text-center border-b border-gray-400">
        <h2 className="text-lg font-bold text-Color">Cyber Security Tips</h2>
      </div>

      <div className=" p-4  flex flex-col justify-between">
        {/* Tips Section */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-700">Tips by CyberDost</p>
          <ul className="list-disc list-inside text-left mt-4 text-sm text-black">
            {tips.map((tip, index) => (
              <li key={index} className="mb-2">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination placeholder - as requested, not functional pages */}
        {/* <div className="flex justify-center items-center mt-4 text-sm">
          <button className="text-blue-700 hover:underline px-2 py-1 cursor-not-allowed opacity-50">
            Previous
          </button>
          <span className="bg-amber-300 text-black font-bold px-3 py-1 mx-1 border border-yellow-600">
            1
          </span>
          <span className="text-blue-700 px-3 py-1 mx-1 border border-transparent cursor-not-allowed opacity-50">
            2
          </span>
          <button className="text-blue-700 hover:underline px-2 py-1 cursor-not-allowed opacity-50">
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CyberSecurityTips;