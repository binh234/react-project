import React from 'react'
import ContentLoader from 'react-content-loader'

const CommentFavorite = props => (
  <ContentLoader viewBox="0 0 1000 150"{...props}>
    <circle cx="48" cy="60" r="32" />
    <rect x="100" y="29.5" width="250" height="24" />
    <rect x="100" y="65" width="800" height="44" />
    <rect x="100" y="120" width="320" height="24" />
  </ContentLoader>
)
export default CommentFavorite