import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar_chat">
    <div className="leftInnerContainer_chat">
      <img className="onlineIcon_chat" src={onlineIcon} alt="online icon" />
    </div>
    <div className="rightInnerContainer_chat">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;