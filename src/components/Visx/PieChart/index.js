import ParentSize from '@visx/responsive/lib/components/ParentSize'
import Example from './Chart'

const PieChart = (props) => {
  return (
    <ParentSize>
      {({ width, height }) => <Example width={1024} height={1024} />}
    </ParentSize>
  )
}

export default PieChart
