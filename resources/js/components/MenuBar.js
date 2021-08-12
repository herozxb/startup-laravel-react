import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import io from "socket.io-client";

const ENDPOINT = 'http://192.168.1.101:2001';

let socket = io(ENDPOINT);

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (name) => {

  setActiveItem(name);
  
  };

  const chat_link = user ? ("/chat?name="+user.username+"&room=room"):("/chat?name=default&room=room");
  const menuBar = user ? (
    <Menu pointing size="massive" color="blue">

        <Menu.Item
          name={user.username}
          active={activeItem === 'home'}
          onClick={() => handleItemClick("home")}
          as={Link}
          to="/"
        />



      <Menu.Menu position="right">
        <Menu.Item
          name="聊天"
          active={activeItem === 'chat'}
          onClick={() => handleItemClick("chat")}
          as={Link}
          to={chat_link}
        />
        <Menu.Item
          name="个人"
          active={activeItem === 'profile'}
          onClick={() => handleItemClick("profile")}
          as={Link}
          to="/profile"
        />
        <Menu.Item name="登出" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing size="massive" color="blue">
      <Menu.Item
        name="主页"
        active={activeItem === 'home'}
        onClick={() => handleItemClick("home")}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="登入"
          active={activeItem === 'login'}
          onClick={() => handleItemClick("login")}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="注册"
          active={activeItem === 'register'}
          onClick={() => handleItemClick("register")}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
