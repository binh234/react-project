import React from 'react'
import ContentLoader from 'react-content-loader'

const CommentFavorite = (props: any) => (
  <ContentLoader viewBox="0 0 500 130" {...props}>
    <circle cx="48" cy="60" r="32" />
    <rect x="100" y="30" width="150" height="24" />
    <rect x="100" y="64" width="240" height="32" />
    <rect x="100" y="106" width="50" height="20" />
    <rect x="160" y="106" width="50" height="20" />
    <rect x="220" y="106" width="50" height="20" />
  </ContentLoader>
)
export default CommentFavorite
