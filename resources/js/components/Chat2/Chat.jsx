import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import classnames from "classnames";
import commonUtilites from "../Utilities/common";


import { useLogin } from '../Services/authenticationService';


//import Header from '../Layout/Header';
import ChatBox from './ChatBox';
import Conversations from './Conversations';
import Users from './Users';

import socketIOClient from "socket.io-client";
import Socket from "./Socket";


const useStyles = makeStyles(theme => ({

    sidebar: {
        zIndex: 8,
        height: "100%",

        [theme.breakpoints.down('xs')]: {
          width: '100%',
          justifyContent: 'center',
          backgroundColor: theme.palette.primary.dark,
        },
    },

    paper: {
        minHeight: 'calc(100vh - 64px)',
        borderRadius: 0,


    },

    subheader: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    globe: {
        backgroundColor: theme.palette.primary.dark,
    },
    subheaderText: {
        color: theme.palette.primary.dark,
    },
    text: {
        height: "390px",
      },
    root: {
        height: "100%",
      },
      headerRow: {
        maxHeight: 60,
        zIndex: 5,
      },
      paper2: {
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
      listItem: {
        display: "flex",
        width: "100%",
      },
      listItemRight: {
        flexDirection: "row-reverse",
      },
}));


const Chat = (props) => {
    const [scope, setScope] = useState('Global Chat');
    const [tab, setTab] = useState(0);
    const [user, setUser] = useState(null);
    const classes = useStyles();
    const [newMessage, setNewMessage] = useState("");

    const [user_id, setUser_ID] = useState('');
    const [user_name, setUser_Name] = useState('');
    const socket = useRef();

    const handleChange = (e, newVal) => {
        setTab(newVal);
    };

  useEffect(() => {
    socket.current = Socket;
    socket.current.on("getMessage", (data) => {
      console.log("get messages from https server in chatbox of login []"); 
      console.log(data); 
    });
  }, []);

    const login = useLogin();
    login(props.chat_props.name,"hero2009").then((user_login) => {
        //console.log("===user_login==="); 
        //console.log(user_login); 
        setUser_ID(user_login.userId)
        setUser_Name(user_login.username)
        //console.log(user_id); 
      });

    useEffect(() => {
        socket.current.emit("addUser", {user_id,user_name});
        socket.current.on("getUsers", (users) => {
            //console.log("===all_user===");
            //console.log(users); 
        });

    }, [user_id]);

    //console.log("===props.me_props_1===");
    //console.log(props.me_props);

    return (
        <React.Fragment>
            <Grid container>
                <Grid item  className={classes.sidebar}>
                    <Paper className={classes.paper} square elevation={5}>
                        <Paper square>
                            <Tabs
                                onChange={handleChange}
                                variant="fullWidth"
                                value={tab}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="好友" />
                                <Tab label="用户" />
                            </Tabs>
                        </Paper>
                        {tab === 0 && (
                            <Conversations
                                setUser={setUser}
                                setScope={setScope}
                                scope={scope} 
                                user={user} 
                                me_props={props.me_props} 
                                user_id={user_id} 
                                setIdToCall_props={props.setIdToCall_props}  
                                stream_props={props.stream_props} 
                                callUser_props={props.callUser_props}
                            />
                        )}
                        {tab === 1 && (
                            <Users 
                                setUser={setUser} 
                                setScope={setScope}
                                scope={scope} 
                                user={user} 
                                me_props={props.me_props} 
                                user_id={user_id} 
                                setIdToCall_props={props.setIdToCall_props}  
                                stream_props={props.stream_props} 
                                callUser_props={props.callUser_props}
                                 />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Chat;
