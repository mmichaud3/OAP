import React, { Fragment } from 'react';
import Comment from './Comment';
import './Post.css';

import { FetchType } from 'apollo-boost';

const Post = (props) => {
  const { title, body, author, comments } = props;
  const postComments = comments
    .filter((x) => comments.indexOf(x) < 2)
    .map((c) => <Comment commentBody={c.body} commentAuthor={c.author.name} />);
  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{body}</p>
      <p className='author'>~{author}</p>
      <div className='comments'>
        <h3>Comments</h3>
        <p>{postComments}</p>
      </div>
    </Fragment>
  );
};

export default Post;
