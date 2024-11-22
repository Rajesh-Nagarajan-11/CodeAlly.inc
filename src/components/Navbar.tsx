import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-gray-900">CodeAlly</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
            <Link to="/register" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}