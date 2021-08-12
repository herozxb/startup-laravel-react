import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes } , area
}) {
  const  user  = "True";

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content>
          <iframe src="//player.bilibili.com/player.html?aid=8438275&bvid=BV1hx41117tE&cid=13892333&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
      </Card.Content>
      <Card.Content extra>
        <MyPopup content="Comment on post">
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
        </MyPopup>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
