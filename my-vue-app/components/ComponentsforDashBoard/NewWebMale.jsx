// WebMailInfo.jsx

import React from "react";
import Govlinks from "./GovLinks";

const WebMailInfo = ({ Classes }) => {
  const links = [
    { text: "Ministries", url: "https://igod.gov.in/ug/E002/organizations" },
    {
      text: "Educational",
      url: "https://igod.gov.in/sector/BRNsIHQBsvhI6u6Q3tju/organizations",
    },
    {
      text: "Scientific and Research",
      url: "https://igod.gov.in/sector/EhNsIHQBsvhI6u6Q3tju/organizations",
    },
    {
      text: "International",
      url: "https://igod.gov.in/sector/FxNsIHQBsvhI6u6Q3tju/organizations",
    },
  ];
  return (
    <div
      className={`${
        Classes ? Classes : ``
      }  flex flex-col gap-6 `}
    >
      <div className={`border border-gray-300  bg-box-col shadow-md `}>
        {/* Header */}
        <div className="bg-heading py-2 text-center">
          <h2 className="text-lg font-bold text-Color">New Web Mail</h2>
        </div>

        <div className=" p-4  flex flex-col items-center">
          {/* Image and @GOV.IN text */}
          <div className="flex items-center justify-center mb-4">
            <a
              href="https://accounts.mgovcloud.in/signin?servicename=VirtualOffice&serviceurl=https%3A%2F%2Fmail.mgovcloud.in%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="/Indian.png"
                alt="Indian Emblem"
                className="h-16 mr-2"
              />
            </a>
          </div>
          <div className="mb-4">
            <a
              href="https://accounts.mgovcloud.in/signin?servicename=VirtualOffice&serviceurl=https%3A%2F%2Fmail.mgovcloud.in%2F" // Replace with the actual URL for "New Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline font-semibold"
            >
              New Platform
            </a>
          </div>

          {/* FAQ, Policy, Training links */}
          <div className="flex justify-center space-x-6 text-sm">
            <a
              href="http://mgovcloud.in/mail/help/faq-nicemailservices.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              FAQ
            </a>
            <a
              href="https://merinet2.cmeri.res.in/eMailPolicy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              Policy
            </a>
            <a
              href="https://merinet2.cmeri.res.in/ComprehensiveTraining.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              Training
            </a>
          </div>
        </div>
      </div>

      <div className=" shadow-md  border border-gray-300 bg-box-col ">
        <div className="bg-heading py-2 text-center">
          <h2 className="text-lg font-bold text-Color">Government Links</h2>
        </div>

        <div className=" p-4 min-h-fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-800">
            {links.map((link, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 text-gray-700">*</span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {link.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebMailInfo;
