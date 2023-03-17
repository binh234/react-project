import { IUser } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go'

interface IProps {
  user: IUser
}

const AccountCard = ({ user }: IProps) => {
  return (
    <Link href={`/profile/${user._id}`} key={user._id}>
      <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-300">
        <div className="w-12 h-12">
          <Image width={48} height={48} className="rounded-full" src={user.image} alt={user._id} />
        </div>

        <div className="hidden xl:block">
          <p className="flex gap-1 items-center text-base font-bold text-primary lowercase">
            {user.userName.replaceAll(' ', '')} <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
        </div>
      </div>
    </Link>
  )
}

export default AccountCard
