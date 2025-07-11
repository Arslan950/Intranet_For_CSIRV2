// GovernmentLinks.jsx

import React from 'react';

const GovernmentLinks = () => {
  const links = [
    { text: 'Ministries', url: 'https://igod.gov.in/ug/E002/organizations' },
    { text: 'Educational', url: 'https://igod.gov.in/sector/BRNsIHQBsvhI6u6Q3tju/organizations' },
    { text: 'Scientific and Research', url: 'https://igod.gov.in/sector/EhNsIHQBsvhI6u6Q3tju/organizations' },
    { text: 'International', url: 'https://igod.gov.in/sector/FxNsIHQBsvhI6u6Q3tju/organizations' },
  ];

  return ( 
    <div className=" shadow-md  border border-gray-300 bg-box-col m">
      
      <div className="bg-heading py-2 text-Color border-b border-gray-400">
        <h2 className="text-lg font-bold text-[#f05757]">Government Links</h2>
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
  );
};

export default GovernmentLinks;