import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Task from './components/Task'

function App() {
  return (
    <>
      <section className="section-page">
        <div className="section-content">
          <Header />
          <Task />
        </div>
        <Footer />
      </section>
    </>
  )
}

export default App
