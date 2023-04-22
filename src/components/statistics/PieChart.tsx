import { VictoryPie, VictoryTheme } from 'victory'

const graphSettings = {
  innerRadius: 70,
  theme: VictoryTheme.material,
  style: {
    labels: {
      fontFamily: "Montserrat",
      fill: "black"
    }
  },
  radius: 45,
  padAngle: 2
}

const colors = ["#C22B33", "#F88D42", "#7DCEA4", "#265765", "#30ABCD", "#BFB9A5", "#F6C188"]

export default function PieChart(data: any) {
  return (
    <svg viewBox="-10 0 300 200">
      <VictoryPie
        innerRadius={graphSettings.innerRadius}
        radius={graphSettings.radius}
        style={graphSettings.style}
        data={data.data}
        theme={graphSettings.theme}
        padAngle={graphSettings.padAngle}
        standalone={false}
        origin={{ x: 150, y: 100 }}
        labelRadius={80}
        colorScale={colors}
      />
      <VictoryPie
        innerRadius={graphSettings.innerRadius}
        radius={graphSettings.radius}
        style={graphSettings.style}
        data={data.data}
        theme={graphSettings.theme}
        padAngle={graphSettings.padAngle}
        labels={({ datum }) => `${datum.y}`}
        standalone={false}
        origin={{ x: 150, y: 100 }}
        labelRadius={52}
        colorScale={colors}
      />
    </svg>
  )
}
