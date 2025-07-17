import React from 'react';
import CardSection from '../settingsComponents/CardSection';

const ProfileSettings = () => {
  return (
    <CardSection title="Profile Settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Picture Upload */}
        <div className="col-span-2 flex items-center gap-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
            Upload / Edit Photo
          </button>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value="Vishwani Vilochana"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Contact Number</label>
          <input
            type="text"
            value="+94 71 234 5678"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            value="vishwani@evion.lk"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Password Change */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <button className="text-blue-600 underline text-sm mt-2">Change Password</button>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            type="text"
            value="Station Owner"
            disabled
            className="w-full border border-gray-200 p-2 bg-gray-100 rounded-md text-gray-500"
          />
        </div>
      </div>
    </CardSection>
  );
};

export default ProfileSettings;
