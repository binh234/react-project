import { configureStore } from '@reduxjs/toolkit'
import subtitlesPlayerReducer from './features/SubtitlesPlayer/subtitlesPlayerSlice';
import videoPlayerReducer from './features/VideoPlayer/videoPlayerSlice'

export default configureStore({
    reducer: {
        player: videoPlayerReducer,
        subtitles: subtitlesPlayerReducer
    },
  })