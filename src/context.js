import React, { useState, useEffect } from 'react';
import axios from 'axios';
import update from 'update-immutable';

export const Context = React.createContext();

export function ContextController({ children }) {
  const localData = localStorage.getItem('initialState');

  let intialState = localData
    ? JSON.parse(localData)
    : { play_list: [], track_list: [], heading: '' };
  const [state, setState] = useState(intialState);

  useEffect(() => {
    localStorage.setItem('initialState', JSON.stringify(state));
    axios
      .get(
        `/chart.tracks.get?page=1&page_size=10&country=il&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        setState(
          update(state, {
            play_list: [],
            track_list: { $set: res.data.message.body.track_list },
            heading: 'Top Search Results'
          })
        );
      })
      .catch(err => console.log(err));
  }, [state]);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}
