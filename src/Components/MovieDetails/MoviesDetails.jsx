import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const MoviesDetails = () => {
  let [ trendingMovies, setTrendingMovies ] = useState( [] );
  let { id } = useParams();
  let [ isLoading, setIsLoading ] = useState( true );

  async function getDetails ()
  {
    let { data } = await axios.get( `https://api.themoviedb.org/3/movie/${ id }?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US` );
    setTrendingMovies( data );
    // console.log( data );
    setIsLoading( false );
  }

  useEffect(
    () =>
    {
      getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );


  return (
    <>
      {}
      {
        isLoading ? (
          <LoadingScreen />
        ) : (
      <div className="container py-5">
        <div className="row" >
          <div className="col-md-3">
            <img src={ "https://image.tmdb.org/t/p/w500" + trendingMovies?.poster_path } className="w-100" alt="" />
          </div>
          <div className="col-md-9">
            <div className="item">
              <h1>
                { trendingMovies.title } { trendingMovies.name }
              </h1>
              <p>{ trendingMovies?.tagline }</p>
              <ul className="list-unstyled d-flex">
                { trendingMovies?.genres?.map( ( genre, idx ) => (
                  <div className="bg-info p-3 mx-2 rounded-2" key={ idx }>{ genre.name }</div>
                ) ) }
              </ul>
              <p>vote : { trendingMovies?.vote_average }</p>

              <p>vote count : { trendingMovies?.vote_count }</p>
              <p>popularty :{ trendingMovies?.popularity } </p>
              <p>release data : { trendingMovies?.release_date }</p>
              <p>{ trendingMovies?.overview }</p>
            </div>
          </div>
        </div>
      </div> )}
    </>
  );
}

export default MoviesDetails
