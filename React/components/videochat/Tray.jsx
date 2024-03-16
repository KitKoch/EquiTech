import React, { useCallback, useState } from "react";
import {
  useDaily,
  useScreenShare,
  useVideoTrack,
  useAudioTrack,
  useDailyEvent,
  useLocalSessionId,
} from "@daily-co/daily-react";
import PropTypes from "prop-types";
import MeetingInformation from "./MeetingInformation.jsx";
import Chat from "./Chat.jsx";
import "./styles/tray.css";
import {
  CameraOn,
  Leave,
  CameraOff,
  MicrophoneOff,
  MicrophoneOn,
  Screenshare,
  ChatIcon,
  ChatHighlighted,
} from "./icons/Index";

function Tray({ leaveCall }) {
  const callObject = useDaily();
  const _logger = debug.extend("tray");
  _logger("callObject", callObject);

  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();

  const [showMeetingInformation] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [newChatMessage, setNewChatMessage] = useState(false);

  const localSessionId = useLocalSessionId();

  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  /* When a remote participant sends a message in the chat, we want to display a differently colored
   * chat icon in the Tray as a notification. By listening for the `"app-message"` event we'll know
   * when someone has sent a message. */
  useDailyEvent(
    "app-message",
    useCallback(() => {
      /* Only light up the chat icon if the chat isn't already open. */
      if (!isChatVisible) {
        setNewChatMessage(true);
      }
    }, [isChatVisible])
  );

  const toggleVideo = useCallback(() => {
    callObject.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    callObject.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleScreenShare = () =>
    isSharingScreen ? stopScreenShare() : startScreenShare();

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
    if (newChatMessage) {
      setNewChatMessage(!newChatMessage);
    }
  };

  return (
    <div className="tray">
      {showMeetingInformation && <MeetingInformation />}
      {/*  The chat messages 'live' in the <Chat/> component's state. We can't just remove the component */}
      {/*  from the DOM when hiding the chat, because that would cause us to lose that state. So we're */}
      {/*  choosing a slightly different approach of toggling the chat: always render the component, but only */}
      {/*  render its HTML when showChat is set to true. */}
      <Chat
        isChatVisible={isChatVisible}
        toggleChat={toggleChat}
        className="mt-5"
      />
      <div className="card tray-buttons-container" id="traycard">
        <div className="controls">
          <button onClick={toggleVideo} type="button" className="tray-button">
            {mutedVideo ? <CameraOff /> : <CameraOn />}
            {mutedVideo ? "Turn camera on" : "Turn camera off"}
          </button>
          <button onClick={toggleAudio} type="button" className="tray-button">
            {mutedAudio ? <MicrophoneOff /> : <MicrophoneOn />}
            {mutedAudio ? "Unmute mic" : "Mute mic"}
          </button>
          <button
            onClick={toggleScreenShare}
            type="button"
            className="tray-button"
          >
            <Screenshare />
            {isSharingScreen ? "Stop sharing screen" : "Share screen"}
          </button>
          <button onClick={toggleChat} type="button" className="tray-button">
            {newChatMessage ? <ChatHighlighted /> : <ChatIcon />}
            {isChatVisible ? "Hide chat" : "Show chat"}
          </button>

          <button onClick={leaveCall} type="button" className="tray-button">
            <Leave /> Leave call
          </button>
        </div>
      </div>
    </div>
  );
}
Tray.propTypes = {
  leaveCall: PropTypes.func.isRequired,
};

export default Tray;
