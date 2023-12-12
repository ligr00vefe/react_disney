import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components';
// import axios from 'axios'
import axiosCustom from '../api/axios'
import requests from '../api/request'

import "./Banner.css";


const Banner = () => {

  const [ movie, setMovie ] = useState([]);
  const [ isClicked, setIsClicked ] = useState(false);

  useEffect(() => {
    fetchData();  
  }, [])
  
const fetchData = async () => {
  // 현재 상영중인 영화 정보를 가져오기(여러 영화)
  const response = await axiosCustom.get(requests.fetchNowPlaying);
  // console.log(response);

  // 여러 영화 중 영화 하나의 ID를 가져오기
  const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id;

  // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
  const { data: movieDetail } = await axiosCustom.get(`movie/${movieId}`, {
    params: { append_to_response: "videos" }
  });
  // console.log('movieDetail: ', movieDetail);
  setMovie(movieDetail);
}

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }

  
  if(isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(false)}>X</button>
      </>
    )  
  }else {
    return (
      <header 
        className="banner"
        style={{ 
          background: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path}) top center / cover`
        }}
      > 
        <div className="banner__contents">
          <h1 className="banner__title">
            { movie.title || movie.name || movie.original_name }
          </h1>
  
          <div className="banner__buttons">
            { movie?.videos?.results?.key &&
              <button 
                className="banner__button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            }
          </div>
          <h1 className="banner__description">
            { truncate(movie.overview, 100) }
          </h1>       
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    )
  }  
}

export default Banner



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1; 
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;