import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Stores from "./pages/Stores"
import AppStyles from "./assets/css/app.module.css"
function App(): JSX.Element {
  return (
    <div className={AppStyles["App"]}>
      <header className={AppStyles["App-header"]}></header>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stores" element={<Stores />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
