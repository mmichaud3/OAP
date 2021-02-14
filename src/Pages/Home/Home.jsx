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
  const [pageCount, setPageCount] = useState(2);
  const [last, setLast] = useState(5);
  const [first, setFirst] = useState(0);
  const [firstPage, setFirstPage] = useState(1);

  const onSelect = () => {
    setLast(parseInt(document.getElementById('perPage').value));
    setCount(parseInt(document.getElementById('perPage').value));
    setPageCount(
      data.posts.data.length / document.getElementById('perPage').value
    );
    setFirstPage(1);
    setFirst(0);
  };

  const pageClickPrev = () => {
    if (first > 0) {
      setLast(last - count);
      setFirst(first - count);
      setFirstPage(firstPage - 1);
    }
  };
  const pageClickNext = () => {
    if (last < 10) {
      setLast(last + count);
      setFirst(first + count);
      setFirstPage(firstPage + 1);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
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
            <button onClick={pageClickPrev}>Prev</button>
            <button onClick={pageClickNext}>Next</button>
          </div>
          <div className={Styles.display}>
            <p>Page</p>
            <button className={Styles.btn} disabled>
              {firstPage}
            </button>
            <p>Of</p>
            <button className={Styles.btn} disabled>
              {pageCount}
            </button>
          </div>
        </div>
      </div>

      {data && (
        <>
          {data.posts.data.slice(first, last).map((d) => (
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
