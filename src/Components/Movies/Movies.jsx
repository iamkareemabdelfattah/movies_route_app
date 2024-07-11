import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import LoadingScreen from './../LoadingScreen/LoadingScreen';

const Movies = () =>
{
  let [ trendingMovies, setTrendingMovies ] = useState( [] );
  let [ currentPage, setCurrentPage ] = useState( 1 );
  let pageList = new Array( 10 ).fill( 0 ).map( ( ele, index ) => index + 1 );
  const [ isLoading, setIsLoading ] = useState( true );
  console.log( currentPage )
  async function getTrendingMovies ()
  {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US&page=${ currentPage }`
    );

    setTrendingMovies( data.results );
    setIsLoading( false );
    // console.log( data.results );
  }

  async function searchMovies ( e )
  {

    let searchKey = e.target.value;
    if ( searchKey )
    {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US&page=${ currentPage }&query=${ searchKey }&include_adult=true`
      );
      setTrendingMovies( data.results );
    } else
    {
      getTrendingMovies();
    }
  }

  function handlePaginate ( currentPage )
  {
    setCurrentPage( currentPage );
  }

  useEffect(
    () =>
    {
      getTrendingMovies( currentPage );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );
  // in page length20 -8-4...0 movies, visible = 8 , setVisible =8
  const [ visible, setVisible ] = useState( 8 )

  function showMore ()
  {
    setVisible( visible + 4 )
  }

  return (
    <>
      { trendingMovies  ? <div className="container">

        <input type="text" onKeyUp={ searchMovies } className="form-control bg-transparent text-info my-5" placeholder="Search ...." />
        { isLoading ? (
          <LoadingScreen />
        ) : (
            <div className="row mt-5 align-items-center">
              {/* 20 show movies from 0 : 8 = show 8 real */}
              { trendingMovies.slice( 0, visible ).map( ( movie, idx ) =>
              <div key={ idx } className="col-md-2">
                <div className="movie">
                  <Link to={ `/movies/details/${ movie.id }` }>
                    <img src={ "https://image.tmdb.org/t/p/w500/" + movie.poster_path } className="w-100" alt={ movie.title } />
                    <h6> { movie.title } </h6>
                  </Link>
                  </div>
                </div>

              ) }
              
          </div>
        ) }
          { visible !== trendingMovies.length ? <button onClick={ showMore } className='btn btn-outline-info fw-bolder w-25 m-auto mt-4 show_more'>Show More</button>
            : '' }
        { isLoading ? (
          <LoadingScreen />
        ) : (
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              { currentPage > 1 ? (
                <li className="page-item " onClick={ () => handlePaginate( currentPage - 1 ) }>
                  <NavLink className="page-link bg-transparent text-white">prev</NavLink>
                </li>
              ) : (
                ""
                ) }
                

              { pageList?.map( ( page, idx ) => (
                <li key={ idx } className="page-item" onClick={ () => handlePaginate( page ) }>
                  <NavLink className={ page === currentPage ? "bg-info page-link  text-white" : "bg-transparent page-link  text-white" }>{ page }</NavLink>
                </li>
              ) ) }
              { currentPage < 10 ? (
                <li className="page-item " onClick={ () => handlePaginate( currentPage + 1 ) }>
                  <NavLink className="page-link bg-transparent text-white">next</NavLink>
                </li>
              ) : (
                ""
              ) }
            </ul>
          </nav>
        ) }
      </div> : <LoadingScreen /> }
    </>
  );
};

export default Movies;
