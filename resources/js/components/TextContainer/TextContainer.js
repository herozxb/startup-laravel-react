import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer_chat ">
    {
      users
        ? (
          <div>
            <div className="activeContainer_chat ">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem_chat ">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;