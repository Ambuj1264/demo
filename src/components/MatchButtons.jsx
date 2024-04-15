import React, { useState, useEffect } from 'react';

const ButtonGame = ({ data }) => {
  const [buttons, setButtons] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [congratulations, setCongratulations] = useState(false);

  useEffect(() => {
    const createButtons = () => {
      const btns = [];
      for (const [country, capital] of Object.entries(data)) {
        btns.push({ label: country, value: capital, color: '', display: 'inline-block' });
        btns.push({ label: capital, value: country, color: '', display: 'inline-block' });
      }
      shuffle(btns);
      setButtons(btns);
    };

    createButtons();
  }, [data]);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleClick = (button) => {
    if (button.color === 'blue' || button.display === 'none') {
      return; // If button is already blue or disappeared, no need to change its state
    }

    const newButtons = buttons.map(btn =>
      btn.label === button.label ? { ...btn, color: 'blue' } : btn
    );

    if (selected.length === 0) {
      setSelected([button]);
      setButtons(newButtons);
    } else if (selected.length === 1) {
      const firstSelected = selected[0];
      if (
        (firstSelected.label === button.label && firstSelected.value === button.value) ||
        (firstSelected.label === button.value && firstSelected.value === button.label)
      ) {
        setMatched([...matched, firstSelected, button]);
        setSelected([]);
        setButtons(newButtons.map(btn =>
          btn.label === firstSelected.label || btn.label === firstSelected.value ? { ...btn, color: 'green', display: 'none' } : btn
        ));
        if (matched.length + 2 === buttons.length) {
          setCongratulations(true);
        }
      } else {
        setSelected([]);
        setButtons(newButtons.map(btn =>
          btn.label === firstSelected.label || btn.label === firstSelected.value ? { ...btn, color: 'red' } : btn
        ));
        setTimeout(() => {
          const resetButtons = buttons.map(btn =>
            btn.color === 'blue' ? { ...btn, color: '' } : btn
          );
          setButtons(resetButtons);
        }, 1000);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
      {buttons.map((button, index) => (
        button.display !== 'none' && (
          <button
            key={index}
            onClick={() => handleClick(button)}
            style={{ backgroundColor: button.color, color: button.color === 'blue' ? 'white' : 'black', display: button.display, padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {button.label}
          </button>
        )
      ))}
      {congratulations && <p>Congratulations! You've matched all the buttons!</p>}
    </div>
  );
};

export default ButtonGame;
