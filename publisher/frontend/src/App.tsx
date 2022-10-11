import AppStyle from "./assets/css/app.module.css"
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dashboard from "./pages"

function App() {
  return <div className={AppStyle["app"]}><Dashboard /></div>
}

export default App
