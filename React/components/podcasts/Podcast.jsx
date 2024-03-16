import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const _logger = debug.extend("Podcast");
function Podcast(props) {
  const { update } = useParams();
  _logger("allParams being logged", update);
  const navigate = useNavigate();
  const aPodcast = props.podcast;
  const onLocalPodcastClicked = (e) => {
    e.preventDefault();
    props.onDeleteClicked(props.podcast);
  };

  const onLocalEdit = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will update the podcast details!",
      showCancelButton: true,
      confirmButtonText: "Update",
    })
      .then((result) => {
        if (result.isConfirmed) {
          let state = { type: "update", payload: aPodcast };
          _logger("podcast to edit", state);
          navigate(`/podcasts/${aPodcast.id}/edit`, { state });
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire("Error.", "podcast was not updated.", "error");
        }
      });
  };
  const hydrateAudioPlayer = () => {
    props.onAudioDataClicked(aPodcast);
    _logger("attempting to hydrate", aPodcast);
  };
  return (
    <tr key={`List-A ${aPodcast.id}`}>
      <td className="text-md-center" onClick={hydrateAudioPlayer}>
        <img src={aPodcast.url} alt="image" className="cell-dimensions" />
      </td>
      <td></td>
      <td className="text-md-center box-wrapper" onClick={hydrateAudioPlayer}>
        {aPodcast.title}
      </td>
      <td onClick={hydrateAudioPlayer}></td>
      <td onClick={hydrateAudioPlayer}></td>
      <td className="box-wrapper" onClick={hydrateAudioPlayer}>
        {aPodcast.description}
      </td>
      <td onClick={hydrateAudioPlayer}></td>
      <td onClick={hydrateAudioPlayer}></td>
      <td onClick={hydrateAudioPlayer}></td>
      <td className="text-md-center" onClick={hydrateAudioPlayer}>
        {new Date(aPodcast.dateCreated).toLocaleDateString()}
      </td>
      <th></th>
      <th></th>
      <th></th>
      <td className="text-md-center" onClick={hydrateAudioPlayer}>
        {new Date(aPodcast.dateModified).toLocaleDateString()}
      </td>
      <td className="text-md-center">
        <FiEdit
          cursor="pointer"
          className="iconsize"
          onClick={onLocalEdit}
        ></FiEdit>
        <BsFillTrashFill
          cursor="pointer"
          className="iconsize"
          onClick={onLocalPodcastClicked}
        ></BsFillTrashFill>
      </td>
    </tr>
  );
}
Podcast.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
  }),
  onDeleteClicked: PropTypes.func.isRequired,
  onAudioDataClicked: PropTypes.func.isRequired,
};
export default React.memo(Podcast);
