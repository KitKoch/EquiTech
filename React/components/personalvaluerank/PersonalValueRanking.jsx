import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as lookUpService from "../../services/lookUpService";
import personalValuesService from "../../services/personalValuesService";
import PersonalValueCard from "./PersonalValueCard";
import personalValueSchema from "../../schemas/personalValueSchema";
import toastr from "toastr";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const _logger = debug.extend("PersonalValueRanking");

function PersonalValueRanking() {
  const [formData] = useState({
    personalValue: 0,
    rank: "",
  });

  const [pageData, setPageData] = useState({
    personalValues: [],
    personalValuesComponent: [],
    rank: [],
    rankingResult: [],
    rankingResultComponent: [],
    nextSort: 1,
    total: 0,
  });

  const [isCreated, setIsCreated] = useState(false);
  const [isResorted, setResorted] = useState(false);

  useEffect(() => {
    lookUpService
      .getTypes(["PersonalValues"])
      .then(onGetPVsSuccess)
      .catch(onGetPVsError);
  }, []);

  const onGetPVsSuccess = (response) => {
    let personalValuesArray = response.item.personalValues;
    setPageData((prevSt) => {
      let newSt = { ...prevSt };
      newSt.personalValues = personalValuesArray;
      newSt.personalValuesComponent = personalValuesArray.map(mapPersonalValue);
      newSt.rank = personalValuesArray.map(rankMapper);
      newSt.total = personalValuesArray.length;
      return newSt;
    });
  };

  const rankMapper = (aPersonalValue) => {
    return (
      <option
        value={aPersonalValue.id}
        key={`personalValue_${aPersonalValue.id}`}
      >
        {aPersonalValue.id}
      </option>
    );
  };

  const mapPersonalValue = (aPersonalValue) => {
    return (
      <option
        value={aPersonalValue.id}
        key={`personalValue_${aPersonalValue.id}`}
      >
        {aPersonalValue.name}
      </option>
    );
  };

  const onGetPVsError = (response) => {
    toastr.error("There was an error. Please refresh your page.");
    _logger("onGetPVsError", response);
  };

  useEffect(() => {
    if (pageData.personalValues.length > 0)
      personalValuesService
        .getByUserId()
        .then(onGetByIdSuccess)
        .catch(onGetByIdError);
  }, [isCreated, pageData.personalValues]);

  const onGetByIdSuccess = (response) => {
    let rankingResult = response.items;
    _logger("onGetByIdSuccess", response);
    setPageData((prevSt) => {
      let newSt = { ...prevSt };
      newSt.rankingResult = rankingResult;
      newSt.rankingResultComponent = rankingResult.map(cardMapper);
      newSt.nextSort = rankingResult.length + 1;
      return newSt;
    });
  };

  const onGetByIdError = (response) => {
    toastr.warning("No personal value on record.");
    setPageData((prevSt) => {
      let newSt = { ...prevSt };
      newSt.rankingResult = [];
      newSt.rankingResultComponent = [];
      return newSt;
    });
    _logger("onGetByIdError", response);
  };

  const cardMapper = (aPersonalValue) => {
    return (
      <PersonalValueCard
        record={aPersonalValue}
        total={pageData.total}
        onRemoveClicked={onRemoveClick}
        key={`personalValueCard_${aPersonalValue.id}`}
        id={aPersonalValue.id}
      />
    );
  };

  const extractMapper = (obj) => {
    let newObj = {};
    newObj.PvId = obj.id;
    newObj.Sort = obj.sort;
    return newObj;
  };

  const checkSort = () => {
    let result = false;
    for (let i = 0; i < pageData.personalValues.length; i++) {
      if (pageData.personalValues[i].sort !== i + 1) {
        result = true;
      }
    }
    return result;
  };

  useEffect(() => {
    let checkResult = checkSort();
    if (checkResult) {
      const sortArray = pageData.rankingResult.map(extractMapper);
      personalValuesService
        .updateSort(sortArray)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    }
  }, [isResorted]);

  const onUpdateSuccess = (response) => {
    toastr.success("New sort order saved.");
    _logger("onUpdateSuccess", response);
  };

  const onUpdateError = (error) => {
    toastr.error("There was an error. Please refresh your page.");
    _logger("onUpdateError", error);
  };

  const onRemoveClick = (id) => {
    Swal.fire({
      title: "Are you sure to delete this Personal Value.",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const onSuccess = onDeleteSuccess(id);
        personalValuesService
          .deleteById(id)
          .then(onSuccess)
          .catch(onDeleteError);
      } else {
        Swal.fire("Delete Canceled.");
      }
    });
  };

  const onDeleteSuccess = (id) => {
    setPageData((prevSt) => {
      let newSt = { ...prevSt };
      newSt.rankingResult = newSt.rankingResult.filter((record) => {
        let result = true;
        if (record.id === id) {
          result = false;
        }
        return result;
      });
      newSt.rankingResult = newSt.rankingResult.map(sortMapper);
      newSt.rankingResultComponent = newSt.rankingResult.map(cardMapper);
      newSt.nextSort = newSt.nextSort - 1;
      return newSt;
    });

    setResorted(!isResorted);
    Swal.fire({
      icon: "warning",
      title: "PersonalValue Deleted",
      confirmButtonText: "OK",
    });
  };

  const onDeleteError = (error) => {
    toastr.error("Delete failed. Please try again.");
    _logger("onDeleteError", error);
  };

  const handleSubmitBtn = (inputs, { resetForm }) => {
    const newInputs = { ...inputs, sort: pageData.nextSort };
    _logger("Check sort value: ", newInputs);
    personalValuesService
      .create(newInputs)
      .then(onCreateSuccess)
      .catch(onCreateError);
    resetForm();
  };

  const onCreateSuccess = () => {
    setIsCreated(!isCreated);
    Swal.fire({
      icon: "success",
      title: "New PersonalValue Added",
      confirmButtonText: "Close",
    });
  };

  const onCreateError = (error) => {
    _logger("onCreateError", error);
    Swal.fire({
      icon: "warning",
      title: "Sorry, please try again.",
      confirmButtonText: "Close",
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.rank !== over.rank) {
      setResorted(!isResorted);
      setPageData((prevSt) => {
        let newSt = { ...prevSt };
        const activeIndex = newSt.rankingResult.findIndex(
          (obj) => obj.id === active.id
        );
        const overIndex = newSt.rankingResult.findIndex(
          (obj) => obj.id === over.id
        );
        newSt.rankingResult = arrayMove(
          newSt.rankingResult,
          activeIndex,
          overIndex
        );
        newSt.rankingResult = newSt.rankingResult.map(sortMapper);
        newSt.rankingResultComponent = newSt.rankingResult.map(cardMapper);
        return newSt;
      });
    }
  };

  const sortMapper = (obj, index) => {
    let newObj = { ...obj };
    newObj.rank = index + 1;
    return newObj;
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <h4 className="bm-2">Please Rank Your Personal Preference</h4>
            <Formik
              enableReinitialize={true}
              initialValues={formData}
              onSubmit={handleSubmitBtn}
              validationSchema={personalValueSchema.formSchema}
            >
              <Form>
                <div className="form-group mt-4 col-9">
                  <label htmlFor="personalValue">Personal Preference</label>
                  <Field
                    component="select"
                    name="personalValue"
                    className="form-control mt-2"
                  >
                    <option value="">
                      Please select a Personal Preference
                    </option>
                    {pageData.personalValuesComponent}
                  </Field>
                  <ErrorMessage name="personalValue" component="div" />
                </div>
                <div className="form-group mt-4 mb-2 col-9">
                  <label htmlFor="rank">Ranking</label>
                  <Field
                    component="select"
                    name="rank"
                    className="form-control mt-2"
                  >
                    <option value="">
                      Ranking starts from one as the highest
                    </option>
                    {pageData.rank}
                  </Field>
                  <ErrorMessage name="rank" component="div" />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
          <div className="col-5">
            <DndContext
              collistionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <h4>Your Personal Preference Ranking List</h4>
              <SortableContext
                items={pageData.rankingResult}
                strategy={verticalListSortingStrategy}
              >
                {pageData?.personalValues?.length > 0 &&
                  pageData.rankingResultComponent}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PersonalValueRanking;
