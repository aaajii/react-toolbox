import React, { useState } from 'react'
import Pie from '@visx/shape/lib/shapes/Pie'
import { scaleOrdinal } from '@visx/scale'
import { Group } from '@visx/group'
import { GradientPinkBlue } from '@visx/gradient'
import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency'
import browserUsage from '@visx/mock-data/lib/mocks/browserUsage'
import { animated, useTransition, interpolate } from 'react-spring'

const letters = letterFrequency.slice(0, 4)
const browserNames = Object.keys(browserUsage[0]).filter((k) => k !== 'date')
const browsers = browserNames.map((name) => ({
  label: name,
  usage: Number(browserUsage[0][name]),
}))

// accessor functions
const usage = (d) => d.usage
const frequency = (d) => d.frequency

// color scales
const getBrowserColor = scaleOrdinal({
  domain: browserNames,
  range: [
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.1)',
  ],
})
const getLetterFrequencyColor = scaleOrdinal({
  domain: letters.map((l) => l.letter),
  range: [
    'rgba(93,30,91,1)',
    'rgba(93,30,91,0.8)',
    'rgba(93,30,91,0.6)',
    'rgba(93,30,91,0.4)',
  ],
})

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 }

export default function Example({
  width,
  height,
  margin = defaultMargin,
  animate = true,
}) {
  const [selectedBrowser, setSelectedBrowser] = useState(null)
  const [selectedAlphabetLetter, setSelectedAlphabetLetter] = useState(null)

  if (width < 10) return null

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const donutThickness = 50

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="visx-pie-gradient" />
      <rect
        rx={14}
        width={width}
        height={height}
        fill="url('#visx-pie-gradient')"
      />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={
            selectedAlphabetLetter
              ? letters.filter(
                  ({ letter }) => letter === selectedAlphabetLetter
                )
              : letters
          }
          pieValue={frequency}
          pieSortValues={() => -1}
          outerRadius={radius - donutThickness * 1.3}
        >
          {(pie) => (
            <AnimatedPie
              {...pie}
              animate={animate}
              getKey={({ data: { letter } }) => letter}
              onClickDatum={({ data: { letter } }) =>
                animate &&
                setSelectedAlphabetLetter(
                  selectedAlphabetLetter && selectedAlphabetLetter === letter
                    ? null
                    : letter
                )
              }
              getColor={({ data: { letter } }) =>
                getLetterFrequencyColor(letter)
              }
            />
          )}
        </Pie>
      </Group>
      {animate && (
        <text
          textAnchor="end"
          x={width - 16}
          y={height - 16}
          fill="white"
          fontSize={11}
          fontWeight={300}
          pointerEvents="none"
        >
          Click segments to update
        </text>
      )}
    </svg>
  )
}

const fromLeaveTransition = ({ endAngle }) => ({
  // enter from 360?? if end angle is > 180??
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
})
const enterUpdateTransition = ({ startAngle, endAngle }) => ({
  startAngle,
  endAngle,
  opacity: 1,
})

const AnimatedPie = ({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}) => {
  const transitions = useTransition(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  })
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc)
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={interpolate(
            [props.startAngle, props.endAngle],
            (startAngle, endAngle) =>
              path({
                ...arc,
                startAngle,
                endAngle,
              })
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={9}
              textAnchor="middle"
              pointerEvents="none"
            >
              {getKey(arc)}
            </text>
          </animated.g>
        )}
      </g>
    )
  })
}
