import NoResults from '@/components/NoResults'
import useAuthStore from '@/store/authStore'
import { BASE_URL } from '@/utils'
import axios from 'axios'
import React from 'react'
import Head from 'next/head'
import VideoForm from '@/components/VideoForm'
import { MdErrorOutline } from 'react-icons/md'
import { Video } from '@/types'

interface IProps {
  post: Video
}

const Update = ({ post }: IProps) => {
  const { userProfile }: { userProfile: any } = useAuthStore()

  if (!userProfile) {
    return <NoResults text="Please login to continue" icon={<MdErrorOutline />} />
  } else if (!(userProfile?._id === post.userId)) {
    return (
      <NoResults
        text="This post doesn't exist or you don't have permission to do this action"
        icon={<MdErrorOutline />}
      />
    )
  }

  return (
    <div className="flex w-full h-full pr-10">
      <Head>
        <title>Upload</title>
        <meta name="description" content="Upload video" />
      </Head>
      <div className="bg-white rounded-lg w-[100%] md:w-[90%]">
        <div>
          <p className="text-2xl font-bold">Update Video</p>
        </div>
        <VideoForm post={post} />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: {
      post: data,
    },
  }
}

export default Update
