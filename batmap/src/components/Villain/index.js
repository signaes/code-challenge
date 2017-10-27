/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React from 'react';
import './styles.css';
import displayFloat from '../../utils/displayFloat';
import humanizeProbability from '../../utils/humanizeProbability';

const isActiveTarget = (target, targets) => target.place === targets.active.place;

class Villain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialHeight: '436px',
      height: '436px',
      visible: true
    };

    this.toggleHeight = this.toggleHeight.bind(this);
  }

  toggleHeight() {
    this.setState({
      height: this.state.visible ? '80px' : this.state.initialHeight,
      visible: !this.state.visible
    });
  }

  render() {
    const { villain, selectTarget } = this.props;

    return (
      <aside className="Villain" data-visible={this.state.visible} style={{ height: this.state.height }}>
        <header className="Villain__header" onClick={this.toggleHeight}>
          <h2>{ villain.name } is around</h2>
        </header>
        <div className="Targets">
          <h3 className="Targets__title">Possible targets</h3>
          <ul className="Targets__list">
            { villain.targets.list.map((t, i) => (
              <li
                className={`Target${ isActiveTarget(t, villain.targets) ? ' Target--active' : '' }`}
                onClick={() => selectTarget({ target: t })}
                key={i}>
                <h4 className="Target__name">{ t.place }</h4>
                <small className="Target__probability">
                  { humanizeProbability(t.probability) } probability ({ displayFloat(t.probability) })
                </small>
                <br />
                <small className="Target__location">
                  { displayFloat(t.location.lat) }, { displayFloat(t.location.lng) }
                </small>
                <div className="Chart">
                  <div
                    className="Bar"
                    data-probability={humanizeProbability(t.probability)}
                    style={{width: `${parseInt(t.probability, 10)}%`}} />
                </div>
              </li>
            )) }
          </ul>
        </div>
      </aside>
    );
  }
}

export default Villain;
