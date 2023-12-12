import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axiosCustom from '../../api/axios';
import { useDebounce } from '../../hooks/useDebounce';

import './SearchPage.css';

const SearchPage = () => {

  const navigate = useNavigate();
  const [ searchResults, setSearchResults ] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  let query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if(debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axiosCustom.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(response.data.results);
      console.log('response: ', response);
    }catch (error) {
      console.log(error);
    }
  }
  

  if(searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
          return (
            <div className="movie" key={movie.id}>
              <div className="movie__column-poster" onClick={() => navigate(`/${movie.id}`)}>
                <img src={movieImageUrl} alt="movie" className="movie__poster" />
              </div>
            </div>
          )
        })}
      </section>
    )
  }else {
    return (
      <section className="no-results">
        <div className="no-results__text ">
          <p>
            찾고자하는 검색어 "{searchTerm}"에 일치하는 영화가 없습니다.
          </p>
        </div>
      </section>
    )
  }

  
}

export default SearchPage