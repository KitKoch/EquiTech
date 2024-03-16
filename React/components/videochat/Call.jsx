import React, { useState, useCallback, useMemo } from "react";
import Tile from "./Tile";
import PropTypes from "prop-types";
import {
  useParticipantIds,
  useScreenShare,
  useLocalParticipant,
  useDailyEvent,
  DailyAudio,
} from "@daily-co/daily-react";
import UserMediaError from "./UserMediaError";
import { Button } from "react-bootstrap";
import toastr from "toastr";
import "toastr/build/toastr.css";
import "./styles/call.css";
function Call(props) {
  const meetingUrl = props.meetingUrl;

  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });
  const handleCopyClick = () => {
    toastr.success("Link copied to clipboard");
    const textarea = document.createElement("textarea");
    textarea.value = meetingUrl;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const localParticipant = useLocalParticipant();

  const isAlone = useMemo(
    () => remoteParticipantIds?.length < 1 || screens?.length < 1,
    [remoteParticipantIds, screens]
  );

  const renderCallScreen = () => (
    <div className={`${screens.length > 0 ? "is-screenshare" : "call"}`}>
      {/* Your self view */}
      {localParticipant && (
        <Tile id={localParticipant.session_id} isLocal isAlone={isAlone} />
      )}
      {/* Videos of remote participants and screen shares */}
      {remoteParticipantIds?.length > 0 || screens?.length > 0 ? (
        <>
          {remoteParticipantIds.map((id) => (
            <Tile key={id} id={id} />
          ))}
          {screens.map((screen) => (
            <Tile key={screen.screenId} id={screen.session_id} isScreenShare />
          ))}
          <DailyAudio />
        </>
      ) : (
        // When there are no remote participants or screen shares
        <div className="call-container " id="call-window">
          <div className="info-box card-card bg-grey" id="wait-card">
            <h1 className="waiting-h1">Waiting for others</h1>
            <p className="text-100 waiting-h1">
              Invite someone by sharing this link:
            </p>
            <div className="copy-container text-100">
              <span className="room-url waiting-h1">{meetingUrl}</span>
              <div>
                <Button
                  className="btn btn-light mt-2"
                  onClick={handleCopyClick}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  return getUserMediaError ? <UserMediaError /> : renderCallScreen();
}

Call.propTypes = {
  meetingUrl: PropTypes.string.isRequired,
};

export default Call;
