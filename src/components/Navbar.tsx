import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.removeItem("username");
    navigate('/');
  };

  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/userprofile' || location.pathname=='/code';

  useEffect(() => {
    if (username) {
      const tag = document.getElementById('name');
      const tempusername = username.split(" ");
      let letters = '';
      tempusername.forEach((name) => {
        letters += name[0];
      });
      if (tag) {
        tag.innerHTML = letters.substring(0, 3);
      }
    }
  }, [username]);

  return (
    <nav className="bg-white shadow-sm z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-gray-900">CodeAlly</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isDashboard ? (
              <>
                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                >
                  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>
                  </div>
                  <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Logout
                  </div>
                </button>
                <Link to='/userprofile' className="relative inline-flex items-center justify-center w-11 h-11 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300" id='name'></span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
                <Link to="/register" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
