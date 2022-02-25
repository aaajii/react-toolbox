import logo from './logo.svg'
import './App.css'
import SampleChart from '../components/SampleChart'
import PieChart from '../components/Visx/PieChart'
import TemperatureBarStack from '../components/Visx/TemperatureBarStack'
import SamplePie from '../components/Visx/SamplePie'
import Card from '../components/Card'
// import { TVChartContainer } from '../components/TVChart'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>(Keeping this logo because it deffo looks cool)</p>
      </header>

      <hr />
      {/* 
      <h1> Sample Chart from Kaktana</h1>
      <SampleChart />

      <h1> Some Pie Chart thingy (hahahaaha it's growing) </h1>
      <PieChart />

      <h1> Some Bar Chart thingy </h1>
      <TemperatureBarStack />

      <h1> Simple Pie Chart</h1>
      <SamplePie width={600} height={600}/>

      <Card />
    */}
    </div>
  )
}

export default App
