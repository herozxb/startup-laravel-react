import { Component } from 'react';
import ReactDOM from 'react-dom';

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import useChat from './components/Chat/useChat';
import './components/Chat/ChatRoom.css';
import Chat from './components/Chat2/Chat';

import { io } from 'socket.io-client';
import Peer from 'simple-peer';


//const socket = io("https://www.xhappysearch.com:5001");
const socket = io("http://192.168.1.103:5001");

const useStyles = makeStyles((theme) => ({
  video: {
    width: '80vw',
    maxWidth: '600px',
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '100%',
    margin: '0px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
    background: 'linear-gradient(107.68deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 100%)',

  },
}));

const Example = () => { 


  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();
  const [qrCode, setQrCode] = useState('null');



  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) =>{ setMe(id); console.log("=======1======="); console.log(id) });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };




  const roomId = 7;
  const { messages, sendMessage } = useChat(roomId); 
  const [newMessage, setNewMessage] = React.useState(''); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };



        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-20">
                        <div className="card">

			    <Grid container className={classes.gridContainer}>

			      {stream && (
				<Paper className={classes.paper}>
				  <Grid item xs={12} md={6}>
				    <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
				    <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
				  </Grid>
				</Paper>
			      )}
			      {callAccepted && !callEnded && (
				<Paper className={classes.paper}>
				  <Grid item xs={12} md={6}>
				    <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
				    <video playsInline ref={userVideo} autoPlay className={classes.video} />
				  </Grid>
				</Paper>
			      )}
			    </Grid>

			    <Container className={classes.container}>
			      <Paper elevation={10} className={classes.paper}>
				<form className={classes.root} noValidate autoComplete="off">
				  <Grid container className={classes.gridContainer}>
				    <Grid item xs={12} md={6} className={classes.padding}>
				      <Typography gutterBottom variant="h6">账户信息</Typography>
				      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
				      <CopyToClipboard text={me} className={classes.margin}>
					<Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
					  拷贝ID {me}
					</Button>
				      </CopyToClipboard>
				    </Grid>
				    <Grid item xs={12} md={6} className={classes.padding}>
				      <Typography gutterBottom variant="h6">视频通话</Typography>
				      <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
				      {callAccepted && !callEnded ? (
					<Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
					  挂掉电话
					</Button>
				      ) : (
					<Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
					  视频通话
					</Button>
				      )}
				    </Grid>
				  </Grid>

				</form>

			      </Paper>
            <Chat />
			    </Container>
          
        

            


                        </div>
                    </div>
                </div>
            </div>
        );

}

export default Example

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
