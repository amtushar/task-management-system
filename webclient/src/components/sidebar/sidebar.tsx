'use client'
import { HiX } from 'react-icons/hi';
import Links from './links';

import { IRoute } from '../../types/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

function SidebarHorizon(props: { routes: IRoute[];[x: string]: any }) {
  const { routes, open, setOpen } = props;

  const userRole = useSelector((state: RootState) => state.user.userRole);

  const filteredRoutes = routes
    .map((route) => {
      if (userRole === "member") {
        if (["Add Tasks", "Add Members", "View Members"].includes(route.name)) {
          return null;
        }
      }
  
      if (userRole === "TeamLead" && route.name === "Performance") {
        return null;
      }
  
      return route;
    })
    .filter((route): route is IRoute => route !== null); // Filter out null values and assert route is IRoute
  
  return (
<div
  className={`fixed top-0 mt-16 left-0 h-full w-64 overflow-y-auto bg-[#000000] text-white shadow-lg transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-thumb-[#9ceb1c] scrollbar-track-black scrollbar-thumb-rounded-lg z-50 ${
    open ? 'translate-x-0' : '-translate-x-full'
  } xl:translate-x-0`}
>
  {/* Close Button */}
  <button
    className="absolute top-4 right-4 text-white transition-colors duration-300 xl:hidden hover:text-[#9ceb1c]"
    onClick={() => setOpen(false)}
  >
    <HiX size={24} />
  </button>

 {/* Brand Section */}
<div className="flex items-center justify-center py-2">
  <div className="flex items-center space-x-2">
      {/* Replace text with image */}
      {/* <img src="https://task-management-system-7crt.vercel.app/logo.webp" alt="Brand Logo" className="h-30 w-40 object-cover" /> */}
    <p className="text-lg font-semibold uppercase tracking-wide text-white">
      {/* Optionally, you can add the brand name here if needed */}
    </p>
  </div>
</div>


  {/* Divider */}
  {/* User Role Display */}
<div className="flex justify-center items-center py-3">
  <div
    className={"text-2xl font-extrabold px-6 rounded-full bg-green-600"}
  >
    { userRole ? userRole === "TeamLead" ? "Team Lead" : "Member" : "Loading..."}
  </div>
</div>

  <div className="border-t border-gray-700 mb-4"></div>

  {/* Navigation Links */}
  {userRole && filteredRoutes ? 
  <ul className="space-y-2 px-4">
 <Links routes={filteredRoutes} /> 
  </ul>
  :  Array.from({ length: 6}).map((_, i) => <div key={i} className='animate-pulse h-8 w-3/4 rounded bg-gray-700 mx-auto my-2'/> )}

  {/* Push Footer to Bottom */}
  <div className="flex-grow"></div>

  {/* Footer Section */}
  <div className="flex flex-col justify-center items-center py-6 border-t border-gray-700 mx-4">
  <p className="text-sm text-white text-center">
    &copy; {new Date().getFullYear()} TMS - All rights reserved.
  </p>
  <p className="text-sm text-white text-center">
    Developed by{" "}
    <a 
      href="https://www.linkedin.com/in/tushar-dhingra-03738622a/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
    >
      Tushar Dhingra
    </a>
  </p>
</div>
</div>


  
  );
}

export default SidebarHorizon;