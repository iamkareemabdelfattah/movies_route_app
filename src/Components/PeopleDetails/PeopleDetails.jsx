import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function PeopleDetails ()
{
  let [ trendingPeople, setTrendingPeople ] = useState( [] );
  let { id } = useParams();
  let [ isLoading, setIsLoading ] = useState( true );


  async function getDetails ()
  {
    let { data } = await axios.get( `https://api.themoviedb.org/3/person/${ id }?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US&page=1` );
    setTrendingPeople( data );
    setIsLoading( false );
    // console.log( data );
  }

  useEffect( () =>
  {
    getDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );
  return (
    <>
      {
        isLoading ? <LoadingScreen /> : <>
          <div className="container py-5">
            <div className="container row mt-3">
              <div className="col-md-4">
                <img
                  className="w-100"
                  src={ `https://image.tmdb.org/t/p/w500/` + trendingPeople.profile_path }
                  alt={ trendingPeople.name }
                />
              </div>
              <div className="col-md-6">
                <h2 className="my-2">{ trendingPeople.name }</h2>
                <h3 className="h5 my-2">{ trendingPeople.birthday }</h3>
                <p className="mt-4">
                  <span className="text-muted">Place Of Birth :</span>{ " " }
                  { trendingPeople.place_of_birth }
                </p>
                <p>{ trendingPeople.biography?.slice( 1, 800 ) }</p>
                <Link Link className="text-white-50 link" href={ trendingPeople.homepage }>
                  Show details about { trendingPeople.gender === 2 ? "him" : "her" }
                </Link>
              </div>
            </div>
          </div>
        </> }
    </>
  )
}
