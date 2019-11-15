import React, { useContext } from 'react';
import { Context } from '../../context';
import Spinner from '../layout/Spinner';
import Playlist from './Playlist';

const Playlists = () => {
  const [state] = useContext(Context);
  const { play_list } = state;

  if (play_list === undefined || play_list.length === 0) {
    return (
      <div>
        <h3 className='text-center mb-4'>No Playlist Yet</h3>
        <h3 className='text-center mb-4'>Add a Track to Start</h3>
        <Spinner />
      </div>
    );
  } else {
    return (
      <>
        <h3 className='text-center mb-4'>Your Playlist</h3>
        <div className='row'>
          {play_list.map((item, index) => (
            <Playlist key={index} id={index} track={item} />
          ))}
        </div>
      </>
    );
  }
};

export default Playlists;
