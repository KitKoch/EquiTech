import { React, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, Button } from "react-bootstrap";
import "./podcast-table-style.css";
import podcastService from "../../services/podcastService";
import toastr from "toastr";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Podcast from "./Podcast";
import Swal from "sweetalert2";
import logo from "../../../src/assets/img/fairlyWhiteLogo.png";

const _logger = debug.extend("Podcasts");
function Podcasts() {
  const [pageData, setPageData] = useState({
    allPodcasts: [],
    podcastComponent: [],
    query: "",
  });
  const [audioData, setAudioData] = useState({
    audioSource: logo,
    thumbnail: "",
    title: "Fairly",
    description: "Podcasts",
  });

  const handleAudioData = useCallback((audioData) => {
    setAudioData((prevState) => {
      const pd = { ...prevState };
      pd.audioSource = audioData.url;
      pd.thumbnail = audioData.coverImageUrl;
      pd.title = audioData.title;
      pd.description = audioData.description;
      _logger(audioData.title);
      return pd;
    });
  }, []);

  const onSearchPodcastChange = (event) => {
    _logger("onChange");

    const target = event.target;

    const searchPodcastValue = target.value;

    _logger({ searchPodcastValue });

    setPageData((prevState) => {
      _logger("updated onChange");
      const newPodcastObject = {
        ...prevState,
      };

      newPodcastObject.query = searchPodcastValue;
      newPodcastObject.pageIndex = 0;
      return newPodcastObject;
    });
  };

  useEffect(() => {
    if (pageData.query === "") {
      podcastService.GetAll().then(onGetSuccess).catch(onGetError);
    } else {
      podcastService
        .Search(pageData.query)
        .then(onSearchSuccess)
        .catch(onSearchError);
    }
  }, [pageData.query]);

  const onDeleteRequested = useCallback((podcast) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this podcast can not be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const onDeleteHandler = getDeleteSuccessHandler(podcast.id);
          podcastService
            .Delete(podcast.id)
            .then(onDeleteHandler)
            .catch(onDeleteError);
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire("Error.", "Podcast was not deleted.", "error");
        }
      });
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    return () => {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.allPodcasts = [...pd.allPodcasts];

        const idxOf = pd.allPodcasts.findIndex((podcast) => {
          let result = false;
          if (podcast.id === idToBeDeleted) {
            result = true;
          }

          return result;
        });

        if (idxOf >= 0) {
          pd.allPodcasts.splice(idxOf, 1);
          pd.podcastComponent = pd.allPodcasts.map(mapPodcast);
        }
        return pd;
      });
    };
  };

  const onDeleteError = () => {
    toastr.error("something went wrong");
  };
  const onSearchSuccess = (response) => {
    _logger("response", response.item.pagedItems);
    let podcast = response.item.pagedItems;
    _logger("podcast", podcast);
    setPageData((prevState) => {
      let update = { ...prevState };
      update.allPodcasts = podcast;
      update.podcastComponent = podcast.map(mapPodcast);
      return update;
    });
  };

  const onSearchError = (err) => {
    toastr.error("we got nothing", err);
  };

  const onGetSuccess = (response) => {
    _logger("response", response);
    let podcast = response.items;
    _logger("podcast", podcast);
    setPageData((prevState) => {
      let update = { ...prevState };
      update.allPodcasts = podcast;
      update.podcastComponent = podcast.map(mapPodcast);
      return update;
    });
  };

  const mapPodcast = (aPodcast) => {
    return (
      <Podcast
        podcast={aPodcast}
        key={`aPerson_${aPodcast.id}`}
        onDeleteClicked={onDeleteRequested}
        onAudioDataClicked={handleAudioData}
      />
    );
  };

  const onGetError = (response) => {
    toastr.error("something went wront", response);
  };

  useEffect(() => {
    podcastService.GetAll().then(onGetSuccess).catch(onGetError);
  }, []);

  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    let viewMorePageUrl = `/podcasts/new`;
    navigate(viewMorePageUrl, { state: pageData });
  };
  _logger(onClick);

  return (
    <div className="container col center">
      <div>
        <h3>
          <div className="container">
            <form className="search-bar col-md-2">
              <div className="mb-3">
                <label htmlFor="title" className="form-label"></label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="search"
                  name="search"
                  placeholder="Search..."
                  value={pageData.query}
                  onChange={onSearchPodcastChange}
                />
              </div>
            </form>
          </div>
        </h3>
      </div>
      <h3>Podcasts</h3>
      <Card>
        <div className="container">
          <div className="col md-3">
            <img
              className="player-dimensions podcast-image"
              src={audioData ? `${audioData.audioSource}` : null}
              alt="alt text"
            />
            <h2 className="font-weight-bold">{`${audioData.title}:`}</h2>
            {`${audioData.description}`}
          </div>
          <AudioPlayer
            src={audioData.thumbnail}
            layout="horizontal-reverse"
          ></AudioPlayer>
        </div>
      </Card>
      <Table>
        <thead>
          <tr>
            <th className="text-align-right">Thumbnail</th>
            <th></th>
            <th className="podcast-Header">Title</th>
            <th></th>
            <th></th>
            <th></th>
            <th className="podcast-Header">Description</th>
            <th></th>
            <th></th>
            <th></th>
            <th className="">Date Created</th>
            <th className="dates-podcast">Date Modified</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
      <div className="row table-container">
        <Table>
          <tbody>{pageData.podcastComponent}</tbody>
        </Table>
        <div className="container"></div>{" "}
      </div>{" "}
      <div className="col-3 row">
        <Button onClick={onClick}>Add Podcast</Button>
      </div>
    </div>
  );
}
export default Podcasts;
