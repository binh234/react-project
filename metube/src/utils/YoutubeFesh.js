
import React from 'react'
import ContentLoader from 'react-content-loader'

const YoutubeFresh = (props) => (
  <ContentLoader viewBox="0 0 500 420" {...props}>
    <rect x="16" y="17" rx="0" ry="0" width="500" height="260" />
    <circle cx="35" cy="308" r="20" />
    <rect x="69" y="289" rx="2" ry="2" width="300" height="17" />
    <rect x="69" y="313" rx="2" ry="2" width="150" height="17" />
  </ContentLoader>
)

export default YoutubeFresh