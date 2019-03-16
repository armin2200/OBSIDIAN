import React, { Component } from 'react';
import './StockBox.css';
import PeriodBtn from './PeriodBtn';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  LineMarkSeries,
  VerticalRectSeries,
  VerticalBarSeries,
  Hint
} from 'react-vis';
import TimeSeries from './TimeSeries';
import { LAST_DATE } from '../constant';
import SymbolsBox from './SymbolsBox';

const ALL_SERIESES = gql`
  query ALL_SERIESES($date: DateTime, $symbol: String) {
    serieses(where: { date_gt: $date, symbol: { symbol: $symbol } }) {
      date
      open
      high
      low
      close
      volume
    }
  }
`;

function daysOfTheYear() {
  // let now = new Date();

  let start = new Date(LAST_DATE.getFullYear(), 0, 0);
  let diff = LAST_DATE - start;
  let oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

class StockBox extends Component {
  state = {
    data: [],
    hoveredCell: null,
    series: [],
    symbols: ['FB'],
    period: new Date('2010-04-17T00:00:00.000Z')
  };
  handleSeriesChange = values => {
    let series = values.reduce((acc, next) => {
      if (next.value) acc.push(next.name);
      return acc;
    }, []);
    this.setState({ series });
  };
  handleSymbolsChange = values => {
    let symbols = values.reduce((acc, next) => {
      if (next.value) acc.push(next.name);
      return acc;
    }, []);
    this.setState({ symbols });
  };
  handlePeriodChange = days => {
    if (days === 'YTD') days = daysOfTheYear();
    let date = new Date(LAST_DATE.getTime() - days * 24 * 60 * 60 * 1000);
    this.setState({ period: new Date(date) });
  };
  render() {
    const { hoveredCell, period, symbols } = this.state;
    return (
      <Query
        query={ALL_SERIESES}
        variables={{ date: period, symbol: symbols[0] }}
      >
        {({ loading, error, data }) => {
          // if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          let serieses = !loading
            ? data.serieses.map(el => {
                return {
                  x: new Date(el.date).getTime(),
                  y: el.close
                };
              })
            : [];
          const { min, max } = !loading
            ? data.serieses.reduce(
                (acc, row) => ({
                  min: Math.min(acc.min, row.close),
                  max: Math.max(acc.max, row.close)
                }),
                { min: Infinity, max: -Infinity }
              )
            : { min: Infinity, max: -Infinity };
          return (
            <div className='container'>
              <div className='toolbar'>
                <PeriodBtn periodChange={this.handlePeriodChange} />
                <SymbolsBox SymbolsChange={this.handleSymbolsChange} />
                <TimeSeries SeriesChange={this.handleSeriesChange} />
              </div>

              <XYPlot
                xType='time'
                width={1000}
                height={300}
                yDomain={[min, max]}
              >
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title='X Axis' />
                <YAxis title='Y Axis' />
                <LineSeries data={serieses} />
                <VerticalBarSeries data={serieses} style={{ stroke: '#fff' }} />

                {/* {hoveredCell && (
                  <Hint value={hoveredCell}>
                    <p>{hoveredCell.close}</p>
                  </Hint>
                )} */}
              </XYPlot>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default StockBox;
