import React from 'react';

const MeriFooter = () => {
  return (
    <footer className="bg-white border-t text-xs text-gray-400 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        
        {/* Support Notice */}
        <div className="bg-heading text-gray-300   text-center p-2 border rounded">
          For contact or publishing any notice here, mail to: 
          <strong className="text-Color"> merinet@cmeri.res.in</strong>
        </div>

        {/* Footer Links Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-left text-sm">

          <div>
            <h3 className="font-bold mb-1">Downloads</h3>
            <ul className="space-y-1 text-blue-600">
              <li><a href="https://merinet2.cmeri.res.in/SPSManuals.php" target="_blank">Standard Process Sheets</a></li>
              <li><a href="https://merinet2.cmeri.res.in/LANManual.pdf" target="_blank">LAN Manual</a></li>
              <li><a href="https://merinet2.cmeri.res.in/WiFiManual.pdf" target="_blank">WiFi Manual</a></li>
              <li><a href="https://fidslive.in/departure_no_add" target="_blank">Flight Schedule</a></li>
              <li><a href="https://merinet2.cmeri.res.in/forms.php" target="_blank">General Forms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-1">Services</h3>
            <ul className="space-y-1 text-blue-600">
              <li><a href="https://attendance.cmeri.res.in/login" target="_blank">CMERI Attendance Portal</a></li>
              <li><a href="https://cmeridgr.attendance.gov.in/" target="_blank">AEBAS Attendance</a></li>
              <li><a href="https://merinet2.cmeri.res.in/estore/index.php" target="_blank">CMERI Store</a></li>
              <li><a href="https://www.cmeri.res.in/about-us/directory" target="_blank">Manpower Directory</a></li>
              <li><a href="http://192.168.8.66/" target="_blank">WORKS Status</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-1">CSIR Labs</h3>
            <ul className="space-y-1 text-blue-600">
              <li><a href="https://www.csir.res.in" target="_blank">CSIR HQ</a></li>
              <li><a href="https://www.cecri.res.in/" target="_blank">CECRI</a></li>
              <li><a href="https://www.cbri.res.in/" target="_blank">CBRI</a></li>
              <li><a href="https://www.iictindia.org/" target="_blank">IICT</a></li>
              <li><a href="https://www.ncl-india.org/" target="_blank">NCL</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-1">Help & Info</h3>
            <ul className="space-y-1 text-blue-600">
              <li><a href="https://merinet2.cmeri.res.in/eOffice%20Training%20Part-1.pdf" target="_blank">e-Office Tutorials</a></li>
              <li><a href="https://youtu.be/Dqh87VwOc28" target="_blank">e-Office Video</a></li>
              <li><a href="mailto:csir.helpdesk@csir.res.in" target="_blank">Helpdesk Email</a></li>
              <li><a href="https://eoffice.csir.res.in/" target="_blank">e-Office Portal</a></li>
              <li><a href="https://merinet2.cmeri.res.in/feedback.php" target="_blank">Site Feedback</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center text-sm pt-4 border-t mt-6">
          <span>Follow us: </span>
          <a href="https://www.facebook.com/csir.cmeri" className="text-blue-600 mx-1" target="_blank">Facebook</a> |
          <a href="https://twitter.com/CSIR_CMERI" className="text-blue-600 mx-1" target="_blank">Twitter</a> |
          <a href="https://www.linkedin.com/company/43190992/admin/page-posts/published/" className="text-blue-600 mx-1" target="_blank">LinkedIn</a> |
          <a href="https://www.youtube.com/@csir_cmeri/videos" className="text-blue-600 mx-1" target="_blank">YouTube</a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-600 pt-3 border-t">
          © 2009-2025 CMERI Durgapur | All Rights Reserved<br />
          Developed & Maintained by <a href="https://merinet2.cmeri.res.in/developer.php" className="text-blue-600" target="_blank">Web Developer Team</a>
        </div>
      </div>
    </footer>
  );
};

export default MeriFooter;
