import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo2 } from './assets'
import { CreatePost, Home } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo2} alt="logo" className="h-12 object-contain" />
          <p className="hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 font-bold text-2xl">
            Imagine
          </p>
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] hover:bg-[#555ae9] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:px-10 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
