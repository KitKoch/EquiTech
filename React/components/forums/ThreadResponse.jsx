import React from "react";
import PropTypes from "prop-types";
import { Plus } from "react-feather";

import debug from "sabio-debug";

function ThreadResponse(props) {
  const tResponse = props.toCard;
  const _logger = debug.extend("Forum Thread Resposnse");

  _logger("Thread props", tResponse);

  const replyBtn = () => {
    props.fromChild(tResponse);
    _logger("Reply button is clicking", tResponse);
  };

  return (
    <>
      <tr>
        <th></th>
        <th>Poster</th>
        <th>Subject</th>
        <th>Reply</th>
      </tr>
      <tr>
        <td></td>
        <td>{tResponse.author.firstName}</td>
        <td>{tResponse.subject}</td>
        <td>
          <Plus onClick={replyBtn} className="align-middle" size={18} />
        </td>
      </tr>
    </>
  );
}

ThreadResponse.propTypes = {
  fromChild: PropTypes.func,
  toCard: PropTypes.shape({
    content: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    author: PropTypes.shape({
      firstName: PropTypes.string,
    }),
  }),
};

export default ThreadResponse;
