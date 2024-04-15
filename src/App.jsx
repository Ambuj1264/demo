import React from 'react';
import ButtonGame from './components/MatchButtons';

const App= () => {
  const data = { Germany: "Berlin", India: "Delhi" };

  return (
    <div>
      <h1>Match the Country with its Capital</h1>
      <ButtonGame data={data} />
    </div>
  );
};

export default App;
