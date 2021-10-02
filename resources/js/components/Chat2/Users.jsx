import React, { useState, useEffect, useRef } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useGetUsers, useGetUsersByPage } from "../Services/userService";
import commonUtilites from "../Utilities/common";
import Modal from 'react-bootstrap/Modal'
import ChatBox from './ChatBox';

import {
  useGetGlobalMessages,
  useSendGlobalMessage,
  useGetConversationMessages,
  useSendConversationMessage,
} from "../Services/chatService";


const useStyles = makeStyles((theme) => ({
  subheader: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  globe: {
    backgroundColor: theme.palette.primary.dark,
  },
  subheaderText: {
    color: theme.palette.primary.dark,
  },
  list: {
    maxHeight: "calc(100vh - 112px)",
    overflowY: "auto",
  },
  avatar: {
    margin: theme.spacing(0, 3, 0, 1),
    colorDefault: {
      backgroundColor: `purple`
    }
  },
  input_text: {
    marginLeft: "20px", 
    marginTop : "5px"
  },
  button: {
    marginLeft: "20px", 
    color: theme.palette.primary.dark,
    marginTop : "5px"
  },

}));

const Users = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const getUsers = useGetUsers();
  const getUsersByPage = useGetUsersByPage();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show_button, setShow_Button] = useState(false);
  const [loading_video, setLoadingVideo] = useState(false);
  const [people_not_online, setPeopleNotOnLine] = useState(false);


  const [autoMessage, setAutoMessage] = useState(0);
  const [targetID, setTargetID] = useState("")
  const [targetVideoID, setTargetVideoID] = useState("")
  const [toID, setToID] = useState("")

  const sendConversationMessage = useSendConversationMessage();
  

  useEffect(() => {
    //getUsers().then((res) => setUsers(res));
    getUsersByPage(0).then((res) =>{console.log("==2==============");console.log(res); setUsers(res)});
  }, [newUser]);




  useEffect(() => {
    const socket = socketIOClient('https://120.53.220.237:5002');
    console.log("==3===socket===users========");
    socket.on("users", (data) => {
      setNewUser(data);
      console.log("get users from https server"); console.log(data);
    });
  }, []);

  const valueRef = useRef('') //creating a refernce for TextField Component

  const sendValue = () => {
      console.log(valueRef.current.value) //on clicking button accesing current value of TextField and outputing it to console 
      
      if(valueRef.current.value>0)
      {  
        getUsersByPage(valueRef.current.value-1).then((res) => setUsers(res));
      }
  }

    useEffect(() => {
    const socket = socketIOClient("https://120.53.220.237:5002");
    //console.log("==2===socket===Message========");
    socket.on("messages", (data) => {

      if(String(data).substr(0, 6).valueOf() == String("发起视频通话").valueOf())
      {

                console.log("AutoMessage");
                counter = counter + 1;

                console.log(String(data).substr(7,24));
                console.log(String(data).substr(33,42));
                setTargetID(String(data).substr(7,24));
                setToID(String(data).substr(33,42));
                setAutoMessage(counter);
                //console.log(counter);

      }

    });
  }, []);

  useEffect(() => {
      console.log("AutoMessage is working and the props is");
      console.log(props);
      console.log(String(targetID).valueOf());
      console.log(String(props.chat_user_id).valueOf());
      console.log(autoMessage);
      if(autoMessage>0 && (String(targetID).valueOf() != String(props.user_id).valueOf()) && (String(toID).valueOf() == String(props.user_id).valueOf()) )
      {
        //////////////////
        //debug for < bug
        console.log("Auto sending back video id");
        console.log(targetID);
        console.log(toID);
        console.log(props.user_id);
        console.log("我的电话号="+String(props.me_props) );
        sendConversationMessage(targetID, "我的电话号="+String(props.me_props)).then((res) => {
          setNewMessage("");
        });
      }
  }, [autoMessage]);


  return (
    <List className={classes.list}>
      {users && (
        <React.Fragment>
          {users.map((u) => (
            <ListItem
              className={classes.listItem}
              key={u._id}
              onClick={() => {
                props.setUser(u);
                props.setScope(u.username);
                handleShow();
              }}
              button
            >
              <ListItemAvatar className={classes.avatar}>
                <Avatar  >{commonUtilites.getInitialsFromName(u.username)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={u.username} />
            </ListItem>
          ))}

        </React.Fragment>
      )}
      <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
      >
        <Modal.Body>
              <ChatBox scope={props.scope} user={props.user} me_id={props.me_props} chat_user_id={props.user_id} setIdToCall_props_2={props.setIdToCall_props}  stream_props_2={props.stream_props} callUser_props_2={props.callUser_props}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="primary" onClick={() => {handleClose();}}>
            关闭
          </Button>
        </Modal.Footer>
      </Modal>
      <TextField
        className={classes.input_text}
        label="页数"
        id="outlined-size-small"
        defaultValue="1"
        variant="outlined"
        size="small"
        inputRef={valueRef}
      />
      <Button className={classes.button} variant="outlined" onClick={sendValue} >搜索</Button>
    </List>
  );
};

export default Users;
