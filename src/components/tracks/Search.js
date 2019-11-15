import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context';

const Search = () => {
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState('');
  const [userInputArtist, setUserInputArtist] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    axios
      .get(
        `/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        let track_list = res.data.message.body.track_list;
        setState({
          play_list: state.play_list,
          track_list: track_list,
          heading: 'Search Results'
        });
      })
      .catch(err => console.log(err));
  }, [trackTitle]);

  useEffect(() => {
    axios
      .get(
        `/track.search?q_artist=${artistName}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        let track_list = res.data.message.body.track_list;
        setState({
          play_list: state.play_list,
          track_list: track_list,
          heading: 'Search Results'
        });
      })
      .catch(err => console.log(err));
  }, [artistName]);

  const findTrack = e => {
    e.preventDefault();
    setTrackTitle(userInput);
  };
  const findTrackByArtist = e => {
    e.preventDefault();

    setArtistName(userInputArtist);
  };

  const onChange = e => {
    setUserInput(e.target.value);
  };
  const onChangeArtist = e => {
    setUserInputArtist(e.target.value);
  };

  return (
    <div className='card card-body mb-4 p-4'>
      <h1 className='display-4 text-center'>
        <i className='fas fa-stream ' /> Create A Playlist
      </h1>
      <p className='lead text-center'>Search By Song Title or Artist</p>
      <div className='row'>
        <div className='col-md-12 text-center'>
          <div className='btn-group' role='group'>
            <form onSubmit={findTrack}>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Song title...'
                name='userInput'
                value={userInput}
                onChange={onChange}
              />

              <button
                className='btn btn-primary btn-lg btn-block mb-5'
                type='submit'
              >
                Search by Title
              </button>
            </form>

            <form onSubmit={findTrackByArtist}>
              <input
                type='text'
                className='form-control form-control-lg'
                placeholder='Artist name...'
                name='userInput'
                value={userInputArtist}
                onChange={onChangeArtist}
              />
              <button
                className='btn btn-primary btn-lg btn-block mb-5'
                type='submit'
              >
                Search by Artist
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
