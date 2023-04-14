import Canvas from "./canvas"
import { Customizer, Home } from "./pages"

function App() {

  return (
    <main className="aapp transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default App
