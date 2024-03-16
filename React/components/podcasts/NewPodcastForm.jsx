import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Card } from "react-bootstrap";
import toastr from "toastr";
import FileUploadWidget from "../fileupload/FileUploadWidget";
import { getTypes } from "../../services/lookUpService";
import podcastService from "../../services/podcastService";
import Swal from "sweetalert2";

const _logger = debug.extend("NewPodcastForm");
function NewPodcastForm() {
  const navigate = useNavigate();
  const [podcastFormData, setPodcastFormData] = useState({
    id: "",
    title: "",
    description: "",
    url: "",
    coverImageUrl: "",
    isUpdating: false,
  });
  const [selectOptions, setSelectedOptions] = useState({
    podcastType: [],
  });
  const getThumbnail = (fileReponse, setThumbnail) => {
    _logger("file response", fileReponse[0].url);
    setThumbnail("coverImageUrl", fileReponse[0].url);
  };
  const getUrl = (fileReponse, setUrl) => {
    _logger("file response", fileReponse[0].url);
    setUrl("url", fileReponse[0].url);
  };
  const { state } = useLocation();
  useEffect(() => {
    if (state?.type === "update") {
      setPodcastFormData((prevState) => {
        const newSt = { ...prevState };
        newSt.id = state.payload.id;
        newSt.title = state.payload.title;
        newSt.description = state.payload.description;
        newSt.url = state.payload.url;
        newSt.coverImageUrl = state.payload.coverImageUrl;
        newSt.podcastTypeId = state.payload.podcastTypeId;
        newSt.isUpdating = true;
        return newSt;
      });
      _logger("this is conming in properly", state.payload);
    }
  }, []);

  const mapPodcastType = (podcastType) => {
    return (
      <option value={podcastType.id} key={`podcastType_${podcastType.id}`}>
        {podcastType.name}
      </option>
    );
  };
  const onSubmit = (values) => {
    values.id = values.id;
    values.title = values.title;
    values.description = values.description;
    values.podcastTypeId = values.podcastTypeId;
    values.url = values.url;
    values.coverImageUrl = values.coverImageUrl;
    if (podcastFormData.isUpdating === true) {
      podcastService.Update(values).then(onUpdateSuccess).catch(onUpdateError);
      _logger("Updated", values);
    } else {
      podcastService.Add(values).then(onAddSuccess).catch(onAddError);
    }
  };
  const onUpdateSuccess = (response) => {
    _logger("onUpdateSuccess", response);

    Swal.fire({
      icon: "success",
      title: "Podcast updated!",
      confirmButtonText: "Ok.",
    });

    navigate("/podcasts");
  };
  const onUpdateError = (err) => {
    _logger("onAddError", err);

    Swal.fire({
      icon: "error",
      title: "Nothing Changed",
      confirmButtonText: "Please try again.",
    }).then(navigate("/podcasts"));
  };
  const onAddSuccess = (response) => {
    _logger("onAddSuccess", response);

    Swal.fire({
      icon: "success",
      title: "Podcast added!",
      confirmButtonText: "Ok.",
    });

    navigate("/podcasts");
  };
  const onAddError = (err) => {
    _logger("onAddError", err);

    Swal.fire({
      icon: "error",
      title: "Podcast could not be added.",
      confirmButtonText: "Please try again.",
    });
  };

  useEffect(() => {
    getTypes(["PodcastTypes"]).then(onGetTypesSuccess).catch(onGetTypesError);
  }, []);

  const onGetTypesSuccess = (response) => {
    _logger(response, "lookup success");

    setSelectedOptions((prevState) => {
      const newSt = { ...prevState };
      newSt.podcastType = response.item.podcastTypes.map(mapPodcastType);
      return newSt;
    });
  };
  _logger("blah", setSelectedOptions, mapPodcastType);
  const onGetTypesError = (err) => {
    _logger(err, "lookUp error");

    toastr.error(err);
  };

  return (
    <div className="card-body p-4 p-md-5">
      <h2 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-md-center text-success">
        {podcastFormData.isUpdating === true
          ? "Modify podcast"
          : "Create podcast"}
      </h2>
      <Formik
        enableReinitialize={true}
        initialValues={podcastFormData}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Container>
            <Card>
              <Form>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="title" />
                  Title
                  <Field
                    id="title"
                    component="textarea"
                    className="form-control"
                    name="title"
                    placeholder="Please Enter Title"
                    maxLength={50}
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="podcastTypeId" />
                  Podcast Type
                  <Field
                    id="podcastTypeId"
                    component="select"
                    className="form-control"
                    name="podcastTypeId"
                    placeholder="Please Select Podcast Type"
                  >
                    <option>Please Select Podcast Type</option>
                    {selectOptions.podcastType}
                  </Field>
                  <ErrorMessage
                    name="podcastTypeId"
                    component="div"
                    className="haserror"
                  />
                </div>
                <label className="form-label" htmlFor="title" />
                Description
                <Field
                  id="description"
                  component="textarea"
                  className="form-control"
                  name="description"
                  placeholder="Please Enter description"
                  maxLength={200}
                />
                <Card className="col">
                  <label className="form-label" />
                  Upload thumbnail
                  <FileUploadWidget
                    id="coverImageUrl"
                    name="coverImageUrl"
                    isThumbnail={true}
                    isFileList={true}
                    handleFileChange={(files) => getUrl(files, setFieldValue)}
                    isAlertPopUp={true}
                  />
                </Card>
                <Card className="col">
                  <label className="form-label" />
                  Upload audio file
                  <FileUploadWidget
                    id="url"
                    name="url"
                    isThumbnail={true}
                    isFileList={true}
                    handleFileChange={(files) =>
                      getThumbnail(files, setFieldValue)
                    }
                    isAlertPopUp={true}
                  />
                </Card>
                <button
                  type="submit"
                  className="btn btn-success btn-lg mb-1 float-start"
                >
                  {podcastFormData.isUpdating === true ? "Update" : "Submit"}
                </button>
              </Form>
            </Card>
          </Container>
        )}
      </Formik>
    </div>
  );
}
export default NewPodcastForm;
