import AccountCard from '@/components/AccountCard'
import NoResults from '@/components/NoResults'
import VideoCard from '@/components/VideoCard'
import { IUser, Video } from '@/types'
import { BASE_URL } from '@/utils'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineNoAccounts, MdOutlineVideocamOff } from 'react-icons/md'

interface IProps {
  data: {
    videos: Video[]
    accounts: IUser[]
  }
}

const Search = ({ data: { videos, accounts } }: IProps) => {
  const [displayTab, setDisplayTab] = useState('Accounts')
  const tabs = useMemo(() => ['Accounts', 'Videos'], [])
  const router = useRouter()
  const { searchTerm } = router.query
  const active = 'border-b-2 border-black'
  const inactive = 'text-gray-400'

  return (
    <div className="w-full">
      <div>
        <div className="flex gap-8 my-8 border-b-2 border-gray-200 bg-white w-full">
          {tabs.map((tab) => (
            <p
              key={tab}
              className={`text-lg font-semibold cursor-pointer mt-2 ${
                displayTab === tab ? active : inactive
              }`}
              onClick={() => setDisplayTab(tab)}
            >
              {tab}
            </p>
          ))}
        </div>
        <div className="flex gap-4 flex-col md:justify-start">
          {displayTab === tabs[0] &&
            (accounts.length > 0 ? (
              accounts.map((user) => <AccountCard user={user} key={user._id} />)
            ) : (
              <NoResults
                text={`No ${displayTab} found for ${searchTerm}`}
                icon={<MdOutlineNoAccounts />}
              />
            ))}
          {displayTab === tabs[1] &&
            (videos.length > 0 ? (
              videos.map((post: Video) => <VideoCard post={post} key={post._id} />)
            ) : (
              <NoResults
                text={`No ${displayTab} found for ${searchTerm}`}
                icon={<MdOutlineVideocamOff />}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm.toLowerCase()}`)
  console.log(res.data)

  return {
    props: {
      data: res.data,
    },
  }
}

export default Search
