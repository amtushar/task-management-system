"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { handleSaveClick } from "@/functions/profile/updateProfile";
import { Users } from "@/types/users";
import { handlePhoneChange } from "@/functions/common/phoneInput";

const ViewProfile = () => {

  const user: Users = useSelector((state: RootState) => state.user);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // Toggle edit mode
  const [phoneInputError, setPhoneInputError] = useState<string>('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setContact(user.contact);
    }

  }, [user, formSubmitted])



  const userData = {
    userID: user.userID,
    name: name,
    email: email,
    contact: contact,
  }

  return (
    <>

      <div className="flex flex-col shadow-lg bg-white bg-opacity-90 py-6 px-4 rounded-md animate_animated animate_fadeIn mt-8 max-w-[860px] mx-auto">
        <form>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Profile</h2>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Contact Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <PhoneInput
                country="in"
                onlyCountries={['in']}
                placeholder="Enter your contact"
                inputStyle={{
                  width: '100%',
                  padding: '2rem',
                  marginLeft: '1rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #e5e7eb',
                }}
                containerStyle={{ width: '100%' }}
                value={contact}
                onChange={(phone) =>
                  handlePhoneChange(phone, setPhoneInputError, setContact)
                }
              />
               {phoneInputError && (
              <p className="text-red-500 text-sm mt-1">{phoneInputError}</p>
            )}
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              onClick={(e) =>
                handleSaveClick(e, userData, setFormSubmitted, phoneInputError, formSubmitted)
              }
              className="px-8 py-3 text-white bg-teal-600 hover:bg-teal-700 rounded-md font-medium shadow-lg transition-all duration-300"
            >
              Update
            </button>
          </div>
        </form>


      </div>

    </>

  );
};

export default ViewProfile;



