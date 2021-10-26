import ReactDOM from 'react-dom';
import React, { Component, useState, useContext, useRef, useEffect } from 'react';
import { Grid, Transition, Divider, Header, Icon, Image } from 'semantic-ui-react';
import { ApolloClient } from "apollo-client";
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY, FETCH_AREA_QUERY, CREATE_AREA_POST_MUTATION, CREATE_AREA_HONESTY_POST_MUTATION } from './util/graphql';
import PostCard from './components/PostCard';
import { Card, Button, Dropdown, DropdownButton, Form, Row, Col } from 'react-bootstrap';

import moment from 'moment';
import { useSnackbar } from 'notistack';
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import TextField from "@material-ui/core/TextField";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid_Modal from '@material-ui/core/Grid';

import Chat from './components/Chat2/Chat';
import {useSendConversationMessage} from "./components/Services/chatService";
import Modal from 'react-bootstrap/Modal'


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const HomePageApp = (props) => { 

  //////////////////////////////////////////////////////////
  //Thought Area
  const [areaValues,setAreaValues] = useState("Self_improvement");
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [user_login,setUser_login] = useState("");
  const [pagings,setPagings] = useState(0);  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const useHandleResponse = () => {

      const handleResponse = response => {
          return response.text().then(text => {
              const data = text && JSON.parse(text);
              if (!response.ok) {
                  if ([401, 403].indexOf(response.status) !== -1) {
                  }

                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
              }

              return data;
          });
      };

      return handleResponse;
  };

  const handleResponse = useHandleResponse();


  const login = (username, password) => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
      };

      console.log(requestOptions)

      return fetch(
          `https://120.53.220.237:5002/api/users/login`,
          requestOptions
      ).then(handleResponse)
      .then(user => {
                    setUser_login(user);
          }).catch((error) => {
                    console.log(error)
                    
                  });

  };

  const link = createHttpLink({ uri: 'https://120.53.220.237:5005/graphql' });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const token = user_login.token;
    return {
      headers: {
        ...headers,
        authorization:  `${token}`,
      }
    }
  });



  const cache = new InMemoryCache();
  const client = new ApolloClient({ link: authLink.concat(link),cache });
  const user = "True"


  const on_change_for_thought_area = (value) => 
  {
    setAreaValues(value);
    client
      .query({
        query: FETCH_AREA_QUERY,

          variables: {
            thoughtArea : value,
            limit:20,
            skip:0,
        },
      }).then(result => {setPosts(result.data.getAreaPosts); console.log("============post_user_id========="); console.log(result.data.getAreaPosts[0].user); } );

  };


  useEffect(() => {

    login( props.name, props.password );

  	client
  	  .query({
  	    query: FETCH_AREA_QUERY,

  	      variables: {
  		      thoughtArea : areaValues,
            limit:20,
            skip:0,
  	    },
  	  }).then(result => {setPosts(result.data.getAreaPosts);setLoading(result.data.loading) } );

  },[]);

  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (name) => {
    setActiveItem(name);
  };


  const [texts, setTexts] = useState();
  const [city, setCity] = useState();
  const [salary, setSalary] = useState();
  const [thoughtAreaMutation, setThoughtAreaMutation] = useState('default');


  const area = "Self_improvement"

  const on_change_for_text = (event) => {
    setTexts( event.target.value );
  };



  const upload_post = () =>{
    client.mutate({
        mutation: CREATE_AREA_HONESTY_POST_MUTATION,
        variables: { body: texts, thoughtArea: areaValues, honesty:String(parseFloat(props.honesty)/parseFloat(props.money)), ability:String(parseFloat(props.ability)/parseFloat(props.money)) },

        update(cache, {data:{createAreaHonestyPost}})  {

          try {
              client.query({
              query: FETCH_AREA_QUERY,
              variables:{ thoughtArea : areaValues, limit:20, skip:0,}
          }).then(result => {

              setPosts([...result.data.getAreaPosts])
          })
              
              } catch (e) {

              }
        }
        

    }).then(() => {
      setTexts("");
     console.log("WithStaticCache upvotedPost then");
    })
    .catch(err => {
     console.log("catch 1", err);
    });;
  }



  const [currentPage, setCurrentPage] = useState(0);

  const change_paging = (page) =>{
    setCurrentPage(page+1);
    client
      .query({
        query: FETCH_AREA_QUERY,

          variables: {
            thoughtArea : areaValues,
            limit:20,
            skip:page*20,
        },
      }).then(result => {setPosts(result.data.getAreaPosts);} );

    
  }

  ////////////////////////////////////////////////////////////////////////////
  //Jump to other user
  const sendConversationMessage = useSendConversationMessage();

  
  const on_jump_to_other_user = (user_id) =>{

    if (user_id !== user_login.userId ) 
    {
      sendConversationMessage(user_id,"你好");
    }
  }

  const valueRef = useRef('') //creating a refernce for TextField Component

  const sendValue = () => {
      console.log(valueRef.current.value) //on clicking button accesing current value of TextField and outputing it to console 
      
      if(valueRef.current.value>0)
      {  
        change_paging(valueRef.current.value-1);
      }
  }


  return (
		<Grid>
		      <Grid.Row centered>

    				<DropdownButton id="dropdown-basic-button" title="       搜索行业领域       " size='lg' style={{ width: '300px', transform:' translateX(15px)', zIndex: 100}} >
    				  <Dropdown.Item onClick={()=>{ on_change_for_thought_area("Self_improvement")}} href="#/action-1">科学</Dropdown.Item>
    				  <Dropdown.Item onClick={()=>{ on_change_for_thought_area("Relationship")}} href="#/action-2">技术</Dropdown.Item>
    				  <Dropdown.Item onClick={()=>{ on_change_for_thought_area("Education")}} href="#/action-3">教育</Dropdown.Item>
              <Dropdown.Item onClick={()=>{ on_change_for_thought_area("Health")}} href="#/action-4">医疗</Dropdown.Item>
              <Dropdown.Item onClick={()=>{ on_change_for_thought_area("Cloth")}} href="#/action-5">服饰</Dropdown.Item>
              <Dropdown.Item onClick={()=>{ on_change_for_thought_area("Eating")}} href="#/action-6">美食</Dropdown.Item>
              <Dropdown.Item onClick={()=>{ on_change_for_thought_area("House")}} href="#/action-7">租房</Dropdown.Item>
              <Dropdown.Item onClick={()=>{ on_change_for_thought_area("Travel")}} href="#/action-8">旅游</Dropdown.Item>
    				</DropdownButton>

          </Grid.Row>

          <Grid.Row centered>
            <div class="input-group mb-3" style={{ width: '80%', transform:' translateX(15px)'}}>
              <div class="input-group-prepend">
                <button class="btn btn-primary btn-lg" type="button" onClick={upload_post}> 发布 </button>
              </div>
              <input type="text" value={texts} class="form-control" placeholder="世界 你好！" aria-label="" aria-describedby="basic-addon1" onChange={on_change_for_text}         onClick={() => {handleShow();}} />
            
              <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>创建发布的信息</Modal.Title>
                  <FormControl component="fieldset">
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                      <FormControlLabel
                        value="disabled"
                        disabled
                        control={<Radio />}
                        label="other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Modal.Header>
                <Modal.Body>

                  <Grid_Modal container direction={'column'} spacing={24}>
                    <Grid_Modal item>
                     <textarea type="text" value={texts} class="form-control" id="text-content" rows="7"  placeholder="世界 你好！" aria-label="" aria-describedby="basic-addon1" onChange={on_change_for_text} ></textarea>
                    </Grid_Modal>
                    <Divider />
                     <Grid_Modal container item spacing={1}>
                      <Grid_Modal item xs={5}>
                        <input type="text" value={city} class="form-control" placeholder="地点" aria-label="" aria-describedby="basic-addon1" />
                      </Grid_Modal>
                      <Grid_Modal item xs={1} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                        <span>城市</span>
                      </Grid_Modal>
                      <Grid_Modal item xs={4}>
                        <input type="text" value={salary} class="form-control" placeholder="薪资" aria-label="" aria-describedby="basic-addon1" />
                      </Grid_Modal>
                      <Grid_Modal item xs={2} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                        <span> 每小时</span>
                      </Grid_Modal>
                     </Grid_Modal>
                  </Grid_Modal>

                </Modal.Body>
                <Modal.Footer>
                  <button class="btn btn-primary btn-lg" type="button" onClick={() => {upload_post();}}>
                    发布
                  </button>
                </Modal.Footer>
              </Modal>

            </div>


          </Grid.Row>
		      <Grid.Row centered>
          {
			       loading ?   (
			  		               <h1>读取中...</h1> ) 
                        : 
				                (

			  		               posts.map((post) => ( 
                  								<Card style={{ width: '15rem', transform:' translateX(15px)' }}>
                  								  <Card.Img variant="top" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                  								  <Card.Body>
                  								    <Card.Title>{post.username}</Card.Title>
                                      <Row style={{  transform:' translateX(50px)' }} >
                                          <Typography variant="caption" display="block" gutterBottom>
                                            信誉
                                          </Typography>
                                          <Rating name="half-rating-read" value={post.honesty} precision={0.1} size="small" readOnly />
                                      </Row>
                                      <Row style={{  transform:' translateX(50px)' }} >
                                          <Typography variant="caption" display="block" gutterBottom>
                                            能力
                                          </Typography>
                                          <Rating name="half-rating-read" value={post.ability} precision={0.1} size="small" readOnly />
                                      </Row>
                  								    <Card.Text>
                  								      {post.body}
                  								    </Card.Text>

                     								  { user_login &&  <a href="/video" >
                  								          { post.user !== user_login.userId && <Button variant="primary" onClick={()=>{ on_jump_to_other_user(post.user)}}>联系他</Button>  
                     								       }
                                        </a>  
                                      }


                                        <Card.Text>
                                          <small className="text-muted">{moment(post.createdAt).fromNow(true)}</small>
                                        </Card.Text>
                  								  </Card.Body>
                  								</Card>					
						              ))


				              ) 
          }
          </Grid.Row>
          <Grid.Row centered>
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item active={currentPage == 1} onClick={()=>change_paging(0)} >{1}</Pagination.Item>
              <Pagination.Item active={currentPage == 2} onClick={()=>change_paging(1)} >{2}</Pagination.Item>
              <Pagination.Item active={currentPage == 3} onClick={()=>change_paging(2)} >{3}</Pagination.Item>
              <Pagination.Item active={currentPage == 4} onClick={()=>change_paging(3)} >{4}</Pagination.Item>
              <Pagination.Item active={currentPage == 5} onClick={()=>change_paging(4)} >{5}</Pagination.Item>
              <Pagination.Item active={currentPage == 6} onClick={()=>change_paging(5)} >{6}</Pagination.Item>
              <Pagination.Item active={currentPage == 7} onClick={()=>change_paging(6)} >{7}</Pagination.Item>
              <Pagination.Item active={currentPage == 8} onClick={()=>change_paging(7)} >{8}</Pagination.Item>
              <Pagination.Item active={currentPage == 9} onClick={()=>change_paging(8)} >{9}</Pagination.Item>
              <Pagination.Item active={currentPage == 10} onClick={()=>change_paging(9)} >{10}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Grid.Row>
          <Grid.Row centered>
            <TextField
              label="页数"
              id="outlined-size-small"
              defaultValue="1"
              variant="outlined"
              size="small"
              inputRef={valueRef}
            />
            <a style={{ marginLeft: '.5rem' }}></a>
            <Button variant="primary" onClick={sendValue}>搜索</Button> 

          </Grid.Row>
		</Grid>
    );

}

export default HomePageApp

if (document.getElementById('HomePage')) {
    //ReactDOM.render(<HomePageApp />, document.getElementById('HomePage'));

    // find element by id
    const element = document.getElementById('HomePage')
      
    // create new props object with element's data-attributes
    // result: {tsId: "1241"}
    const props = Object.assign({}, element.dataset)

    // render element with props (using spread)
    ReactDOM.render(<HomePageApp {...props}/>, element);
}
