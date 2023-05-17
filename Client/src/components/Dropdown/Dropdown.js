import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Dropdown.scss';

function Dropdown({ items, locationsInfo, type, handleCloseMenus }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        // className="dropdown-menu"
      >
        {items.map((item) => {
          return (
            <li key={item} onClick={handleCloseMenus}>
              <Link
                className="dropdown-link"
                to={`/${type}/${item}`}
                onClick={() => setClick(false)}
              >
                {locationsInfo[item].name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
