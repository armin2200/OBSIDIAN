import React, { Component } from 'react';
import CheckBox from './CheckBox';
import './TimeSeries.css';

class TimeSeries extends Component {
  state = {
    options: [
      { name: 'low', label: 'low', value: false },
      { name: 'close', label: 'close', value: false },
      { name: 'high', label: 'high', value: false },
      { name: 'open', label: 'open', value: false },
      { name: 'volume', label: 'volume', value: false }
    ]
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    const { options } = this.state;
    const { SeriesChange } = this.props;

    let updatedOptions = [...options];
    const index = updatedOptions.findIndex(el => el.name === name);
    updatedOptions[index].value = value;
    this.setState({
      options: updatedOptions
    });
    SeriesChange(updatedOptions);
  };
  render() {
    const { options } = this.state;
    let CheckBoxes = options.map((option, i) => (
      <CheckBox
        key={option.name + i}
        name={option.name}
        label={option.label}
        checkValue={option.value}
        changed={this.handleInputChange}
      />
    ));
    return (
      <div>
        <h2>Time Series</h2>
        <div className='CheckBox__box'>{CheckBoxes}</div>
      </div>
    );
  }
}

export default TimeSeries;
