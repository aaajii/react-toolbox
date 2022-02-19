import logo from './logo.svg'
import './App.css'
import SampleChart from '../components/SampleChart'
// import { TVChartContainer } from '../components/TVChart'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>(Keeping this logo because it deffo looks cool)</p>
      </header>

      <hr />

      <h1> Sample Chart from Kaktana</h1>
      <SampleChart />

      {/* <h1> TVChart that i've stolen online hehe</h1>
      <TVChartContainer token={''} /> */}
    </div>
  )
}

export default App
