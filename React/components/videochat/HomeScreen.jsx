import React from "react";
import PropTypes from "prop-types";
import "./styles/homescreen.css";

function HomeScreen(props) {
  const _logger = debug.extend("homescreen");
  const propCreateCall = props.createCall;

  _logger(propCreateCall);

  const startCall = () => {
    propCreateCall();
  };

  return (
    <div className="home-screen my-3">
      <h1>Fairly Video Chats</h1>
      <p>
        Start a video call with a new unique room by clicking the button below.
      </p>
      <button onClick={startCall} type="button" className="btn btn-primary">
        Click to start a call
      </button>
      <p className="small my-2">
        Select “Allow” to use your camera and mic for this call if prompted
      </p>
    </div>
  );
}

HomeScreen.propTypes = {
  createCall: PropTypes.func.isRequired,
};

export default HomeScreen;
