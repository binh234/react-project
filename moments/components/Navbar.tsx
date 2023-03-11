import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import Logo from '@/utils/tiktik-logo.png'

const Navbar = () => {
  const user = false;
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image className="cursor-pointer" src={Logo} alt="tiktik" />
        </div>
      </Link>
      <div>Search</div>
      <div>
        {user ? (
          <div>Logged in</div>
        ) : <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }} />}
      </div>
    </div>
  )
}

export default Navbar