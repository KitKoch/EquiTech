import React, { useState, useEffect, useCallback } from "react";
import HairCheck from "./HairCheck";
import DailyIframe from "@daily-co/daily-js";
import HomeScreen from "./HomeScreen.jsx";
import PropTypes from "prop-types";
import videoChatService from "../../services/videoChatService";
import videoChatStatistics from "../../services/videoChatStatistics";
import Tray from "./Tray";
import Call from "./Call";
import toastr from "toastr";
import "./styles/videochat.css";
import "toastr/build/toastr.css";
import { DailyProvider } from "@daily-co/daily-react";

function Videochat(props) {
  const _logger = debug.extend("videochat");

  const STATE_IDLE = "STATE_IDLE";
  const STATE_CREATING = "STATE_CREATING";
  const STATE_JOINING = "STATE_JOINING";
  const STATE_JOINED = "STATE_JOINED";
  const STATE_LEAVING = "STATE_LEAVING";
  const STATE_ERROR = "STATE_ERROR";
  const STATE_HAIRCHECK = "STATE_HAIRCHECK";

  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    Id: 0,
    HostId: 0,
    DailyId: 0,
    RoomName: "",
    Duration: 0,
  });

  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event) {
      _logger(event);
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(STATE_JOINED);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case "error":
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    }

    handleNewMeetingState();

    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  const createCall = () => {
    const randomString = Math.random().toString(36).substring(7);
    const roomName = `Fairly-${randomString}`;

    setAppState(STATE_CREATING);

    let payload = {
      name: roomName,
      privacy: 1,
      properties: {
        StartAudioOff: false,
        StartVideoOff: false,
        EnableChat: true,
        Exp: 3600,
      },
    };

    videoChatService
      .getNewVideoChat(payload)
      .then(onCreateNewRoomSuccess)
      .catch(onCreateNewRoomError);
  };

  const onCreateNewRoomError = (err) => {
    _logger("createVideoChat error", err);
    setApiError(false);
  };

  const onCreateNewRoomSuccess = (data) => {
    _logger("createVideoChat success data", data.item);

    const initialTime = new Date().getTime();
    setMeetingDetails((prevState) => {
      let newState = { ...prevState };
      newState.Id = data.item.id;
      newState.HostId = props.currentUser.id;
      newState.RoomName = data.item.name;
      newState.Duration = initialTime;

      return newState;
    });

    setAppState(STATE_HAIRCHECK);
    setRoomUrl(data.item.url);
    setCallObject(null);
    startHairCheck(data.item.url);
    toastr.success("Video Chat Room Created.");
  };

  const addMeetingDetails = (DailyId) => {
    setMeetingDetails((prevState) => {
      let newState = { ...prevState };

      newState.DailyId = DailyId;

      return newState;
    });
  };

  const startHairCheck = useCallback(async (url) => {
    const newCallObject = DailyIframe.createCallObject();
    setRoomUrl(url);
    setCallObject(newCallObject);
    setAppState(STATE_HAIRCHECK);
    await newCallObject.preAuth({ url });
    await newCallObject.startCamera();
  }, []);

  const joinCall = useCallback(() => {
    callObject.join({ url: roomUrl });
  }, [callObject, roomUrl]);

  const onInsertMeetingDetailsSuccess = (response) => {
    _logger(" Insert Meeting Details Success", response);
  };

  const onInsertMeetingDetailsError = (response) => {
    _logger(" Insert Meeting Details Error", response);
  };

  const startLeavingCall = useCallback(() => {
    if (!callObject) return;

    if (appState === STATE_ERROR) {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        setAppState(STATE_IDLE);
      });
    } else {
      setAppState(STATE_LEAVING);
      callObject.leave();
      const endTime = new Date().getTime();
      const duration = Math.round((endTime - meetingDetails.Duration) / 1000);

      setMeetingDetails((prevState) => {
        let newState = { ...prevState };
        newState.Duration = duration;
        return newState;
      });

      const payload = {
        HostId: meetingDetails.HostId,
        DailyId: meetingDetails.DailyId,
        RoomName: meetingDetails.RoomName,
        Duration: duration,
      };

      videoChatStatistics
        .insertMeetingDetails(payload)
        .then(onInsertMeetingDetailsSuccess)
        .catch(onInsertMeetingDetailsError);
    }
  }, [callObject, appState]);

  const showCall =
    !apiError && [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(appState);

  const showHairCheck = !apiError && appState === STATE_HAIRCHECK;
  const renderApp = () => {
    if (apiError) {
      return (
        <div className="api-error">
          <h1>Error</h1>
          <p>
            Room could not be created. Check if your `.env` file is set up
            correctly. For more information, see the{" "}
            <a href="https://github.com/daily-demos/custom-video-daily-react-hooks#readme">
              readme
            </a>{" "}
          </p>
        </div>
      );
    }

    if (showHairCheck) {
      return (
        <div>
          <DailyProvider callObject={callObject}>
            <HairCheck
              joinCall={joinCall}
              cancelCall={startLeavingCall}
              meetingDetails={addMeetingDetails}
            />
          </DailyProvider>
        </div>
      );
    }
    if (showCall) {
      return (
        <DailyProvider callObject={callObject}>
          <Tray leaveCall={startLeavingCall} />
          <Call meetingUrl={roomUrl} />
        </DailyProvider>
      );
    }
    return (
      <div className="homescreen container">
        <HomeScreen createCall={createCall} />
      </div>
    );
  };
  return (
    <React.Fragment>
      <div className="video-app">{renderApp()}</div>
    </React.Fragment>
  );
}

Videochat.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Videochat;
