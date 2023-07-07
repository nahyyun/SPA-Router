import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import Router from "./router/router";
import Route from "./router/route";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" component={<MainPage />} />
      <Route path="/about" component={<AboutPage />} />
    </Router>
  );
}

export default App;
