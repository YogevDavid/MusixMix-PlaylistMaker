import React, { useContext } from 'react';
import { Context } from '../../context';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';
import update from 'update-immutable';
import Select from 'react-select';
ReactModal.setAppElement('#root');

const Track = props => {
  const [state, setState] = useContext(Context);
  const { track } = props;

  //------------------ Setting up Modal-----------------------//

  const tracksID = state.play_list.map(item => ({
    value: item.list_id,
    label: item.track_name
  }));

  const [showModal, hideModal] = useModal(() => {
    return (
      <ReactModal
        isOpen
        style={{
          content: {
            height: 'auto',
            top: '50%',
            left: '50%',
            right: '30%',
            bottom: '10%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '5px solid #ccc',
            borderRadius: '4px',
            padding: '20px'
          }
        }}
      >
        <div className='col-md-12 text-center'>
          <p>
            <strong>
              You Can't Add More Than 19 Track, Delete And Replace Last One?
            </strong>
          </p>
          <button className='btn btn-dark' onClick={hideModal}>
            No!
          </button>
          <button className='btn btn-dark' onClick={popAndAddToPlaylist}>
            Yes!
          </button>
          <p>
            <br />

            <strong> Remove Another Track Instead: </strong>
          </p>
          <form onSubmit={e => removeFromSelect(e)}>
            <Select options={tracksID} />
            <button
              className='btn btn-primary btn-lg btn-block mb-5'
              type='submit'
            >
              Remove
            </button>
          </form>
        </div>
      </ReactModal>
    );
  });

  function addToPlaylist() {
    setState(
      update(state, {
        play_list: {
          $unshift: [
            {
              list_id: state.play_list.length + 1,
              track_id: track.track_id,
              track_name: track.track_name,
              artist_name: track.artist_name,
              album_name: track.album_name,
              album_id: track.album_id,
              track_length: track.track_length
            }
          ]
        }
      })
    );
    hideModal();
  }

  const removeFromSelect = e => {
    setState(update(state, { play_list: { $splice: [[e.value, 1]] } }));
    addToPlaylist();
  };

  function popAndAddToPlaylist() {
    setState(
      update(state, {
        play_list: {
          $set: state.play_list.splice(-1, 1)
        }
      })
    );
    addToPlaylist();
    hideModal();
  }
  //------------------------------------------------------//

  const onClick = () => {
    if (state.play_list.length < 3) {
      addToPlaylist();
    } else {
      showModal();
    }
    return state;
  };

  return (
    <div className='col-md-6'>
      <div className='card mb-4 shadow-sm'>
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
          </p>
          <button
            onClick={onClick}
            id={track.track_id}
            className='btn btn-dark btn-block'
          >
            <i className='fas fa-plus' /> Add Track
          </button>
        </div>
      </div>
    </div>
  );
};

export default Track;
