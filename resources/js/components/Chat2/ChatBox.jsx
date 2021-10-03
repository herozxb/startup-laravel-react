 
import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { Button } from '@material-ui/core';
import { Phone, PhoneDisabled } from '@material-ui/icons';
import socketIOClient from "socket.io-client";
import classnames from "classnames";
import commonUtilites from "../Utilities/common";
import {
  useGetGlobalMessages,
  useSendGlobalMessage,
  useGetConversationMessages,
  useSendConversationMessage,
} from "../Services/chatService";
import { authenticationService } from "../Services/authenticationService";
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    minHeight:500,
  },
  headerRow: {
    maxHeight: 60,
    zIndex: 5,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: theme.palette.primary.dark,
  },
  messageContainer: {
    height: "100%",
    display: "flex",
    alignContent: "flex-end",
  },
  messagesRow: {
    maxHeight: "calc(100vh - 184px)",
    overflowY: "auto",
  },
  newMessageRow: {
    width: "100%",
    padding: theme.spacing(0, 2, 1),
  },
  messageBubble: {
    padding: 10,
    border: "1px solid white",
    backgroundColor: "white",
    borderRadius: "0 10px 10px 10px",
    boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
    marginTop: 8,
    maxWidth: "75%",
    color:theme.palette.primary.dark,
    wordBreak: "break-all",

    [theme.breakpoints.down('xs')]: {
      maxWidth: "270px",
      wordBreak: "break-all",
    },
  },
  messageBubbleRight: {
    borderRadius: "10px 0 10px 10px",
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-end",
  },
  form: {
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
  },
  globe: {
    backgroundColor: theme.palette.primary.dark,
  },
  listItem: {
    display: "flex",
    width: "100%",
  },
  listItemRight: {
    flexDirection: "row-reverse",
  },
}));

var counter = 0;

const ChatBox = (props) => {
  const [currentUserId] = useState(
    authenticationService.currentUserValue.userId
  );
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  const [autoMessage, setAutoMessage] = useState(0);

  const getGlobalMessages = useGetGlobalMessages();
  const sendGlobalMessage = useSendGlobalMessage();
  const getConversationMessages = useGetConversationMessages();
  const sendConversationMessage = useSendConversationMessage();

  let chatBottom = useRef(null);
  const classes = useStyles();
  const mountedRef = useRef(true)                 // ← the "flag"

  const [targetID, setTargetID] = useState("")
  const [targetVideoID, setTargetVideoID] = useState("")
  const [toID, setToID] = useState("")

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show_button, setShow_Button] = useState(false);
  const [loading_video, setLoadingVideo] = useState(false);
  const [people_not_online, setPeopleNotOnLine] = useState(false);




  useEffect(() => {
    reloadMessages();
    scrollToBottom();
  }, [lastMessage, props.scope, props.conversationId]);

//console.log("props.me_id = ");
//console.log(props.me_id);

//console.log("props.chat_user_id = ");
//console.log(props.chat_user_id);

  useEffect(() => {
    //const socket = socketIOClient("https://120.53.220.237:5002");
    //props.socket_2.current = socketIOClient("https://120.53.220.237:5002");

    props.socket_2.current.on("getMessage", (data) => {
          console.log("get messages from https server in chatbox of 2"); 
          console.log(data); 
    });

    props.socket_2.current.on("getMessage", (data) => {
      setLastMessage(data.text);
      console.log("get messages from https server in chatbox"); 
      console.log(data); 

      sendConversationMessage(data.senderId, "我的电话号="+String(props.me_id)).then((res) => {
        setNewMessage("");
      });

      console.log("我的电话号="+String(props.me_id) );
      props.socket_2.current.emit("sendMessage", {
        senderId: props.chat_user_id,
        receiverId:data.senderId,
        text: "我的电话号="+String(props.me_id),
      });


      console.log(String(data.text).substr(0, 6).valueOf() );
      if(String(data.text).substr(0, 6).valueOf() == String("发起视频通话").valueOf())
      {

                console.log("AutoMessage in ChatBox");
                counter = counter + 1;

                console.log(String(data.text).substr(7,24));
                console.log(String(data.text).substr(33,42));
                setTargetID(String(data.text).substr(7,24));
                setToID(String(data.text).substr(33,42));
                setAutoMessage(counter);
                //console.log(counter);
                setTargetVideoID(String(""));

                console.log("Auto sending back video id");
                console.log(targetID);
                console.log(toID);
                console.log(props.chat_user_id);
                console.log("我的电话号="+String(props.me_id) );
                props.socket_2.current.emit("sendMessage", {
                  senderId: props.chat_user_id,
                  receiverId:targetID,
                  text: "我的电话号="+String(props.me_id),
                });

      }
      else if(String(data.text).substr(0, 5).valueOf() == String("我的电话号").valueOf())
      {

                console.log("AutoCallID");
                console.log(String(data.text).substr(6,27));
                setTargetVideoID(String(data.text).substr(6,27));
                setShow_Button(true);
                //props.setIdToCall_props_2(String(data).substr(6,27));
                //props.callUser_props_2(String(data).substr(6,27));

      }
    });

/*
    //console.log("==2===socket===Message========");
    socket.current.on("messages", (data) => {
      setLastMessage(data);
      //console.log("get messages from https server in chatbox"); 
      //console.log(data); 
      //console.log(props.me_id);
      if(String(data).substr(0, 6).valueOf() == String("发起视频通话").valueOf())
      {

                //console.log("AutoMessage");
                counter = counter + 1;

                //console.log(String(data).substr(7,24));
                //console.log(String(data).substr(33,42));
                setTargetID(String(data).substr(7,24));
                setToID(String(data).substr(33,42));
                setAutoMessage(counter);
                //console.log(counter);
                setTargetVideoID(String(""));

      }
      else if(String(data).substr(0, 5).valueOf() == String("我的电话号").valueOf())
      {

                //console.log("AutoCallID");
                //console.log(String(data).substr(6,27));
                setTargetVideoID(String(data).substr(6,27));
                setShow_Button(true);
                //props.setIdToCall_props_2(String(data).substr(6,27));
                //props.callUser_props_2(String(data).substr(6,27));

      }
    });
    //*/
  }, []);

  const reloadMessages = () => {
    if (props.scope === "Global Chat") {
      getGlobalMessages().then((res) => {
        setMessages(res);
      });
    } else if (props.scope !== null && props.conversationId !== null) {
      getConversationMessages(props.user._id).then((res) => setMessages(res));
    } else {
      setMessages([]);
    }
  };

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
      //console.log("AutoMessage is working and the props is");
      //console.log(props);
      //console.log(String(targetID).valueOf());
      //console.log(String(props.chat_user_id).valueOf());
      console.log(autoMessage);
      if(autoMessage>0 && (String(targetID).valueOf() != String(props.chat_user_id).valueOf()) && (String(toID).valueOf() == String(props.chat_user_id).valueOf()) )
      {
        //////////////////
        //debug for < bug
        //console.log("Auto sending back video id");
        //console.log(targetID);
        //console.log(toID);
        //console.log(props.chat_user_id);
        //console.log("我的电话号="+String(props.me_id) );
        //sendConversationMessage(targetID, "我的电话号="+String(props.me_id)).then((res) => {
        //  setNewMessage("");
        //});



      }
  }, [autoMessage]);


  const handleSubmit = (e) => {

    //console.log("In handleSubmit Chat");
    //console.log(props);

    e.preventDefault();
    if (props.scope === "Global Chat") {
      sendGlobalMessage(newMessage).then(() => {
        setNewMessage("");
      });
    } else {
      if(String(newMessage).valueOf() == String("发起视频通话").valueOf())
      {
        sendConversationMessage(props.user._id, "发起视频通话=" + String(props.chat_user_id)+"TO"+ String(props.user._id)).then((res) => {
          setNewMessage("");
        });
      }
      else
      {
        sendConversationMessage(props.user._id, newMessage).then((res) => {
          setNewMessage("");
        });
      }
    }
  };

  const start_video = (e) => {
          sendConversationMessage(props.user._id, "发起视频通话=" + String(props.chat_user_id)+"TO"+ String(props.user._id)).then((res) => {
          setNewMessage("");
        }); 

          props.socket_2.current.emit("sendMessage", {
            senderId: props.chat_user_id,
            receiverId:props.user._id,
            text: "发起视频通话=" + String(props.chat_user_id)+"TO"+ String(props.user._id),
          });

          setTimeout(() => {
            setLoadingVideo(false);
            setPeopleNotOnLine(true);
          }, 10000);
  }

  const on_change_for_message = () =>{
    if (props.scope === "Global Chat") {
      getGlobalMessages().then((res) => {
        setMessages(res);
      });
    } else if (props.scope !== null && props.conversationId !== null) {
      getConversationMessages(props.user._id).then((res) => setMessages(res));
      mountedRef.current = true;
    } else {
      setMessages([]);
    }
  }


  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.headerRow}>
        <Paper className={classes.paper} square elevation={2}>
          <Typography color="inherit" variant="h6">
            {props.scope}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.messageContainer}>
          <Grid item xs={12} className={classes.messagesRow}>
            {messages && (
              <List>
                {messages.map((m) => (
                  <ListItem
                    key={m._id}
                    className={classnames(classes.listItem, {
                      [`${classes.listItemRight}`]:
                        m.fromObj[0]._id === currentUserId,
                    })}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar >
                      <Avatar className={classes.globe} >
                        {commonUtilites.getInitialsFromName(m.fromObj[0].username)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      classes={{
                        root: classnames(classes.messageBubble, {
                          [`${classes.messageBubbleRight}`]:
                            m.fromObj[0]._id === currentUserId,
                        }),
                      }}
                      primary={m.fromObj[0] && m.fromObj[0].username}
                      secondary={<React.Fragment>{m.body}</React.Fragment>}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <div ref={chatBottom} />
          </Grid>
          <Grid item xs={12} className={classes.inputRow}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid
                container
                className={classes.newMessageRow}
                alignItems="flex-end"
              >
                <Grid item xs={11}>
                  <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton type="submit" onClick={()=>{ on_change_for_message()}}>
                    <SendIcon />
                  </IconButton>
                </Grid>

                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => {setShow_Button(false);handleShow()}} className={classes.margin}>
                  视频通话
                </Button>

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
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <h5>向 {props.scope} 发起通话</h5>
                    </div>
                    
                  </Modal.Body>
                  <Modal.Footer>
                    <>
                      {(
                        people_not_online&&!show_button&&<h3>对方不在线</h3>
                        )}
                    </>
                    <>
                      {(
                        loading_video&&!show_button&&<Spinner animation="border" variant="primary" />
                        )}
                    </>

                    {
                      show_button ? (<Button variant="contained" color="primary" onClick={() => {props.callUser_props_2(targetVideoID);setShow_Button(false);handleClose();}} >发起视频通话</Button>)
                                  : (
                                    <Button variant="contained" color="primary" onClick={() => {start_video(); setLoadingVideo(true); setPeopleNotOnLine(false);}} >检测对方视频</Button>
                                    )
                    }
                    <Button variant="contained" color="primary" onClick={() => {handleClose();}}>
                      关闭
                    </Button>
                  </Modal.Footer>
                </Modal>

              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatBox;