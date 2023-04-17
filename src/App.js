/* eslint-disable */

import './App.css';
import { useState } from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [title, updateTitle] = useState(['안녕하세요.', '남자 코트 정보', '강아지 코트 정보']);
  let [likeCount, updateLikeCount] = useState(0);
  let [modal, showModal] = useState(false);
 
  // state 쓰는 이유 : 일반 변수는 내용이 변경 되어도 html 업데이트가 안됨
  // distructuring 문법
  // let [a, c] = [1, 2]; // a = 1; c = 2;

  return (
    <div className="App">
      <div className='black-nav'>
        <h4 style={{color: 'red', fontSize: '20px'}}>블로그임!!!</h4>
      </div>
      <h4 id={post}>{post}</h4>
      <button onClick={ () => {
        let copy = [...title];  //독립적인 복사본을 만들어서 수정해야 함(shallow copy, deep copy 찾아보기)
        copy[0] = '여자 코트 추천';
        updateTitle(copy);

        //reference data type
        //결과가 모두 false인데 왜 모두 false일까... 첫번째는 true 아님?
        console.log(copy == title)
        console.log(copy === title)
      } }>첫번째 제목 수정</button>
      <button onClick={ () => {
        let copy2 = [...title];
        copy2.sort();
        updateTitle(copy2);
      } }>가나다순으로 정렬</button>
      <div className='list'>
        <h4>{ title[0] } <span onClick={ () => { updateLikeCount(likeCount+1) } }>👍</span>{ likeCount }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ title[1] }</h4>
        <p>2월 17일 발행!</p>
      </div>
      <div className='list' onClick={ () =>  {
          if (modal == false) {
            showModal(true);
          } else {
            showModal(false);
          }
        }}>
        <h4>{ title[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      {
        modal == false ? null : <Modal/>
      }
      <PageList/>
    </div>
  );
}

// 동적인 UI 만드는 방법
// 1. HTML, CSS로 변경 후 디자인 미리 완성
// 2. UI의 현재 상태를 state로 저장
// 3. state에 따라 UI가 어떻게 보일지 작성
function Modal() {
  return (
    // Fragment 문법
    // componenet 만들어 html 축약
    // 1. 반복적인 HTML 축약 시
    // 2. 큰 페이지들
    // 3. 자주 변경되는 것들
    // App()의 state 사용 불가
    <>
      <div className='modal'>
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
      <div></div>
    </>
  )
}

// 이렇게 사용 가능
const PageList = () => {
  return (
    <>
      <span>이전</span>
      <ul className="page-list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <span>다음</span>
    </>
  )
}

export default App;
