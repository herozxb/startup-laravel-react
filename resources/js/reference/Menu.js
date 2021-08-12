import ReactDOM from 'react-dom';
import React, { Component, useState, useContext, useRef, useEffect } from 'react';
import { Menu, Grid } from 'semantic-ui-react';



import { Dropdown } from 'react-bootstrap';


const MenuBar = () => { 


const options = [
  { key: '1', text: '个人修养', value: 'Self_improvement' },
  { key: '2', text: '人际关系', value: 'Relationship' },
  { key: '3', text: '世界关系', value: 'Wolrd' },
  { key: '4', text: '健康', value: 'Health' },
  { key: '5', text: '成功', value: 'Success' },
  { key: '6', text: '梦想', value: 'Dream' },
  { key: '7', text: '改变世界', value: 'Change_the_world' },
  { key: '8', text: '勇敢去做', value: 'Brave_to_do' },
  { key: '9', text: 'Innovative Ideas', value: 'Innovative Ideas' },
  { key: '10', text: '工作', value: 'Job' },
  { key: '11', text: '开公司', value: 'Company' },
  { key: '12', text: '干', value: 'do' },
  { key: '13', text: '时间 Time', value: 'Time' },
  { key: '14', text: '痛苦 Pain', value: 'Pain' },
  { key: '15', text: '财富 Wealth', value: 'Wealth' },
  { key: '16', text: '说话', value: 'Speak' },
  { key: '17', text: '家庭', value: 'Family' },
  { key: '18', text: '年轻', value: 'Young' },
  { key: '19', text: '一念之差', value: 'Danger_thought' },
  { key: '20', text: '借口', value: 'Excuse' },
  { key: '21', text: '善与恶', value: 'good_or_evil' },
  { key: '22', text: '对付坏人', value: 'Enemy' },
  { key: '23', text: '正义 Justice', value: 'Justice' },
  { key: '24', text: '纪念 Memory', value: 'Memory' },
  { key: '25', text: '今天', value: 'Today' },
  { key: '26', text: '计划 Plan', value: 'Plan' },
  { key: '27', text: '科技革命', value: 'Revolution' },
]






  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (name) => {

  setActiveItem(name);
  
  };


        return (
<Grid>
<div className="dropdown">
        <Dropdown>
        <Dropdown.Toggle 
        variant="secondary btn-sm" 
        id="dropdown-basic">
            Language
        </Dropdown.Toggle>

        <Dropdown.Menu style={{backgroundColor:'#73a47'}}>
            <Dropdown.Item href="#" >Arabic</Dropdown.Item>
            <Dropdown.Item href="#">English</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
</div>
	<Grid.Row>
        <Grid.Column>
          </Grid.Column>
</Grid.Row>
<Grid.Row>
<Grid.Column>
    <Menu pointing size="massive" color="blue">
      <Menu.Item
        name="主页"
        active={activeItem === 'home'}
        onClick={() => handleItemClick("home")}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="登入"
          active={activeItem === 'login'}
          onClick={() => handleItemClick("login")}
        />
        <Menu.Item
          name="注册"
          active={activeItem === 'register'}
          onClick={() => handleItemClick("register")}
        />
      </Menu.Menu>
    </Menu>
</Grid.Column>
</Grid.Row>
</Grid>
        );

}

export default MenuBar

if (document.getElementById('MenuBar')) {
    ReactDOM.render(<MenuBar />, document.getElementById('MenuBar'));
}
