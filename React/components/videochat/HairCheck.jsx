import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  useLocalParticipant,
  useDevices,
  useDaily,
  useDailyEvent,
  DailyVideo,
} from "@daily-co/daily-react";
import UserMediaError from "./UserMediaError";
import "./styles/haircheck.css";

function HairCheck(props) {
  const _logger = debug.extend("haircheck");
  const propJoinCall = props.joinCall;
  const propCancelCall = props.cancelCall;
  const propAddMeetingDetails = props.meetingDetails;

  const localParticipant = useLocalParticipant();
  const {
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
  } = useDevices();
  const callObject = useDaily();

  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const join = (e) => {
    e.preventDefault();
    propJoinCall();

    propAddMeetingDetails(localParticipant.user_id);
    _logger("localParticipant", localParticipant.user_id);
  };

  const updateMicrophone = (e) => {
    setMicrophone(e.target.value);
  };

  const updateSpeakers = (e) => {
    setSpeaker(e.target.value);
  };

  const updateCamera = (e) => {
    setCamera(e.target.value);
  };

  const onChange = (e) => {
    callObject.setUserName(e.target.value);
  };

  return (
    <React.Fragment>
      {getUserMediaError ? (
        <UserMediaError />
      ) : (
        <form className="hair-check" onSubmit={join}>
          <h1>Setup your hardware</h1>
          {/* Video preview */}
          <div className="d-flex justify-content-center align-items-center">
            {localParticipant && (
              <DailyVideo sessionId={localParticipant.session_id} mirror />
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username">Your name:</label>
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={(e) => onChange(e)}
              value={localParticipant?.user_name || " "}
            />
          </div>

          {/* Microphone select */}
          <div>
            <label htmlFor="micOptions">Microphone:</label>
            <select
              name="micOptions"
              id="micSelect"
              onChange={updateMicrophone}
            >
              {microphones?.map((mic) => (
                <option
                  key={`mic-${mic.device.deviceId}`}
                  value={mic.device.deviceId}
                >
                  {mic.device.label}
                </option>
              ))}
            </select>
          </div>

          {/* Speakers select */}
          <div>
            <label htmlFor="speakersOptions">Speakers:</label>
            <select
              name="speakersOptions"
              id="speakersSelect"
              onChange={updateSpeakers}
            >
              {speakers?.map((speaker) => (
                <option
                  key={`speaker-${speaker.device.deviceId}`}
                  value={speaker.device.deviceId}
                >
                  {speaker.device.label}
                </option>
              ))}
            </select>
          </div>

          {/* Camera select */}
          <div>
            <label htmlFor="cameraOptions">Camera:</label>
            <select
              name="cameraOptions"
              id="cameraSelect"
              onChange={updateCamera}
            >
              {cameras?.map((camera) => (
                <option
                  key={`cam-${camera.device.deviceId}`}
                  value={camera.device.deviceId}
                >
                  {camera.device.label}
                </option>
              ))}
            </select>
          </div>

          <button onClick={join} type="submit" className="btn btn-success mt-2">
            Join call
          </button>
          <button
            onClick={propCancelCall}
            className="btn btn-light mt-1"
            type="button"
          >
            Back to start
          </button>
        </form>
      )}
    </React.Fragment>
  );
}

HairCheck.propTypes = {
  joinCall: PropTypes.func.isRequired,
  cancelCall: PropTypes.func.isRequired,
  meetingDetails: PropTypes.func.isRequired,
};

export default HairCheck;
