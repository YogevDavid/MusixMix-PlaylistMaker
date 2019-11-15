import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

const TrackInfo = props => {
  const [track, setTrack] = useState({});
  const [trackInfo, setTrackInfo] = useState({});

  useEffect(() => {
    axios
      .get(
        `/track.lyrics.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        let trackInfo = res.data.message.body.lyrics;
        setTrackInfo({ trackInfo });

        return axios.get(
          `/track.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        let track = res.data.message.body.track;
        setTrack({ track });
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  if (
    track === undefined ||
    trackInfo === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(trackInfo).length === 0
  ) {
    return <Spinner />;
  } else {
    console.log(track.track);
    return (
      <>
        <ul className='container p-2'>
          <Link to='/' className='btn btn-dark btn-sm mb-4'>
            Go Back
          </Link>
          <div className='card'>
            <h5 className='card-header'>
              {track.track.track_name} by{' '}
              <span className='text-secondary'>{track.track.artist_name}</span>
            </h5>
            <div className='card-body'>
              <p className='card-text'>{trackInfo.trackInfo.lyrics_body}</p>
            </div>
          </div>

          <ul className='list-group mt-3'>
            <li className='list-group-item'>
              <strong>Album Name</strong>: {track.track.album_name}
            </li>
            <li className='list-group-item'>
              <strong>Song Genre</strong>:{' '}
              {track.track.primary_genres.music_genre_list.length === 0
                ? 'NO GENRE AVAILABLE'
                : track.track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name}
            </li>
            <li className='list-group-item'>
              <strong>Explicit Words</strong>:{' '}
              {track.track.explicit === 0 ? 'No' : 'Yes'}
            </li>
            <li className='list-group-item'>
              <strong>Release Date</strong>:{' '}
              <Moment format='MM/DD/YYYY'>
                {track.track.first_release_date}
              </Moment>
            </li>
            <li className='list-group-item'>
              <strong>Track Rating</strong>: {track.track.track_rating}
            </li>
          </ul>
        </ul>
      </>
    );
  }
};

export default TrackInfo;
