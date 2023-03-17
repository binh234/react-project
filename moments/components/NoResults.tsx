import React from 'react'

interface IProps {
  text: string
  icon: React.ReactNode
}

const NoResults = ({ text, icon }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">{icon}</p>
      <p className="text-lg text-center">{text}</p>
    </div>
  )
}

export default NoResults
