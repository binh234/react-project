interface IPostedBy {
  _id: string
  userName: string
  image: string
}

export interface IComment {
  comment: string
  length?: number
  _key: string
  postedBy: IPostedBy
}
export interface Video {
  _id: string
  _createdAt: string
  caption: string
  content: string
  topic: string
  video: {
    asset: {
      _id: string
      url: string
    }
  }
  postedBy: IPostedBy
  likes: {
    postedBy: IPostedBy
  }[]
  comments: IComment[]
}

export interface IUser {
  _id: string
  _type: string
  userName: string
  image: string
}
export interface ISessionUser {
  _id: string
  name: string
  email: string
  image: string
}
