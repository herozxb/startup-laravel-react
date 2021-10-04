import { Component } from 'react';
import ReactDOM from 'react-dom';

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Chat from './components/Chat2/Chat';

import { io } from 'socket.io-client';
import Peer from 'simple-peer';

import Modal from 'react-bootstrap/Modal'


//const socket = io("https://www.xhappysearch.com:5001");
const socket = io("https://120.53.220.237:5001");

const useStyles = makeStyles((theme) => ({
  video: {
    width: '100vw',
    maxWidth: '1200px',
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',

  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  container: {
    width: '100%',
    margin: '0px 0',
    padding: 0,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      justifyContent: 'center',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '0px 0px',
    border: '2px solid black',
    background: 'linear-gradient(107.68deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 100%)',

  },
}));

const Example = (props) => { 

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


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) =>{ setMe(id); console.log(id) });
    setName(props.name)

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
      handleShow();
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
                        				      <TextField label="Name" value={props.name} onChange={(e) => setName(props.name)} fullWidth />
                        				    </Grid>

                        				    <Grid item xs={12} md={6} className={classes.padding}>
                        				      {callAccepted && !callEnded && (
                                					<Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                                					  挂掉电话
                                					</Button>
                        				      )}
                        				    </Grid>
                        				  </Grid>
                                  <Modal
                                      show={show}
                                      onHide={handleClose}
                                      backdrop="static"
                                      keyboard={false}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>视频通话呼叫</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                          <h5>{call.name} 正在呼叫</h5>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="contained" color="primary" onClick={() => {answerCall();handleClose();}}>
                                        接受电话
                                      </Button>
                                      <Button variant="contained" color="primary"  onClick={() => {handleClose();}}>
                                        关闭
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>


                        				</form>

                  			      </Paper>
                              <Chat chat_props={props} me_props={me} setIdToCall_props={setIdToCall} callUser_props={callUser}/>
                  			    </Container>
                        </div>
                    </div>
                </div>
            </div>
        );

}

export default Example

if (document.getElementById('example')) {
    //ReactDOM.render(<Example />, document.getElementById('example'));

    // find element by id
    const element = document.getElementById('example')
      
    // create new props object with element's data-attributes
    // result: {tsId: "1241"}
    const props = Object.assign({}, element.dataset)

    // render element with props (using spread)
    ReactDOM.render(<Example {...props}/>, element);
}

