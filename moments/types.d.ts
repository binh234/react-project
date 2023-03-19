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
  caption: string
  content: string
  video: {
    asset: {
      _id: string
      url: string
    }
  }
  _id: string
  postedBy: IPostedBy
  likes: {
    postedBy: IPostedBy
  }[]
  comments: IComment[]
  userId: string
}

export interface IUser {
  _id: string
  _type: string
  userName: string
  image: string
}
