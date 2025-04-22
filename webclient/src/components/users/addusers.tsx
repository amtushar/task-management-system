"use client"
import { handleUserSubmit, validatePassword } from '@/functions/users/adduser';
import { User } from '@/types/users';
import {  handleEmailInputChange } from '@/utils/common';
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { handlePhoneChange } from '@/functions/common/phoneInput';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';


const Addusers = () => {

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("")
  const [phoneInputError, setPhoneInputError] = useState<string>(''); 

  const userid: string = useSelector((state: RootState) => state.user.userID);
  const username: string = useSelector((state: RootState) => state.user.name);


  const data: User = {
    userID: "",
    name: userName,
    email: email,
    password: password,
    contact: contact,
  }

  const resetForm = () => {
    setUserName("");
    setEmail("");
    setContact("+91");
    setPassword("");
    setConfirmPassword("");
  };

 
    
   
    const passwordValidateOnChange = (e: string) => {
      const passwordValidationError = validatePassword(e);
      if (passwordValidationError) {
        setPasswordError((prev) => prev = passwordValidationError);
        return;
      }
      else{
        setPasswordError("")
      }
    }



  return (
    <>
      <div>
        <form
          method="POST"
          onSubmit={(e) =>
            handleUserSubmit(e, data, password, confirmPassword, phoneInputError, {
              resetForm
            }, userid, username)
          }
          className="flex flex-col shadow-lg bg-white bg-opacity-90 py-6 px-4 rounded-md animate_animated animate_fadeIn mt-4 max-w-[860px] mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
            Add Member to team
          </h2>
          <p className="text-sm text-gray-700 text-center mb-8">
            To be filled by authorized person only
          </p>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Member Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => handleEmailInputChange(e, setEmail)}
              required
            />
          </div>

       
          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-900">
              Contact
            </label>
            <PhoneInput
              country="in"
              onlyCountries={["in"]}
              placeholder="Contact*"
              value={contact}
              onChange={(phone) =>
                handlePhoneChange(phone, setPhoneInputError, setContact)
              }
            />
            {phoneInputError && (
              <p className="text-red-500 text-sm mt-1">{phoneInputError}</p>
            )}
          </div>

         
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                passwordValidateOnChange(e.target.value)
              }}
              required
            />
            {passwordError && <p className='text-sm text-red-500'>{passwordError}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="confirm-password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            {confirmPassword.length > 0 && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>

      
          <div className="mt-6 flex items-center justify-end">
            <button
              type="submit"
              className="bg-[#9ceb1c] hover:bg-[#85c214] text-white font-semibold py-2 px-6 rounded-md shadow-sm"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
   
    </>
  )
}

export default Addusers