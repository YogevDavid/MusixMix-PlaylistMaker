import React, { useContext } from 'react';
import Select from 'react-select';
import { Context } from '../../context';

const Sort = () => {
  const [state, setState] = useContext(Context);

  const selectOptions = [
    {
      value: 'track_name',
      label: 'Track Name'
    },
    {
      value: 'artist_name',
      label: 'Artist Name'
    },
    {
      value: 'album_name',
      label: 'Album Name'
    },
    {
      value: 'track_length',
      label: 'Track Length'
    },
    {
      value: 'list_id',
      label: 'Default (By Order Added)'
    }
  ];

  const sortBy = e => {
    switch (e.value) {
      case 'track_name':
        return setState(
          Object.assign({}, state, {
            play_list: state.play_list.sort((a, b) =>
              a.track_name > b.track_name ? 1 : -1
            )
          })
        );
      case 'artist_name':
        return setState(
          Object.assign({}, state, {
            play_list: state.play_list.sort((a, b) =>
              a.artist_name > b.artist_name ? 1 : -1
            )
          })
        );
      case 'album_name':
        return setState(
          Object.assign({}, state, {
            play_list: state.play_list.sort((a, b) =>
              a.album_name > b.album_name ? 1 : -1
            )
          })
        );
      case 'track_length':
        return setState(
          Object.assign({}, state, {
            play_list: state.play_list.sort((a, b) =>
              a.track_length > b.track_length ? 1 : -1
            )
          })
        );
      case 'list_id':
        return setState(
          Object.assign({}, state, {
            play_list: state.play_list.sort((a, b) =>
              a.list_id > b.list_id ? -1 : 1
            )
          })
        );
      default:
        return state;
    }
  };

  return (
    <div className='container m-2 p-4 border bg-light'>
      <p className='lead text-center'>
        <strong>Sort Your Playlist By:</strong>
      </p>
      <Select options={selectOptions} onChange={e => sortBy(e)} />
    </div>
  );
};

export default Sort;
