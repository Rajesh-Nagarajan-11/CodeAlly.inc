import React, { useState, useEffect } from 'react';
import { Save, Github, Linkedin } from 'lucide-react';
import CountrySelect from '../components/CountrySelect';
import ProfileHeader from '../components/ProfileHeader';
import { calculateRank } from '../lib/ranks';
import Navbar from '../components/Navbar';

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialData = {
    username: "John Doe",
    email: "john.doe@example.com",
    about: "",
    linkedin: "",
    github: "",
    country: "",
    experience: 1000,
    education: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  const rank = calculateRank(formData.experience);

  useEffect(() => {
    const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
    setHasChanges(hasFormChanges);
  }, [formData, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      country: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving profile:', formData);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Profile URL copied to clipboard!');
  };

  return (
    <><Navbar /><div className="min-h-screen bg-white relative">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
          alt="Background"
          className="w-full h-full object-cover opacity-5" />
      </div>

      <div className="relative max-w-4xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200">
          <ProfileHeader
            username={initialData.username}
            email={initialData.email}
            country={formData.country}
            rank={rank}
            cur_exp={formData.experience}
            onShare={handleShare} />

          <h3 className="text-xl font-semibold text-gray-900 mb-6">Edit Profile</h3>

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
                  value={formData.username}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 cursor-not-allowed" />
              </div>

              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  School/College/University
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your educational institution" />
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
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/username" />
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
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://github.com/username" />
              </div>

              <CountrySelect
                value={formData.country}
                onChange={handleCountryChange} />

              <div className="col-span-2">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  rows={4}
                  value={formData.about}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Tell us about yourself..." />
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
    </div></>
  );
}