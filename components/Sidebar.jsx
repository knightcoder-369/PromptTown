"use client";

import { SignOutButton } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-lg font-bold">Dashboard</h2>
      <ul className="mt-4 space-y-2">
        <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Home</li>
        <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">Profile</li>
      </ul>

      {/* Sign-Out Button at Bottom */}
      <div className="absolute bottom-4 left-4">
        <SignOutButton>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
};

export default Sidebar;

