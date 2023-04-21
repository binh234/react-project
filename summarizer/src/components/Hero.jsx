import { logo, githubMark } from '../assets'

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col mb-8 pt-3">
      <nav className="flex justify-between items-center flex-row w-full">
        <img src={logo} alt="logo" className="w-24 object-contain" />
        <a href="https://github.com/binh234">
          <img src={githubMark} alt="github" className="w-7 object-contain" />
        </a>
      </nav>
      <h1 className="head_text">
        Sumarize articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer that transforms
        lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero
