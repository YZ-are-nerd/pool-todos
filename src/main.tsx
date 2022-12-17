import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <RecoilRoot>
      <RecoilNexus/>
      <App />
    </RecoilRoot>
  </BrowserRouter>
)
