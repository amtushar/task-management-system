import React from 'react';

import {
  MdPerson
} from 'react-icons/md'; 
import { FaUserCog, FaUserPlus } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";

const routes = [
 
  {
    name: 'Add Tasks',
    layout: '/admin',
    icon: <MdAddTask className="h-6 w-6" />,
    path: 'tasks',
  },
  {
    name: 'Ongoing Tasks',
    layout: '/admin',
    icon: <FaTasks className="h-6 w-6" />,
    path: 'showtasks',
  },
  {
    name: 'Missed Tasks',
    layout: '/admin',
    icon: <BiTaskX className="h-6 w-6" />,
    path: 'missedtasks',
  },
  {
    name: 'Done Tasks',
    layout: '/admin',
    icon: <MdOutlineTaskAlt className="h-6 w-6" />,
    path: 'donetasks',
  },
  {
    name: 'Add Members',
    layout: '/admin',
    icon: <FaUserPlus className="h-6 w-6" />,
    path: 'users',
  },
  {
    name: 'View Members',
    layout: '/admin',
    icon: <FaUserCog className="h-6 w-6" />,
    path: 'viewusers',
  },
  {
    name: 'Performance',
    layout: '/admin',
    path: 'performance',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },

 
];
export default routes;