import { useState, useEffect } from "react";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

import { Link } from "react-router-dom";

export default function Profile({
  userProfile,
  updateUserProfile,
  addNotification,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);

  // Load the current user's information into the form
  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.first_name || "");
      setLastName(userProfile.last_name || "");
    }
  }, [userProfile]);

  // Save updated profile information
  const handleSave = async () => {
    try {
      setSaving(true);

      await updateUserProfile({
        first_name: firstName,
        last_name: lastName,
      });

      addNotification("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      addNotification("Failed to update profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl border border-orange-100 bg-white p-10 shadow-sm dark:border-[#1A237E] dark:bg-[#03045E]/10 backdrop-blur-md">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#574A3F] dark:text-white">
              Profile Settings
            </h1>

            <p className="mt-2 text-[#8A8178] dark:text-gray-300">
              Update your personal information.
            </p>
          </div>

          {/* Return to Preferences page */}
          <Link
            to="/preferences"
            className="group flex items-center gap-2 rounded-2xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-100 hover:shadow-sm dark:border-[#24359E] dark:text-[#E1CB40] dark:hover:bg-[#16206B]"
          >
            <HiOutlineArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back</span>
          </Link>
        </div>

        {/* Profile Form */}
        <div className="mt-12 space-y-6">
          {/* First Name */}
          <div>
            <label className="mb-2 block font-medium text-[#574A3F] dark:text-white">
              First Name
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 px-4 dark:border-[#1A237E]">
              <HiOutlineUser className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-transparent p-4 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block font-medium text-[#574A3F] dark:text-white">
              Last Name
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 px-4 dark:border-[#1A237E]">
              <HiOutlineUser className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-transparent p-4 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Email (Read Only) */}
          <div>
            <label className="mb-2 block font-medium text-[#574A3F] dark:text-white">
              Email
            </label>

            <div className="flex items-center rounded-2xl border border-orange-100 bg-gray-50 px-4 dark:border-[#1A237E] dark:bg-[#07104D]">
              <HiOutlineEnvelope className="text-orange-500 dark:text-[#E1CB40]" />

              <input
                type="email"
                value={userProfile?.email || ""}
                disabled
                className="w-full bg-transparent p-4 text-gray-500 outline-none dark:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="
              rounded-2xl
              px-8
              py-3
              font-semibold
              transition
              disabled:opacity-60
              bg-orange-500
              text-white
              hover:bg-orange-600
              dark:bg-[#E1CB40]
              dark:text-[#03045E]
              dark:hover:bg-[#d6c03b]
            "
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
