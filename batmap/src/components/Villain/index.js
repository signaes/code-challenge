/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React from 'react';
import './styles.css';
import displayFloat from '../../utils/displayFloat';
import humanizeProbability from '../../utils/humanizeProbability';

const isActiveTarget = (target, targets) => target.place === targets.active.place;

const Villain = ({ villain, selectTarget }) => (
  <aside className="Villain">
    <header className="Villain__header">
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

export default Villain;
