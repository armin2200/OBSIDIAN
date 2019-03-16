import React, { Component } from 'react';
import SymbolCheckBox from './SymbolCheckBox';
import './SymbolsBox.css';

class SymbolsBox extends Component {
  state = {
    options: [
      { name: 'FB', label: 'FB', value: true, color: '#877FEB' },
      { name: 'GOOG', label: 'GOOG', value: false, color: '#A5DCCA' },
      { name: 'TSLA', label: 'TSLA', value: false, color: '#C9C6F8' },
      { name: 'MSFT', label: 'MSFT', value: false, color: '#7B99B1' }
    ]
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    const { options } = this.state;
    const { SymbolsChange } = this.props;

    let updatedOptions = [...options];
    const index = updatedOptions.findIndex(el => el.name === name);
    updatedOptions[index].value = value;
    this.setState({
      options: updatedOptions
    });
    SymbolsChange(updatedOptions);
  };
  render() {
    const { options } = this.state;
    let CheckBoxes = options.map((option, i) => (
      <SymbolCheckBox
        key={option.name + i}
        name={option.name}
        label={option.label}
        checkValue={option.value}
        changed={this.handleInputChange}
        color={option.color}
      />
    ));
    return (
      <div>
        <h2>Symbols</h2>
        <div className='symbol__box'>{CheckBoxes}</div>
      </div>
    );
  }
}

export default SymbolsBox;
