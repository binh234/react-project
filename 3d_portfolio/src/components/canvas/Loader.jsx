import { Html, useProgress } from '@react-three/drei'

const CanvasLoader = () => {
  const { progress } = useProgress()

  return (
    <Html>
      <span className="canvas-load"></span>
      <p className="text-sm color-[#f1f1f1] mt-8">{progress.toFixed(2)}%</p>
    </Html>
  )
}

export default CanvasLoader
