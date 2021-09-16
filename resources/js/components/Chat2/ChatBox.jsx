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
    maxWidth: "40em",
    color:theme.palette.primary.dark,
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



  useEffect(() => {
    reloadMessages();
    scrollToBottom();
  }, [lastMessage, props.scope, props.conversationId]);

//console.log("props.me_id = ");
//console.log(props.me_id);

//console.log("props.chat_user_id = ");
//console.log(props.chat_user_id);

  useEffect(() => {
    const socket = socketIOClient("https://120.53.220.237:5002");
    //console.log("==2===socket===Message========");
    socket.on("messages", (data) => {
      setLastMessage(data);
      //console.log("get messages from https server in chatbox"); 
      //console.log(data); 
      //console.log(props.me_id);
      if(String(data).substr(0, 6).valueOf() == String("发起视频通话").valueOf())
      {

                //console.log("AutoMessage");
                counter = counter + 1;
                setAutoMessage(counter)
                //console.log(autoMessage);
                //console.log(String(data).substr(7,32));
                setTargetID(String(data).substr(7,32))

      }
      else if(String(data).substr(0, 5).valueOf() == String("我的电话号").valueOf())
      {

                //console.log("AutoCallID");
                //console.log(String(data).substr(6,27));
                setTargetVideoID(String(data).substr(6,27))
                props.setIdToCall_props_2(String(data).substr(6,27))

      }
    });
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
      if(autoMessage>0 && (String(targetID).valueOf() != String(props.chat_user_id).valueOf()) )
      {
        console.log("Auto sending back video id");
        console.log(targetID);
        console.log("我的电话号="+String(props.me_id) );
        sendConversationMessage(targetID, "我的电话号="+String(props.me_id)).then((res) => {
          setNewMessage("");
        });
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
        sendConversationMessage(props.user._id, "发起视频通话=" + String(props.chat_user_id)).then((res) => {
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

/*
  useEffect(() => {

    if(mountedRef.current === true)
    {
      reloadMessages();
      scrollToBottom();

      setTimeout(
        function() {
            mountedRef.current = false;
        },3000);
    }
  }, [messages]);
//*/
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

                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => props.callUser_props_2(targetVideoID)} className={classes.margin}>
                  视频通话
                </Button>

              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatBox;
