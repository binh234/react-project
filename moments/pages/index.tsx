import NoResults from '@/components/NoResults'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
import axios from 'axios'
import Head from 'next/head'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

interface IProps {
  videos: Video[]
}

export default function Home({ videos }: IProps) {
  return (
    <>
      <Head>
        <title>Moments</title>
      </Head>
      <main>
        <div>
          <div className='flex flex-col gap-10 videos h-full'>
            {videos.length ? (
              videos.map((video: Video) => (
                <VideoCard post={video} key={video._id}/>
              ))
            ) : <NoResults text={'No Videos'}/>}
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data
    }
  }
}
