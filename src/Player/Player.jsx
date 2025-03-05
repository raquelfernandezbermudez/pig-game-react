import React from 'react';
import "../App.css";

const Player = ({ name, score, current, isActive }) => {
  return (
    <section className={`player ${isActive ? 'player--active' : ''}`}>
      <h2 className="name" id={`name--${current}`}>{name}</h2>
      <p className="score" id={`score--${current}`}>{score}</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id={`current--${current}`}>{current}</p>
      </div>
    </section>
  );
};

export default Player;