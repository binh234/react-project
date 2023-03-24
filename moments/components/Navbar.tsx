import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoMdAdd } from 'react-icons/io'
import { useSession, signIn, signOut } from 'next-auth/react'

import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { MdAccountCircle, MdLogout, MdSettings } from 'react-icons/md'

const Navbar = () => {
  // const { userProfile, addUser, removeUser }: any = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { data: session } = useSession()
  const { user: userProfile } = session || {}

  const handleLogout = () => {
    setIsOpen(false)
    signOut()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchInputRef.current!.value) {
      router.push(`/search/${searchInputRef.current!.value}`)
    }
  }

  function handleClick() {
    setIsOpen((open) => !open)
  }

  function handleClose() {
    setIsOpen(false)
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-2 md:px-4">
      <Link href="/" className="flex items-center">
        <div className="w-[48px] md:w-[56px]">
          <Image
            className="cursor-pointer"
            src="/logo2.png"
            width={500}
            height={500}
            alt="tiktik"
          />
        </div>
        <p className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-orange-400 hidden md:block">
          Moments
        </p>
      </Link>
      <div className="relative">
        <form onSubmit={handleSearch} className="static top-10 -left-20 bg-white">
          <input
            type="text"
            placeholder="Search"
            ref={searchInputRef}
            className="p-2 md:px-3 md:text-base border-gray-200 rounded-full border-2 focus:outline-none focus:border-gray-500 w-[200px] md:w-[350px] md:top-0"
          />
          <button className="absolute right-4 top-4 border-l-2 pl-2 md:pl-4 text-gray-800">
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-2 md:gap-6">
            <Link href="/upload">
              <button className="border-2 rounded-full md:rounded-lg p-2 md:px-4 text-base font-semibold flex items-center gap-2 hover:bg-primary hover:border-gray-400">
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image ? (
              <div ref={menuRef} className="relative">
                <button onClick={handleClick}>
                  <Image
                    width={40}
                    height={4}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="User"
                  />
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link href={`/profile/${userProfile?._id}`}>
                      <div
                        className="px-4 py-2 flex flex-row items-center gap-4 text-gray-800 hover:bg-primary"
                        onClick={handleClose}
                      >
                        <MdAccountCircle className="text-2xl" />
                        <p>Your Profile</p>
                      </div>
                    </Link>
                    <div
                      className="px-4 py-2 flex flex-row items-center gap-4 cursor-pointer text-gray-800 hover:bg-primary"
                      onClick={handleLogout}
                    >
                      <MdLogout className="text-2xl" />
                      <p>Sign out</p>
                    </div>
                    <div
                      className="px-4 py-2 flex flex-row items-center gap-4 cursor-pointer text-gray-800 hover:bg-primary"
                      onClick={handleClose}
                    >
                      <MdSettings className="text-2xl" />
                      <p>Settings</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="px-4 rounded-full border-2" onClick={handleLogout}>
                <AiOutlineLogout className="text-xl" color="red" />
              </button>
            )}
          </div>
        ) : (
          <button
            className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            onClick={() => signIn()}
          >
            <span className="relative px-4 lg:px-6 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
