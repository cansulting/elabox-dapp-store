import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
// import reportWebVitals from './reportWebVitals';
// exports
export * from "./constants";
export * from "./controllers/v2";
export * from "./data";
window.Buffer = window.Buffer || require("buffer").Buffer;
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
//<React.StrictMode>
_jsx(App, {})
//</React.StrictMode>
);
