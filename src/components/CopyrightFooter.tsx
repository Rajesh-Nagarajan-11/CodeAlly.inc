import React from 'react';

const CopyrightFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bottom-0 left-0 w-full bg-red-600 text-center py-2 text-sm text-white z-50">
      © {currentYear} Code Ally. All Rights Reserved.
    </footer>
  );
};

export default CopyrightFooter;