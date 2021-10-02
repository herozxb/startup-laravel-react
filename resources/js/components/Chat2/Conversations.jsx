import React, { useState, useEffect, useRef } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LanguageIcon from "@material-ui/icons/Language";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useGetConversations, useGetConversationsByPage } from "../Services/chatService";
import { authenticationService } from "../Services/authenticationService";
import commonUtilites from "../Utilities/common";
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import ChatBox from './ChatBox';
import Grid from "@material-ui/core/Grid";

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

    [theme.breakpoints.down('xs')]: {
      maxWidth: "270px",
    },

  },
  list: {
    maxHeight: "calc(100vh - 112px)",
    overflowY: "auto",
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

const Conversations = (props) => {
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(null);
  const getConversations = useGetConversations();
  const getConversationsByPage = useGetConversationsByPage();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show_button, setShow_Button] = useState(false);
  const [loading_video, setLoadingVideo] = useState(false);
  const [people_not_online, setPeopleNotOnLine] = useState(false);

  // Returns the recipient name that does not
  // belong to the current user.
  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if (
        recipients[i].username !==
        authenticationService.currentUserValue.username
      ) {
        //console.log("=============1==============")
        //console.log(recipients[i])
        return recipients[i];
      }
    }
    return null;
  };

  useEffect(() => {
    getConversationsByPage(0).then((res) => {console.log("==1==============");console.log(res); setConversations(res)});
  }, [newConversation]);



  useEffect(() => {
    let socket = socketIOClient("https://120.53.220.237:5002");
    console.log("==1===socket=====newConversation======");
    socket.on("messages", (data) => { setNewConversation(data);console.log("get Conversation from https server "); console.log(data);});

    return () => {
      socket.removeListener("messages");
    };
  }, []);

  const valueRef = useRef('') //creating a refernce for TextField Component

  const sendValue = () => {
      console.log(valueRef.current.value) //on clicking button accesing current value of TextField and outputing it to console 
      
      if(valueRef.current.value>0)
      {  
        getConversationsByPage(valueRef.current.value-1).then((res) => setConversations(res));
      }
  }



  return (
    <List className={classes.list}>
      <ListItem
        classes={{ root: classes.subheader }}
        onClick={() => {
          props.setScope("Global Chat");
        }}
      >
        <ListItemAvatar>
          <Avatar className={classes.globe}>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.subheaderText} primary="Global Chat" />
      </ListItem>
      <Divider />

      {conversations && (
        <React.Fragment>
          {conversations.map((c) => (
            <ListItem
              className={classes.listItem}
              key={c._id}
              button
              onClick={() => {
                props.setUser(handleRecipient(c.recipientObj));
                props.setScope(handleRecipient(c.recipientObj).username);
                handleShow();
              }}
            >
              <ListItemAvatar >
                <Avatar className={classes.globe} >
                  {commonUtilites.getInitialsFromName(
                    handleRecipient(c.recipientObj).username
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.subheaderText}
                primary={handleRecipient(c.recipientObj).username}
                secondary={<React.Fragment>{c.lastMessage}</React.Fragment>}
              />
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
        <Modal.Header closeButton>
          <Modal.Title>视频通话</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid item md={8}>
              <ChatBox scope={props.scope} user={props.user} me_id={props.me_props} chat_user_id={user_id} setIdToCall_props_2={props.setIdToCall_props}  stream_props_2={props.stream_props} callUser_props_2={props.callUser_props}/>
          </Grid>
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

export default Conversations;
