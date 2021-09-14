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

  // Returns the recipient name that does not
  // belong to the current user.
  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if (
        recipients[i].username !==
        authenticationService.currentUserValue.username
      ) {
        console.log("=============1==============")
        console.log(recipients[i])
        return recipients[i];
      }
    }
    return null;
  };

  useEffect(() => {
    getConversationsByPage(0).then((res) => {console.log("==1==============");console.log(res); setConversations(res)});
  }, [newConversation]);

  var connectionOptions =  {
          "force new connection" : true,
          "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
          "timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
          "transports" : ["websocket"]
      };

  useEffect(() => {
    let socket = socketIOClient("https://120.53.220.237:5002",connectionOptions);
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
