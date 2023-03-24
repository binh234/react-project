import NoResults from '@/components/NoResults'
import { BASE_URL } from '@/utils'
import axios from 'axios'
import React from 'react'
import Head from 'next/head'
import VideoForm from '@/components/VideoForm'
import { MdErrorOutline } from 'react-icons/md'
import { ISessionUser, Video } from '@/types'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

interface IProps {
  post: Video
  user: ISessionUser
}

const Update = ({ post, user }: IProps) => {
  if (!user) {
    return <NoResults text="Please login to continue" icon={<MdErrorOutline />} />
  } else if (!post) {
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const { user } = session
  const { id }: any = context.params
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}?userId=${user._id}`)

  return {
    props: {
      post: data,
      user: user,
    },
  }
}

export default Update
