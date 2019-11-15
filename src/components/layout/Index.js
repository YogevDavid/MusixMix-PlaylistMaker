import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';
import Sort from '../tracks/Sort';
import Playlists from '../playlists/Playlists';

const Index = () => {
  return (
    <div className='container p-2'>
      <Search />
      <Sort />
      <div className='row'>
        <div className='col-md-8 border bg-light'>
          <Tracks />
        </div>
        <div className='col-md-4 border'>
          <Playlists />
        </div>
      </div>
    </div>
  );
};

export default Index;
