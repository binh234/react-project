const post = `{
  _id,
  _createdAt,
   caption,
   content,
   topic,
   video{
      asset->{
        _id,
        url
      }
    },
  userId,
  postedBy->{
    _id,
    userName,
    image
  },
  likes,
  comments[]{
    comment,
    _key,
    postedBy->{
      _id,
      userName,
      image
    },
  }
}`

const postWithoutComments = `{
  _id,
  _createdAt,
  caption,
  topic,
   content,
     video{
      asset->{
        _id,
        url
      }
    },
    userId,
  postedBy->{
    _id,
    userName,
    image
  },
  likes,
  comments[]{
    _key,
  }
}`

export const allPostsQuery = (maxResults: number = 50, lastCreatedAt?: string, lastId?: string) => {
  let query = ''
  if (lastCreatedAt && lastId) {
    query = `*[_type == "post" && (
      createdAt > ${lastCreatedAt}
      || (createdAt == ${lastCreatedAt} && _id > ${lastId})
    )] | order(_createdAt desc)`
  } else {
    query = `*[_type == "post"] | order(_createdAt desc)`
  }

  return `${query}[0..${maxResults}]${postWithoutComments}`
}

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']${post}`
  return query
}

export const searchPostsQuery = (
  searchTerm: string | string[],
  maxResults: number = 50,
  lastCreatedAt?: string
) => {
  let query = ''
  if (lastCreatedAt) {
    query = `*[_type == "post" && (
      caption match "${searchTerm}" || topic match "${searchTerm}"
    ) && (
      _createdAt > ${lastCreatedAt}
    )]`
  } else {
    query = `*[_type == "post" && (
      caption match "${searchTerm}" || topic match "${searchTerm}"
    )]`
  }
  return `${query}[0..${maxResults}]${postWithoutComments}`
}

export const searchUsersQuery = (
  searchTerm: string | string[],
  maxResults: number = 50,
  lastId?: string
) => {
  let query = ''
  if (lastId) {
    query = `*[_type == "user" && _id > ${lastId} && userName match "${searchTerm}"]`
  } else {
    query = `*[_type == "user" && userName match "${searchTerm}"]`
  }
  return `${query} | order(_id)[0..${maxResults}]`
}

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`

  return query
}

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`

  return query
}

export const suggestedUsersQuery = (maxResults: number) => {
  const query = `*[_type == "user"][0..${maxResults}]`

  return query
}

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc)${postWithoutComments}`

  return query
}

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) ${postWithoutComments}`

  return query
}

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] ${postWithoutComments}`

  return query
}
