import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
//import 'font-awesome/css/font-awesome.min.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import 'font-awesome/less/font-awesome.less'
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import Notifications from './Notifications';

import { ContextProvider } from '../Context';


const ENDPOINT = 'http://120.53.220.237:2001';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('logout', { name, room }, (error) => {console.log("=======0.1======");});
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
        console.log("======1.0=======");
        socket.emit('disconnect', {text:"send after same logger"});
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    console.log("====3======");
    console.log(messages);
    socket.on('message', message => {
      console.log("=====4=====");
      console.log(message);
      console.log([ ...messages, message ]);     
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

	const ratingChanged = (newRating) => {
	  console.log(newRating);
	};

  return (
<ContextProvider>
    <div className="outerContainer">
      <FontAwesomeIcon icon={faCoffee} />
      <VideoPlayer />
	 <ReactStars
	    count={5}
	    onChange={ratingChanged}
	    size={24}
	    isHalf={true}
	    emptyIcon={<i className="far fa-star"></i>}
	    halfIcon={<i className="fa fa-star-half-alt"></i>}
	    fullIcon={<i className="fa fa-star"></i>}
	    activeColor="#ffd700"
	  />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  </ContextProvider>
  );
}

export default Chat;
