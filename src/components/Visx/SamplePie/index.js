// type BrowserUsage = {
//   browser: string;
//   usage: number;
// }

import { Group } from '@visx/group'
import { Pie } from '@visx/shape'
import { scaleOrdinal } from '@visx/scale'

// export type PieChartProps = {
//   width: number;
//   height: number;
//   events?: boolean;
//   data: BrowserUsage[];
//   margin?: { top: number; right: number; bottom: number; left: number };
// };

const dataVis = [
  { browser: 'Chrome', usage: 48 },
  { browser: 'Internet Explorer', usage: 18 },
  { browser: 'Firefox', usage: 34 },
  { browser: 'Edge', usage: 21 },
  { browser: 'Safari', usage: 23 }
]

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 }
const getUsage = (d) => d.usage

const getBrowserColor = scaleOrdinal({
  domain: dataVis.map((l) => l.browser),
  range: [
    'rgba(93,30,91,1)',
    'rgba(93,30,91,0.8)',
    'rgba(93,30,91,0.6)',
    'rgba(93,30,91,0.4)'
  ]
})

export default function PieChart({
  width,
  height,
  data,
  events = false,
  margin = defaultMargin
}) {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const top = centerY + margin.top
  const left = centerX + margin.left

  const radius = Math.min(innerWidth, innerHeight) / 2

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie
          data={dataVis}
          pieValue={getUsage}
          outerRadius={radius}
          padAngle={0.01}
        >
          {(pie) => {
            return pie.arcs.map((arc, index) => {
              const { browser } = arc.data
              const arcPath = pie.path(arc)
              const arcFill = getBrowserColor(browser)

              const [centroidX, centroidY] = pie.path.centroid(arc)
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

              return (
                <g key={`arc-${browser}-${index}`}>
                  <path d={arcPath} fill={arcFill} />
                  {hasSpaceForLabel && (
                    <text
                      x={centroidX}
                      y={centroidY}
                      width={50}
                      dy=".11em"
                      fill="#FFF"
                      fontSize={16}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {arc.data.browser} {arc.data.usage}%
                    </text>
                  )}
                </g>
              )
            })
          }}
        </Pie>
      </Group>
    </svg>
  )
}
