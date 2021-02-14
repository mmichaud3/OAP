import React, { Fragment } from 'react';
import './Post.css';

const Comment = (props) => {
  const { commentBody, commentAuthor } = props;

  return (
    <div className='comment'>
      <p className='commentBody'>{commentBody}</p>
      <p className='commentAuthor'>~{commentAuthor}</p>
    </div>
  );
};
export default Comment;
