interface IPostedBy {
  _id: string
  userName: string
  image: string
}

export interface IComment {
  comment: string
  _id: string
  postedBy: IPostedBy
  _createdAt: string
}
export interface Video {
  _id: string
  _createdAt: string
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
    _ref: string
  }[]
  comments: IComment[]
}

export interface IUser {
  _id: string
  _createdAt: string
  userName: string
  image: string
}
export interface ISessionUser {
  _id: string
  name: string
  email: string
  image: string
}
