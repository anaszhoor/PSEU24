import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Quiz from "./components/Quiz/Quiz"
import './App.css';

function App() {

  return (
    <>
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Quiz />
      </div>
      <Footer />
    </div>
    </>
  )
}

export default App
