import React from 'react';
import instruments from './instruments';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        instruments: [],
        openOnly: false,
        currTime: new Date(),
    };
  };

  componentDidMount() {
      this.setState({
          instruments: JSON.parse(JSON.stringify(instruments)),
      });
      this.timer = setInterval( () => {
          this.setState({
          currTime: new Date(),
        });
      }, 1000);
  }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

  render() {
      const cN = "store_table";
      return (
        <div className="App">
            <input
                type='checkbox'
                id="open_only"
                onChange={this.handleCheckboxChange}
            />
            <label htmlFor='open_only'>Open only</label>
            <div className={cN}>
                <table>
                    <caption>Instruments</caption>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>OPEN?</th>
                    </tr>
                    {this.state.instruments.map(item => {
                        const isOpen = item.tradingHours.some(
                            interval => this.inRange(+this.state.currTime, interval.from, interval.to)
                        );
                        return (
                            (!this.state.openOnly || this.state.openOnly === isOpen) ?
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.instrumentID}</td>
                                    <td>{isOpen ? 'open' : 'close'}</td>
                                </tr> :
                                null
                        )
                    })}
                </table>
            </div>
        </div>
    );
  }

  inRange = (x , min, max) => {
      return x >= min && x <= max;
  };

  handleCheckboxChange = () => {
      this.setState(prevState => ({
          openOnly: !prevState.openOnly,
      }));
  };
}

export default App;
