/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React from 'react';
import './styles.css';

const isActiveTarget = (target, targets) => target.place === targets.active.place;
const displayFloat = f => f ? f.toFixed(2) : '';
const humanizedProbability = n => {
  const f = parseFloat(n);

  return (f > 0 && f <= 25)
    ? 'low'
    : (f > 25 && f <= 50)
      ? 'medium'
      : (f > 50 && f <= 75)
        ? 'high'
        : (f > 75)
          ? 'very high'
          : (f <= 0)
            ? 'none'
            : '';
};

const Villain = ({ villain }) => (
  <aside className="Villain">
    <header className="Villain__header">
      <h2>{ villain.name } is around</h2>
      <small className="Villain__location">
        Currently at <br />
        lat: { displayFloat(villain.location.lat) }, lng: { displayFloat(villain.location.lng) }
      </small>
    </header>
    <div className="Targets">
      <h3 className="Targets__title">Probable targets</h3>
      <ul className="Targets__list">
        { villain.targets.list.map(t => (
          <li className={`Target${ isActiveTarget(t, villain.targets) ? ' Target--active' : '' }`}>
            <h4 className="Target__name">{ t.place }</h4>
            <small className="Target__probability">
              probability of attacking: { humanizedProbability(t.probability) } ({ displayFloat(t.probability) })
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
