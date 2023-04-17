/* eslint-disable */

import './App.css';
import { useState } from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [title, updateTitle] = useState(['안녕하세요.', '남자 코트 정보', '강아지 코트 정보']);
  let [likeCount, updateLikeCount] = useState(0);
 
  // state 쓰는 이유 : 일반 변수는 내용이 변경 되어도 html 업데이트가 안됨
  // distructuring 문법
  // let [a, c] = [1, 2]; // a = 1; c = 2;

  return (
    <div className="App">
      <div className='black-nav'>
        <h4 style={{color: 'red', fontSize: '20px'}}>블로그임!!</h4>
      </div>
      <h4 id={post}>{post}</h4>
      <button onClick={ () => { updateTitle('여자 코트 정보') } }>최신순</button>
      <div className='list'>
        <h4>{ title[0] } <span onClick={ () => { updateLikeCount(likeCount+1) } }>👍</span>{ likeCount }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ title[1] }</h4>
        <p>2월 17일 발행!</p>
      </div>
      <div className='list'>
        <h4>{ title[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
