import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import update from 'update-immutable';
import { Context } from '../../context';

const Playlist = props => {
  const [state, setState] = useContext(Context);
  const [albumCover, setAlbumCover] = useState({});
  const { track } = props;

  useEffect(() => {
    axios
      .get(
        `/album.get?album_id=${track.album_id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        let albumCover = res.data.message.body.album.album_coverart_100x100;
        console.log(res.data.message.body);
        setAlbumCover({ albumCover });
      })
      .catch(err => console.log(err));
  }, [track.album_id]);

  function deleteTrack() {
    setState(update(state, { play_list: { $splice: [[props.id, 1]] } }));
  }
  return (
    <div className='col-md-12'>
      <div className='card mb-4 shadow-sm '>
        <div className='card-body'>
          <h5>{track.artist_name}</h5>
          <p className='card-text'>
            <strong>
              <i className='fas fa-play' /> Track
            </strong>
            : {track.track_name}
            <br />
            <strong>
              <i className='fas fa-compact-disc' /> Album
            </strong>
            : {track.album_name}
            <br />
            {!albumCover ? (
              <img src={albumCover} alt='' />
            ) : (
              <strong>
                <i className='fas fa-layer-group' /> No Cover
              </strong>
            )}
          </p>
          <Link
            to={`/trackinfo/${track.track_id}`}
            className='btn btn-dark btn-block'
          >
            <i className='fas fa-info-circle' /> Track Info
          </Link>
          <button
            id={track.track_id}
            onClick={deleteTrack}
            className='btn btn-danger btn-block'
          >
            <i className='far fa-minus-square' /> Delete Track
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
