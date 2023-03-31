import { IKContext, IKImage } from 'imagekitio-react'
import React from 'react'
import { download } from '../assets'
import { downloadImage } from '../utils'

const Card = ({ _id, name, prompt, photo, tags }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <IKContext urlEndpoint="https://ik.imagekit.io/sk5wks3z1">
        <IKImage
          path={photo}
          loading="lazy"
          lqip={{ active: true }}
          className="w-full h-auto object-cover rounded-xl"
        />
      </IKContext>
      <div className="group-hover:flex flex-col gap-4 max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-base overflow-y-auto prompt">{prompt}</p>
        {tags?.length > 0 && (
          <div className="flex flex-row gap-2 items-center">
            {tags.map((tag) => (
              <p
                key={tag}
                className="px-2 py-1 rounded-full text-white bg-emerald-500 capitalize text-sm"
              >
                {tag}
              </p>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo, 'url')}
            className="outline-none bg-transparent border-none hover:opacity-80"
          >
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
