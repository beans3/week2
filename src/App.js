/* eslint-disable */
import './App.css';
import { useState } from 'react';

function formatDate(date) {
  const isoDate = date.toISOString();
  return isoDate.substring(0, 10);
}
function App() {
  const { v4: uuidv4 } = require('uuid');
  //연습용 배열
  const posts = [
    { id: uuidv4(), title: "첫 번째 게시물", date: "2022-01-01", likes: 5, content: "첫 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "두 번째 게시물", date: "2022-02-14", likes: 10, content: "두 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "세 번째 게시물", date: "2022-03-10", likes: 2, content: "세 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "네 번째 게시물", date: "2022-04-20", likes: 8, content: "네 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "다섯 번째 게시물", date: "2022-05-06", likes: 13, content: "다섯 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "여섯 번째 게시물", date: "2022-06-30", likes: 0, content: "여섯 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "일곱 번째 게시물", date: "2022-07-12", likes: 3, content: "일곱 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "여덟 번째 게시물", date: "2022-08-05", likes: 6, content: "여덟 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "아홉 번째 게시물", date: "2022-09-23", likes: 4, content: "아홉 번째 게시물 내용입니다." },
    { id: uuidv4(), title: "열 번째 게시물", date: "2022-10-31", likes: 1, content: "열 번째 게시물 내용입니다." }
  ];
  const today = new Date();
  const formattedDate = formatDate(today); // 예: "2023-04-19"
  let post = 'React Blog';
  let [postList, updatePost] = useState(posts);
  let [modal, showModal] = useState(false);
  let [modalId, setModalId] = useState('');
  let [inputValue, setInputValue] = useState('');

  const updateLikeCount = (id) => {
    // post의 내용을 update한 뒤에
    // updatePost 호출하여 적용
    const updatedPosts = postList.map(post => {
      if (post.id === id) {
        return {...post, likes: post.likes + 1};
      } else {
        return post;
      }
    });
    updatePost(updatedPosts);
  }

  // 포스트 클릭 시 모달 창이 열리게 하는 함수
  const openPost = (id) =>  {
    // 모달창을 클릭할 때 id 값을 넘겨서 ModalId 라는 state 값이 id 값으로 바뀌도록 함
    setModalId(id);
    if (modal == true) {
      showModal(false);
    } else {
      showModal(true);
    }
  }

  const insertPost = (text) => {
    const min = 1;
    const max = 50;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    let data = {
      id: uuidv4(),
      title: (postList.length + 1) + '번째 게시물',
      date: formattedDate,
      likes: randomNumber,
      content: text
    }

    let copy = [...postList, data];
    updatePost(copy);
  }

  const deletePost = (id) => {
    let copy = [...postList]
    copy = copy.filter(post => post.id !== id);
    updatePost(copy);
  }
 
  // state 쓰는 이유 : 일반 변수는 내용이 변경 되어도 html 업데이트가 안됨
  // distructuring 문법
  // let [a, c] = [1, 2]; // a = 1; c = 2;

  return (
    <div className="App">
      <div className='black-nav'>
        <h4 style={{color: '#eee', fontSize: '20px'}}>React Blog🤍</h4>
      </div>
      <h4 id={post}>{post}</h4>
      <button className='btn' onClick={ () => {
        let copy = [...postList];  //독립적인 복사본을 만들어서 수정해야 함(shallow copy, deep copy 찾아보기)
        copy[0].title = '여자 코트 추천';
        updatePost(copy);

        //reference data type
        //결과가 모두 false인데 왜 모두 false일까... 첫번째는 true 아님?
        console.log(copy == copy[0].title)
        console.log(copy === copy[0].title)

        let array1 = [2, 3, 4];
        let array2 = array1.map(function(callback) {
          return callback * 10;
        })
        console.log(array2);
        array1.map(function() {
          console.log(1);
        })
        array1.map(function(callback) {
          console.log(callback);
        })
        
      } }>첫번째 제목 수정</button>
      <button className='btn' onClick={ () => {
        // sort() 메서드에 전달된 비교 함수는 두 개의 요소를 비교하고,
        // 반환값이 0보다 작으면 첫 번째 인수를 앞으로,
        // 0보다 크면 두 번째 인수를 앞으로 정렬합니다.
        // 이때, a와 b는 각각 두 요소를 나타내며,
        // a.title과 b.title은 두 요소의 title 속성을 나타냅니다.
        let copy2 = [...postList].sort((a, b) => a.title.localeCompare(b.title));
        updatePost(copy2);
      } }>가나다순으로 정렬</button>
      {
        // map으로 배열 리스트 반복
        // e.stopPropagation(); 이벤트 버블링 막기
        postList.map(posts => (
            <div key={posts.id}>
              <div className='list'>
                <h4 onClick={ () => openPost(posts.id) }>{ posts.title } <span onClick={ (e) => { e.stopPropagation(); updateLikeCount(posts.id) } }>💜{ posts.likes }</span></h4>
                <p>{posts.content}</p>
                <p className='date'>{ posts.date } 발행</p>
                <button className='btn right' onClick={ () => deletePost(posts.id) }>삭제</button>
              </div>
            </div>
          )
        )
      }
      {
        // postList를 모두 보내되 현재 선택한 posts.id를 modalId에 담아 props로 보냄
        modal == false ? null : <Modal postList={ postList } modalId={ modalId } updatePost={updatePost} color={ 'white' }/>
      }
      <More/>
      <input onChange={(e) => {
          // 완료되기 전에 console.log가 실행됨
          setInputValue(e.target.value);
        }}/>
        <button className='btn' onClick={ () => insertPost(inputValue) }>글 발행</button>
    </div>
  );
}

// 동적인 UI 만드는 방법
// 1. HTML, CSS로 변경 후 디자인 미리 완성
// 2. UI의 현재 상태를 state로 저장
// 3. state에 따라 UI가 어떻게 보일지 작성
function Modal(props) {
  let post = props.postList.find(post => post.id == props.modalId);
  return (
    // Fragment 문법
    // componenet 만들어 html 축약
    // 1. 반복적인 HTML 축약 시
    // 2. 큰 페이지들
    // 3. 자주 변경되는 것들
    // App()의 state 사용 불가
    <>
      <div className='modal' id={post} style={{backgroundColor: props.color}}>
        <h4>{ post.title }</h4>
        <p>{ post.date }</p>
        <p>{ post.content }</p>
        <button className='btn' onClick={ () => {
          let copy = [...props.postList];
          let copyIndex = copy.findIndex(post => post.id === props.modalId);
          copy[copyIndex].title = '제목 변경이당';
          props.updatePost(copy);
        } }>글수정</button>
      </div>
    </>
  )
}

// 이렇게 사용 가능
const More = () => {
  return (
    <div>
      <button className='btn'>더보기</button>
    </div>
  )
}

export default App;