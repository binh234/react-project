import React, { FormEvent, useRef, useState } from 'react'
import useAuthStore from '@/store/authStore'
import Head from 'next/head'
import VideoForm from '@/components/VideoForm'
import NoResults from '@/components/NoResults'
import { MdErrorOutline } from 'react-icons/md'

const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore()

  if (!userProfile) {
    return <NoResults text="Please login to continue" icon={<MdErrorOutline />} />
  }

  return (
    <div className="flex w-full h-full pr-10">
      <Head>
        <title>Upload</title>
        <meta name="description" content="Upload video" />
      </Head>
      <div className="bg-white rounded-lg w-[100%] md:w-[90%]">
        <div>
          <p className="text-2xl font-bold">Upload Video</p>
          <p className="text-base text-gray-400 mt-1">Post a video to your account</p>
        </div>
        <VideoForm />
      </div>
    </div>
  )
}

export default Upload
