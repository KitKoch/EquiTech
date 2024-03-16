import React from "react";
import "./styles/tile.css";
import { DailyVideo } from "@daily-co/daily-react";
import PropTypes from "prop-types";

function Tile(props) {
  const _logger = debug.extend("tile");

  const propId = props.id;
  const propIsScreenShare = props.isScreenShare;

  _logger("propIsScreenShare", propIsScreenShare);
  _logger("propId", propId);

  let containerCssClasses = propIsScreenShare
    ? "tile-screenshare"
    : "tile-video";

  return (
    <div className={containerCssClasses}>
      <DailyVideo automirror sessionId={propId} mirror />
    </div>
  );
}

Tile.propTypes = {
  id: PropTypes.string.isRequired,
  isScreenShare: PropTypes.bool,
};

export default Tile;
