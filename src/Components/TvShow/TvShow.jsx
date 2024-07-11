import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
const TvShow = () =>
{
  let [ trendingTvshows, setTrendingTvshows ] = useState( [] );
  let [ currentPage, setCurrentPage ] = useState( 1 );
  let pageList = new Array( 10 ).fill( 0 ).map( ( ele, index ) => index + 1 );
  let [ isloading, setIsLoading ] = useState( true );
  async function getTrendingTvShows ()
  {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US&page=${ currentPage }`
    );

    setTrendingTvshows( data.results );
    setIsLoading( false );
  }

  async function searchTvShows ( e )
  {

    let searchKey = e.target.value;
    if ( searchKey )
    {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US&page=${ currentPage }&query=${ searchKey }&include_adult=true`
      );
      setTrendingTvshows( data.results );
    } else
    {
      getTrendingTvShows();
    }

  }

  function handlePaginate ( page )
  {
    setCurrentPage( page );
  }

  useEffect(
    () =>
    {
      getTrendingTvShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );
  
  // in page length20 -8-4...0 movies, visible = 8 , setVisible =8
  const [ visible, setVisible ] = useState( 8 );

  function showMore ()
  {
    setVisible( visible + 4 );
  }

  return (
    <>
      {
        isloading ? <LoadingScreen /> : <>
          { trendingTvshows != null ? <div className="container">

            <input type="text" onKeyUp={ searchTvShows } className="form-control bg-transparent text-info my-5" placeholder="Search ...." />

            <div className="row mt-5 align-items-center">
              { trendingTvshows.slice(0,visible).map( ( tv, idx ) =>
                <div key={ idx } className="col-md-2">
                  <div className="tv">
                    <Link to={ `/tvshow/details/${ tv.id }` }>
                      <img src={ "https://image.tmdb.org/t/p/w500/" + tv.poster_path } className="w-100" alt={ tv.title } />
                      <h6> { tv.name } </h6>
                    </Link>
                  </div>
                </div>
              ) }
            </div>
            { visible !== trendingTvshows.length ? <button onClick={ showMore } className='btn btn-outline-info fw-bolder w-25 m-auto mt-4 show_more'>Show More</button>
              : '' }
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                { currentPage > 1 ? (
                  <li className="page-item " onClick={ () => handlePaginate( currentPage - 1 ) }>
                    <NavLink to="#" className="page-link bg-transparent text-white">prev</NavLink>
                  </li>
                ) : (
                  ""
                ) }

                { pageList?.map( ( page, idx ) => (
                  <li key={ idx } className="page-item" onClick={ () => handlePaginate( page ) }>
                    <NavLink to="#" className={ page === currentPage ? "bg-info page-link  text-white" : "bg-transparent page-link  text-white" }>{ page }</NavLink>
                  </li>
                ) ) }
                { currentPage < 10 ? (
                  <li className="page-item " onClick={ () => handlePaginate( currentPage + 1 ) }>
                    <NavLink to="#" className="page-link bg-transparent text-white">next</NavLink>
                  </li>
                ) : (
                  ""
                ) }
              </ul>
            </nav>

          </div>
            : <LoadingScreen /> }
        </>
      }
    </>
  );
};

export default TvShow;
