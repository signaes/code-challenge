const humanizeProbability = n => {
  const f = parseFloat(n);

  return (f > 0 && f <= 25) ? 'low' : (f > 25 && f <= 50) ? 'medium'
    : (f > 50 && f <= 75) ? 'high' : (f > 75) ? 'very high' : (f <= 0) ? 'none' : '';
};

export default humanizeProbability;
