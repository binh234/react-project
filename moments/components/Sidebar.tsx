import useAuthStore from '@/store/authStore';
import { createOrGetUser } from '@/utils';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import React, { useState } from 'react'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import Footer from './Footer';
import SuggestedAccount from './SuggestedAccount';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const {userProfile, addUser} = useAuthStore();
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded'

  return (
    <div>
      <div className='block xl:hidden m-2 mt-3 text-xl' onClick={() => setShowSidebar((prev) => !prev)}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 md:w-16 w-14 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl'><AiFillHome /></p>
                <span className='text-xl hidden xl:block'>For You</span>
              </div>
            </Link>
          </div>
          {userProfile === null && (
            <div className='px-2 py-4 hidden xl:block'>
              {/* <p className='text-gray-400'>Login</p> */}
              <div className='pr-4'>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    createOrGetUser(credentialResponse, addUser);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }} />
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccount />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar