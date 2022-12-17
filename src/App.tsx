import { Route, Routes } from "react-router-dom"
import HomePage from './pages/home.page';

const App = () => {

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col gap-2 overflow-hidden bg-black">
      <div className="w-full h-full flex">
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
