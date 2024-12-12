import React, { useState, useEffect } from 'react';
import { Save, Github, Linkedin } from 'lucide-react';
import CountrySelect from '../components/CountrySelect';
import ProfileHeader from '../components/ProfileHeader';
import { calculateRank } from '../lib/ranks';
import Navbar from '../components/Navbar';
import CopyrightFooter from '../components/CopyrightFooter';

interface userdata {
  _id: string;
  username: string;
  email: string;
  country: string;
  college: string;
  githubUrl: string;
  linkedinUrl: string;
  aboutUs: string;
  __v: number;
}

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<userdata | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false); // For success message

  // Retrieve the username from sessionStorage
  const username = sessionStorage.getItem('username') || ''; 
  let experience = parseInt(localStorage.getItem('exp') || '1000'); 
  const rank = calculateRank(experience || 1000); 
  experience = experience >= 20000 ? 20000 : experience;

  // Fetch initial profile data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!username) return; // Ensure username is available

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/userprofile/${username}`);
        const data = await response.json();

        // Set the user data based on the API response
        setUserData({
          _id: data._id || '',
          username: data.username || '',
          email: data.email || '',
          country: data.country || '',
          college: data.college || '',
          githubUrl: data.githubUrl || '',
          linkedinUrl: data.linkedinUrl || '',
          aboutUs: data.aboutUs || '',
          __v: data.__v || 0,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // Check if there are changes in the form
  useEffect(() => {
    if (!userData) return;
    const hasFormChanges = JSON.stringify(userData) !== JSON.stringify({
      _id: '',
      username: '',
      email: '',
      country: '',
      college: '',
      githubUrl: '',
      linkedinUrl: '',
      aboutUs: '',
      __v: 0,
    });
    setHasChanges(hasFormChanges);
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleCountryChange = (value: string) => {
    setUserData(prev => prev ? { ...prev, country: value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) return;

    setLoading(true);
    try {
      if (!userData) return; // Ensure userData is available
      await fetch(`http://localhost:3000/userprofile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      setUpdateSuccess(true); // Set success message visibility to true
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
      // Hide the success message after a short period
      setTimeout(() => setUpdateSuccess(false), 5000); // Hide after 5 seconds
    }
  };

  // Return an empty form while loading data
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-white relative">
          <div className="relative max-w-4xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200">
              <ProfileHeader username="Loading..." email="Loading..." country="Loading..." rank={rank} cur_exp={experience || 1000} />
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Edit Profile</h3>
              <form className="space-y-6">
                {/* Empty fields during loading */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input type="text" id="username" disabled className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input type="email" id="email" disabled className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed" />
                  </div>

                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                      School/College/University
                    </label>
                    <input type="text" id="education" disabled className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed" />
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                      <span className="flex items-center gap-2">
                        <Linkedin size={16} /> LinkedIn Profile
                      </span>
                    </label>
                    <input type="url" id="linkedin" disabled value="Loading..." className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed" />
                  </div>

                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                      <span className="flex items-center gap-2">
                        <Github size={16} /> GitHub Profile
                      </span>
                    </label>
                    <input type="url" id="github" disabled value="Loading..." className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <textarea id="about" disabled className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) return <div>Loading...</div>; // Show a loading state if userData is not available

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
            alt="Background"
            className="w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="relative max-w-4xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200">
            <ProfileHeader
              username={userData.username}
              email={userData.email}
              country={userData.country}
              rank={rank}
              cur_exp={experience || 1000}
            />

            <h3 className="text-xl font-semibold text-gray-900 mb-6">Edit Profile</h3>

            {/* Success Message */}
            {updateSuccess && (
              <div className="mb-6 p-4 text-green-800 bg-green-100 border border-green-300 rounded-md">
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    disabled
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    disabled
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                    School/College/University
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="college"
                    value={userData.college}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your educational institution"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-2">
                      <Linkedin size={16} /> LinkedIn Profile
                    </span>
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedinUrl"
                    value={userData.linkedinUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter LinkedIn URL"
                  />
                  <a
                    href={userData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-500"
                  >
                    Visit LinkedIn Profile
                  </a>
                </div>

                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-2">
                      <Github size={16} /> GitHub Profile
                    </span>
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="githubUrl"
                    value={userData.githubUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter GitHub URL"
                  />
                  <a
                    href={userData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-500"
                  >
                    Visit GitHub Profile
                  </a>
                </div>

                <CountrySelect value={userData.country} onChange={handleCountryChange} />

                <div className="col-span-2">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <textarea
                    id="about"
                    name="aboutUs"
                    rows={4}
                    value={userData.aboutUs}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !hasChanges}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${hasChanges && !loading
                    ? 'bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CopyrightFooter />
    </>
  );
}
