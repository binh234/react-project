
import React from 'react'
import ContentLoader from 'react-content-loader'

const YoutubeFresh = (props) => (
  <ContentLoader viewBox="0 0 500 360" {...props}>
    <rect x="16" y="17" rx="0" ry="0" width="500" height="260" />
    <circle cx="40" cy="312" r="28" />
    <rect x="75" y="292" rx="2" ry="2" width="300" height="20" />
    <rect x="75" y="320" rx="2" ry="2" width="150" height="20" />
  </ContentLoader>
)

export default YoutubeFresh