import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  area,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
});

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ arg }) => arg)
      .y1(({ val }) => val)
      .y0(({ startVal }) => startVal)
      .curve(curveCatmullRom)}
  />
);


class WeatherChart extends React.PureComponent {
  render() {
    const { classes,data } = this.props;
    return (
      <Paper>
        <Chart
          data={data.hourly}
          className={classes.chart}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          {/* <ValueAxis /> */}

          <AreaSeries
            name="Weather Report"
            valueField="temp"
            argumentField="dt"
            seriesComponent={Area}
          />

          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        </Chart>
        <div className="row mr-5">
                    <div  className="col-6  bg-primary">
                        <h4 className="">Pressure</h4>
                        <p className=""><b>{Math.floor(data.current.pressure)}</b></p>
                    </div>
                    <div className="col-6 bg-primary">
                        <h4 className="">Humidity</h4>
                        <p><b>{Math.floor(data.current.humidity)}%</b></p>
                    </div>
                </div>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'Demo' })(WeatherChart);
