import React, { useEffect, useState } from 'react';
import home from './home.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { Offline, Online } from "react-detect-offline";
import DetectOffline from '../DetectOffline/DetectOffline';
import DetectOnline from './DetectOnline/DetectOnline';

const Home = () =>
{
  let imgBaseUrl = 'https://image.tmdb.org/t/p/w500';
  let [ trendingMovies, setTrendingMovies ] = useState( [] );
  let [ trendingPeople, setTrendingPeople ] = useState( [] );
  let [ trendingTvshows, setTrendingTvshows ] = useState( [] );
  let [ isLoading, setIsLoading ] = useState( true );

  async function getTrendingItems ( mediaType, callback )
  {
    setIsLoading( true );
    let { data } = await axios.get( `https://api.themoviedb.org/3/trending/${ mediaType }/day?api_key=b83cc031768f2a4781dd594de3d35111` );

    callback( data.results.slice( 0, 10 ) );
    setIsLoading( false );

  }

  useEffect( () =>
  {
    getTrendingItems( 'movie', setTrendingMovies );
    getTrendingItems( 'tv', setTrendingTvshows );
    getTrendingItems( 'person', setTrendingPeople );

  }, [] );

  return (

    <>
      {
        isLoading ? <LoadingScreen /> : <>
          { trendingMovies != null && trendingTvshows != null && trendingPeople != null ? <div className="container">
            <Offline> <DetectOffline /> </Offline>
            <Online> <DetectOnline /> </Online>

            <div className='row my-5'>
              <div className="col-md-4">
                <div>
                  <div className="brdr w-25"></div>
                  <div className={ home.title }>
                    <h2>Trending <br /> Movies  <br /> to watch now</h2>
                    <span className='my-5 text-white'>Most watch movies by days</span>
                  </div>
                  <div className="brdr"></div>
                </div>
              </div>

              {
                trendingMovies.map( ( movie, index ) =>
                  <div className='col-md-2 my-2' key={ index }>
                    <Link to={ `/movies/details/${ movie.id }` }>
                      <img className='w-100' src={ imgBaseUrl + movie.poster_path } alt={ movie.title } />
                      <h2 className='h6 mt-2'>{ movie.title }</h2>
                    </Link>
                  </div>
                ) }

            </div>


            <div className='row my-5'>
              <div className="col-md-4">
                <div>
                  <div className="brdr w-25"></div>
                  <div className={ home.title }>
                    <h2>Trending <br /> TV shows  <br /> to watch now</h2>
                    <span className='my-5 text-white'>Most watch tv shows by days</span>
                  </div>
                  <div className="brdr"></div>
                </div>
              </div>
              { trendingTvshows.map( ( tv, index ) =>
                <div className='col-md-2 my-2' key={ index }>
                  <Link to={ `/tvshow/details/${ tv.id }` }>
                    <img className='w-100' src={ imgBaseUrl + tv.poster_path } alt="tv.title" />
                    <h2 className='h6 mt-2'>{ tv.name }</h2>
                  </Link>
                </div>
              ) }
            </div>

            <div className='row my-5'>
              <div className="col-md-4">
                <div>
                  <div className="brdr w-25"></div>
                  <div className={ home.title }>
                    <h2>Trending <br /> People  <br /> to watch now</h2>
                    <span className='my-5 text-white'>Most watch People by days</span>
                  </div>
                  <div className="brdr"></div>
                </div>
              </div>
              { trendingPeople.map( ( person, index ) =>
                <div className='col-md-2 my-2' key={ index }>
                  <Link to={ `/people/details/${ person.id }` }>

                    <img className='w-100' src={ imgBaseUrl + person.profile_path } alt="people.title" />
                    <h2 className='h6 mt-2'>{ person.name }</h2>
                  </Link>

                </div>
              ) }
            </div>


          </div > : <LoadingScreen /> }
        </>
      }
    </>

  );
};

export default Home;

