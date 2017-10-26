/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React from 'react';
import './styles.css';
import displayFloat from '../../utils/displayFloat';
import humanizeProbability from '../../utils/humanizeProbability';

const isActiveTarget = (target, targets) => target.place === targets.active.place;

const Villain = ({ villain }) => (
  <aside className="Villain">
    <header className="Villain__header">
      <h2>{ villain.name } is around</h2>
    </header>
    <div className="Targets">
      <h3 className="Targets__title">Probable targets</h3>
      <ul className="Targets__list">
        { villain.targets.list.map((t, i) => (
          <li className={`Target${ isActiveTarget(t, villain.targets) ? ' Target--active' : '' }`} key={i}>
            <h4 className="Target__name">{ t.place }</h4>
            <small className="Target__probability">
              probability of attacking: { humanizeProbability(t.probability) } ({ displayFloat(t.probability) })
            </small>
            <br />
            <small className="Target__location">
              lat: { displayFloat(t.location.lat) }, lng: { displayFloat(t.location.lng) }
            </small>
          </li>
        )) }
      </ul>
    </div>
  </aside>
);

export default Villain;
