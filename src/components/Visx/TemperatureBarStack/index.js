import React from "react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import Chart from "./Chart";


const TemperatureBarStack = (props) => {
  return (
    <ParentSize>
      {({ width, height }) => <Chart width={1024} height={1024} />}
    </ParentSize>
  )
}

export default TemperatureBarStack

