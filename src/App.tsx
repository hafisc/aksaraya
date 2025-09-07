import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Home } from './pages/Home'
import { Learn } from './pages/Learn'
import { ScriptDetail } from './pages/ScriptDetail'
import { Practice } from './pages/Practice'
import { Quiz } from './pages/Quiz'
import { Atlas } from './pages/Atlas'
import { Stories } from './pages/Stories'
import { Credits } from './pages/Credits'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/:scriptId" element={<ScriptDetail />} />
          <Route path="practice" element={<Practice />} />
          <Route path="practice/:scriptId" element={<Practice />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quiz/:scriptId" element={<Quiz />} />
          <Route path="atlas" element={<Atlas />} />
          <Route path="stories" element={<Stories />} />
          <Route path="credits" element={<Credits />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
