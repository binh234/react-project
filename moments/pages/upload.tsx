import { client } from '@/utils/client'
import React, { FormEvent, useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '@/utils/constants'
import useAuthStore from '@/store/authStore'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { BASE_URL } from '@/utils'
import { ClipLoader } from 'react-spinners'
import BeatLoader from 'react-spinners/BeatLoader'
import VideoForm from '@/components/VideoForm'

const Upload = () => {

  const { userProfile }: { userProfile: any } = useAuthStore()

  if (!userProfile) {
    return <div>Login to continue</div>
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
