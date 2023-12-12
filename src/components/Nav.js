import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components'
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { setUser, removeUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Nav = () => {

  const [ show, handleShow ] = useState(false);
  const { pathname } = useLocation();
  const [ searchValue, setSearchValue ] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // 초기 로그인 정보 localStorage에서 불러오기 - redux로 대체
  // const initialUserData = localStorage.getItem("userData") ?
  //   JSON.parse(localStorage.getItem("userData")) : {};

  // useState - redux로 대체
  // const [ userData, setUserData ] = useState(initialUserData);

  // useDispatch 선언
  const dispatch = useDispatch();

  // redux store에서 데이터 불러오기
  const userData = useSelector(state => state.user);

  // 로그인 체크
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      // console.log('user: ' + user);

      if (user) {
        // 메인 페이지에서만 로그인 체크
        if(pathname === '/') {
          navigate('/main');
        }
      } else {
        navigate('/');
      }
    });  
  }, [auth, navigate, pathname]);
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    // console.log('e.target.value: ', e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  // console.log('pathname: ', pathname);
  // console.log('useLocation.search', useLocation().search);

  // 로그인 팝업 호출
  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      // console.log('result: ', result);

      // redux로 대체
      // setUserData(result.user);

      dispatch(setUser({
        id: result.user.uid,
        email: result.user.email,
        photoURL: result.user.photoURL,
        displayName: result.user.displayName,
      }))

      // 객체 데이터는 문자열로 변환하여 locaStorage에 저장 - redux로 대체
      // localStorage.setItem('userData', JSON.stringify(result.user)); 
    })
    .catch(error => {
      console.log('error: ', error);
    });
  }

  // 로그아웃
  const handleLogOut = () => {
    signOut(auth).then(() => {
      // useState 초기화 - redux로 대체
      // setUserData({});

      // redux 데이터 초기화
      dispatch(removeUser());

      navigate('/');
      localStorage.removeItem('userData');
    }).catch((error) => {
      alert(error.message);
    });
  }

  return (
    <NavWrapper show={show}>
      <Logo>
        <img src="/images/logo.svg" alt="Disney Plus Logo" onClick={() => (window.location.href = "/")} />
      </Logo>

      { 
        pathname === "/" ? 
        (<Login onClick={handleAuth}>Login</Login>) : 
        <>
          <Input 
            value={ searchValue }
            onChange={ handleChange }
            className="nav__input" 
            type="text" 
            placeholder="검색해주세요."
          /> 

          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleLogOut}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>        
      }
    </NavWrapper>
  )
}

export default Nav


const Login = styled.a`
  background: rgba(0,0,0,.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all .2s ease 0s;
  cursor:pointer;

  &:hover {
    background:#f9f9f9;
    color:gray;
    border-color:transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left:50%;
  transform: translate(-50%, 0);
  background: rgba(0,0,0, .582);
  border-radius: 5px;
  color:#fff;
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav`
    position: fixed;
    top:0;
    left:0;
    right:0;
    height: 70px;
    background: ${props => props.show ? '#090b13' : 'transparent'};
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
  `;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size:0;
  display: inline-block;
  cursor:pointer;

  img {display: block;width:100%;}
`;

// 로그아웃 styled


const UserImg = styled.img`
  width:100%;
  height:100%;
  border-radius: 50%;
`;

const DropDown = styled.div`
  position:absolute;
  top:4.8rem;
  right:0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 0.4rem;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 1rem;
  font-size:1.4rem;
  letter-spacing: 0.3rem;
  opacity:0;

  span {
    white-space: nowrap;
  }  
`;

const SignOut = styled.div`
  position:relative;
  width:4.8rem;
  height:4.8rem;
  display:flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  } 
`;