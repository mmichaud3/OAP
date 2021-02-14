import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import Post from '../../components/Post';
import Spinner from '../../components/Spinner';

import Styles from './Home.module.css';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
        author {
          name
        }
        comments {
          id
          body
          author {
            name
          }
        }
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [count, setCount] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [first, setFirst] = useState(5);

  const onSelect = () => {
    setCount(parseInt(document.getElementById('perPage').value));
  };

  const pageClickPrev = () => {
    if (pageCount > 0) {
      setFirst(first - count);
      setPageCount(pageCount - count);
    }
  };
  const pageClickNext = () => {
    if (first <= 10) {
      setFirst(first + count);
      setPageCount(pageCount + count);
    }
  };
  if (loading) return <Spinner />;
  return (
    <div className={Styles.home}>
      <div className={Styles.header}>
        <h1>Posts</h1>
        <div className={Styles.control}>
          <select
            className={Styles.select}
            name='perPage'
            id='perPage'
            onChange={onSelect}
          >
            <option value='' disabled selected>
              Per Page
            </option>
            <option value='1'>1</option>
            <option value='5'>5</option>
            <option value='10'>10</option>
          </select>
          <div className={Styles.btns}>
            <button className='btn1' onClick={pageClickPrev}>
              Prev
            </button>
            <button className='btn2' onClick={pageClickNext}>
              Next
            </button>
          </div>
        </div>
      </div>

      {data && (
        <>
          {data.posts.data.slice(pageCount, first).map((d) => (
            <Post
              key={d.id}
              link={d}
              index
              title={d.title}
              body={d.body}
              author={d.author.name}
              comments={d.comments}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
