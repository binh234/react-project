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
  postedBy->{
    _id,
    userName,
    image
  },
  likes
}`

const comment = `{
  _id,
  _createdAt,
  comment,
  postedBy->{
    _id,
    userName,
    image
  },
  post
}

`

export const allPostsQuery = (maxResults: number = 50, lastCreatedAt?: string) => {
  let query = ''
  if (lastCreatedAt) {
    query = `*[_type == "post" && _createdAt < '${lastCreatedAt}']`
  } else {
    query = `*[_type == "post"]`
  }

  return `${query} | order(_createdAt desc)[0..${maxResults}]${post}`
}

export const postDetailQuery = (postId: string | string[], userId?: string | string[]) => {
  if (userId) {
    return `*[_type == "post" && _id == '${postId}' && postedBy._ref == '${userId}']${post}`
  }
  return `*[_type == "post" && _id == '${postId}']${post}`
}

export const postCommentsQuery = (
  postId: string | string[],
  maxResults: number = 30,
  lastCreatedAt?: string
) => {
  let query = ''
  if (lastCreatedAt) {
    query = `*[_type == "comment" && post._ref == '${postId}' && _createdAt < '${lastCreatedAt}']`
  } else {
    query = `*[_type == "comment" && post._ref == '${postId}']`
  }

  return `${query} | order(_createdAt desc) [0..${maxResults}]${comment}`
}

export const postCommentSubscriptionQuery = (postId: string | string[], lastCreatedAt: string) => {
  let query = `*[_type == "comment" && post._ref == '${postId}' && _createdAt > '${lastCreatedAt}']`

  return `${query}`
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
      _createdAt < '${lastCreatedAt}'
    )]`
  } else {
    query = `*[_type == "post" && (
      caption match "${searchTerm}" || topic match "${searchTerm}"
    )]`
  }
  return `${query} | order(_createdAt desc) [0..${maxResults}]${post}`
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

export const findUserWithEmailQuery = (email: string) => {
  const query = `*[_type == "user" && email == "${email}"][0]`

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
  const query = `*[ _type == 'post' && postedBy._ref == ${userId} | order(_createdAt desc)${post}`

  return query
}

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) ${post}`

  return query
}

export const topicPostsQuery = (
  topic: string | string[],
  maxResults: number = 50,
  lastCreatedAt?: string
) => {
  let query = ''
  if (lastCreatedAt) {
    query = `*[_type == "post" && topic match '${topic}*' && _createdAt < '${lastCreatedAt}']`
  } else {
    query = `*[_type == "post" && topic match '${topic}*']`
  }

  return `${query} | order(_createdAt desc) [0..${maxResults}]${post}`
}
