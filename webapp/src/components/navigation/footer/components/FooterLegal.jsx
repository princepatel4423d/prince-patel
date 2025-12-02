import React from "react";
import { Link } from "react-router-dom";

const FooterLegal = () => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-1 gap-2 justify-center">
      <div className="text-sm">
        &copy; 2025 Prince Patel. All rights reserved
      </div>

      <div className="flex items-center gap-2">
        <Link to='privacy-policy' className="text-sm hover:text-black dark:hover:text-gray-200">
          Privacy Policy
        </Link>
        <Link to='terms-conditions' className="text-sm hover:text-black dark:hover:text-gray-200">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
};

export default FooterLegal;