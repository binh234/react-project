import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoMdAdd } from 'react-icons/io';
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import Logo from '@/utils/tiktik-logo.png'
import { createOrGetUser } from '@/utils'
import useAuthStore from '@/store/authStore'
import { AiOutlineLogout } from 'react-icons/ai';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    googleLogout();
    removeUser();
  }

  function handleClick() {
    setIsOpen(open => !open);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image className="cursor-pointer" src={Logo} alt="tiktik" />
        </div>
      </Link>
      <div>Search</div>
      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href="/upload">
              <button className='border-2 rounded-full md:rounded-lg p-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' /> {` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile?.image ? (
              <div ref={menuRef} className='relative'>
                <button onClick={handleClick}>
                  <Image width={40} height={4} className='rounded-full cursor-pointer' src={userProfile.image} alt="User" />
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleClose}>Your Profile</div>
                    <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleClose}>Sign out</div>
                    <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleClose}>Settings</div>
                  </div>
                )}
              </div>
            ) : <></>}
            <button className='px-2 rounded-full border-2' onClick={handleLogout}>
              <AiOutlineLogout className='text-xl' color='red' />
            </button>
          </div>
        ) :
          <GoogleLogin
            onSuccess={credentialResponse => {
              createOrGetUser(credentialResponse, addUser);
            }}
            onError={() => {
              console.log('Login Failed');
            }} />}
      </div>
    </div>
  )
}

export default Navbar