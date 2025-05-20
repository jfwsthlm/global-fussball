import React from 'react';

const SeasonSelector = ({ seasonId, setSeason }) => {
    console.log("In SeasonSelector: " + seasonId)
    
    let season = "Allsvenskan 2024"
    if (seasonId === 2) {
        season = "Allsvenskan 2025"
    }
    if (seasonId === 1) {
        season = "Allsvenskan 2024"
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    const handleMenuOne = () => {
        setSeason(1);
        setOpen(false);
      };
    
      const handleMenuTwo = () => {
        setSeason(2);
        setOpen(false);
      };

      return (
        <div className="center dropdown">
        <button className="center dropdownButton" onClick={handleOpen}>{season}</button>
        {open ? (
          <ul className="center menu">
            <li className="center menu-item">
              <button onClick={handleMenuOne}>Allsvenskan 2024</button>
            </li>
            <li className="center menu-item">
              <button onClick={handleMenuTwo}>Allsvenskan 2025</button>
            </li>
          </ul>
        ) : null}
      </div>
    );
}



export default SeasonSelector;