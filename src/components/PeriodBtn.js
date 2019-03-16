import React, { Component } from 'react';
import './PeriodBtn.css';
const periodList = [
  { name: '1M', value: 30 },
  { name: '3M', value: 90 },
  { name: '6M', value: 180 },
  { name: 'YTD', value: 'YTD' },
  { name: '1Y', value: 360 },
  { name: '2Y', value: 720 },
  { name: 'Max', value: 4000 }
];

class PeriodBtn extends Component {
  render() {
    const { periodChange, period } = this.props;
    let items = periodList.map((item, i) => (
      <button
        className='btn btn-switcher'
        key={item.name + i}
        onClick={() => periodChange(item.value)}
      >
        {item.name}
      </button>
    ));

    return (
      <div>
        <h2>Period</h2>
        <div>{items}</div>
      </div>
    );
  }
}

export default PeriodBtn;
