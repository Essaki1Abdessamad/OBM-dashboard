import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  /* {
    title: 'Campaigns',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  }, */
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'ADsets',
    path: '/ADsetsForm',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'ADcopie',
    path: '/ADcopie',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'CreateAds',
    path: '/CreateAds',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  }
];