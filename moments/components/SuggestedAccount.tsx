import useAuthStore from '@/store/authStore'
import { IUser } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { GoVerified } from 'react-icons/go'

const SuggestedAccount = () => {
  const { fetchSuggestedUsers, suggestedUsers } = useAuthStore()

  useEffect(() => {
    fetchSuggestedUsers()
  }, [fetchSuggestedUsers])

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Suggested Account</p>
      <div>
        {suggestedUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image
                  width={32}
                  height={32}
                  className="rounded-full"
                  src={user.image}
                  alt={user._id}
                />
              </div>

              <div className="hidden xl:block">
                <p className="flex gap-1 items-center text-base font-bold text-primary lowercase">
                  {user.userName.replaceAll(' ', '')} <GoVerified className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccount
