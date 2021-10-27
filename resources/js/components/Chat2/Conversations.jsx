import React, { useState, useEffect, useRef } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LanguageIcon from "@material-ui/icons/Language";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

import Modal from 'react-bootstrap/Modal'

import { useGetConversations, useGetConversationsByPage } from "../Services/chatService";
import { authenticationService } from "../Services/authenticationService";
import commonUtilites from "../Utilities/common";
import ChatBox from './ChatBox';
import {
  useGetGlobalMessages,
  useSendGlobalMessage,
  useGetConversationMessages,
  useSendConversationMessage,
} from "../Services/chatService";

import Socket from "./Socket";
import socketIOClient from "socket.io-client";



const RADIUS_DOT = 1.5;
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

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "green",
    color: "green",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""'
    }
  }
}))(Badge);

const GreyStyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "grey",
    color: "grey",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""'
    }
  }
}))(Badge);

var counter = 0;

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

  const [autoMessage, setAutoMessage] = useState(0);
  const [targetID, setTargetID] = useState("")
  const [targetVideoID, setTargetVideoID] = useState("")
  const [toID, setToID] = useState("")

  const sendConversationMessage = useSendConversationMessage();

  const socket_ref = useRef();
  const [user_on_server, setUser_On_Server] = useState([])



  // Returns the recipient name that does not
  // belong to the current user.
  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if ( recipients[i].username !== authenticationService.currentUserValue.username ) 
      {
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
                let socket = Socket;
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

  //console.log("===props.me_props_2===");
  //console.log(props.me_props);
  //console.log(props.user_id);

  useEffect(() => {
      socket_ref.current = Socket;
      socket_ref.current.on("getMessage", (data) => {

      if(String(data.text).substr(0, 6).valueOf() == String("发起视频通话").valueOf())
      {

                //console.log("AutoMessage in ChatBox");
                counter = counter + 1;

                //console.log(String(data.text).substr(7,24));
                //console.log(String(data.text).substr(33,42));
                setTargetID(String(data.text).substr(7,24));
                setToID(String(data.text).substr(33,42));
                setAutoMessage(counter);
                //console.log(counter);
                setTargetVideoID(String(""));



      }
      else if(String(data.text).substr(0, 5).valueOf() == String("我的电话号").valueOf())
      {

                //console.log("AutoCallID");
                //console.log(String(data.text).substr(6,27));
                setTargetVideoID(String(data.text).substr(6,27));
                setShow_Button(true);
                //props.setIdToCall_props_2(String(data).substr(6,27));
                //props.callUser_props_2(String(data).substr(6,27));

      }
    });
  }, []);


  useEffect(() => {
      //console.log("AutoMessage is working and the props is");
      //console.log(props);
      //console.log(String(targetID).valueOf());
      //console.log(String(props.chat_user_id).valueOf());
      //console.log(autoMessage);
      if(autoMessage>0 && (String(targetID).valueOf() != String(props.user_id).valueOf()) && (String(toID).valueOf() == String(props.user_id).valueOf()) )
      {
        //////////////////
        //debug for < bug
        //console.log("Auto sending back video id");
        //console.log(targetID);
        //console.log(toID);
        //console.log(props.user_id);
        //console.log("我的电话号="+String(props.me_props) );
        sendConversationMessage(targetID, "我的电话号="+String(props.me_props)).then((res) => {
          setNewMessage("");
        });

        //console.log("Auto sending back video id");
        //console.log(props.user_id);
        //console.log("===props.me_props_3===");
        //console.log("我的电话号="+String(props.me_props) );
        socket_ref.current.emit("sendMessage", {
          senderId: props.user_id,
          receiverId:targetID,
          text: "我的电话号="+String(props.me_props),
        });

      }
  }, [autoMessage]);

  //*/


  useEffect(() => {

      socket_ref.current.on("getUsers", (users) => {
          console.log("===all_user===");
          console.log(users); 
          setUser_On_Server(users);
          console.log(user_on_server); 
      });

  }, [props.user_id]);

  function search(user_id, myArray){
      for (var i=0; i < myArray.length; i++) {
          console.log("search")
          console.log(i)
          console.log(myArray[i].user_ID)
          console.log(user_id)
          if (myArray[i].user_ID === user_id) {
              return true;
          }
          else
          {
              return false;
          }
      }
  }
  return (
    <List className={classes.list}>
      <ListItem
        classes={{ root: classes.subheader }}
        onClick={() => {
          props.setScope("Global Chat");
          handleShow();
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
          {conversations.map((c) => {

            console.log(c);
            console.log(user_on_server);

            var result_online = user_on_server.filter(x => x.user_ID === c.recipients[1]);

            console.log(result_online);
            console.log("====once=====");

          return (
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
                { result_online.length > 0 ? (
                  <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  variant="dot"
                >
                  <Avatar className={classes.globe} >
                    {commonUtilites.getInitialsFromName(
                      handleRecipient(c.recipientObj).username
                    )}
                  </Avatar>
                </StyledBadge>) 
                :
                (
                  <GreyStyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  variant="dot"
                >
                  <Avatar className={classes.globe} >
                    {commonUtilites.getInitialsFromName(
                      handleRecipient(c.recipientObj).username
                    )}
                  </Avatar>
                </GreyStyledBadge>) 
              }



              </ListItemAvatar>
              <ListItemText
                className={classes.subheaderText}
                primary={handleRecipient(c.recipientObj).username}
                secondary={<React.Fragment>{c.lastMessage}</React.Fragment>}
              />
            </ListItem>



          )})}
        </React.Fragment>
      )}
      <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
      >
        <Modal.Body>
              <ChatBox scope={props.scope} user={props.user} me_id={props.me_props} chat_user_id={props.user_id} chat_user_name={props.username} setIdToCall_props_2={props.setIdToCall_props}  stream_props_2={props.stream_props} callUser_props_2={props.callUser_props} socket_2={props.socket}/>
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
