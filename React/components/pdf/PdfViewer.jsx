import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import * as pdfLib from "pdfjs-dist";
import { selectAll } from "../../services/skillService";
import * as lookupService from "../../services/lookUpService";
import userSkillService from "../../services/userSkillServices";
import FieldArrayGenerator from "./FieldArrayGenerator";
import toastr from "toastr";
import "./pdfviewer.css";

const defaultSkillShape = {
  skillId: 0,
  skillName: "",
  experienceLevelId: 0,
  years: 0,
  months: 0,
};

const PdfViewer = (props) => {
  const _logger = debug.extend("pdf");
  const [extractedPdfData, setExtractedPdfData] = useState({
    education: [],
    educationText: "",
    textData: [],
    highlightedData: [],
    canvas: [],
    matchedSkills: [],
    skillNames: [],
  });
  const [experienceLevelOptions, setExperienceLevelOptions] = useState([]);
  const [allSkillsArr, setAllSkillsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pdfUrl = props.url;

  const extractTextFromPage = async (page) => {
    const textContent = await page.getTextContent();
    const textItems = textContent?.items?.map((item) => item.str);

    if (textItems === undefined) {
      return "Text Items undefined";
    }

    return textItems.join(" ");
  };

  const highlightKeywords = (dataArr, skillsArr) => {
    const keywords = skillsArr.map((skill) => {
      let skillName = skill.skillName;
      return skillName;
    });

    const matchedSkills = [];
    const mappedData = dataArr.map((text, index) => {
      const words = text.split(" ");

      return (
        <p key={index}>
          {words.map((word, index) => {
            const lowercaseWord = word.toLowerCase();
            if (keywords.includes(lowercaseWord)) {
              // pocket skill if found for field array
              let skillObject = { ...defaultSkillShape };
              skillObject.skillName = word;
              matchedSkills.push(skillObject);
              // highlighter
              return (
                <span key={index} className="highlighted-keyword">
                  {word}{" "}
                </span>
              );
            } else if (lowercaseWord === "education") {
              let startIndex = index;
              if (startIndex < 0) {
                startIndex = 0;
              }
              const endIndex = index + 100;
              const extractedText = words
                .slice(startIndex, endIndex + 1)
                .join(" ");

              setExtractedPdfData((prevState) => {
                let newState = { ...prevState };
                newState.education.push(<p key={index}>{extractedText}</p>);
                newState.educationText = extractedText;
                return newState;
              });

              return (
                <span key={index} className="highlighted-keyword">
                  {word}{" "}
                </span>
              );
            } else if (isDate(word)) {
              return (
                <span key={index} className="highlighted-keyword">
                  {word}{" "}
                </span>
              );
            } else {
              return word + " ";
            }
          })}
        </p>
      );
    });
    setExtractedPdfData((prevState) => {
      let newState = { ...prevState };

      newState.matchedSkills = matchedSkills;
      newState.skillNames = matchedSkills.map((skill) => {
        let skillsObj = {
          skillName: skill.skillName,
          experienceLevel: "",
        };

        return skillsObj;
      });

      return newState;
    });
    return mappedData;
  };

  const isDate = (word) => {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/;
    return dateRegex.test(word);
  };

  const mappingSkills = (skill) => {
    let skillObject = { ...defaultSkillShape };
    skillObject.skillId = skill.id;
    skillObject.skillName = skill.name.toLowerCase();

    return skillObject;
  };

  const onGetSkillsSuccess = (response) => {
    let skills = response.items;
    let skillsArr = skills.map(mappingSkills);
    setAllSkillsArr(skillsArr);
  };

  const onGetSkillsError = (error) => {
    _logger(error, "onGetSkillsError");
  };

  const onExperienceSuccess = (response) => {
    let experienceLevels = response.items.map((record) => {
      let shapedRecord = {
        value: record.id,
        label: record.name,
      };

      return shapedRecord;
    });
    setExperienceLevelOptions(experienceLevels);
  };

  const onExperienceError = (error) => {
    _logger(error, "onExperienceError");
  };

  useEffect(() => {
    if (pdfUrl !== "") {
      selectAll().then(onGetSkillsSuccess).catch(onGetSkillsError);
      lookupService
        .get3Col("ExperienceLevels")
        .then(onExperienceSuccess)
        .catch(onExperienceError);
    }
  }, []);

  useEffect(() => {
    if (allSkillsArr.length > 0) {
      renderPdf();
    }
  }, [allSkillsArr]);

  const renderPdf = async () => {
    pdfLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.js";

    const loadingTask = pdfLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    setExtractedPdfData((prevState) => {
      let newState = { ...prevState };

      newState.canvas = [...Array(pdf.numPages)].map((_, index) => (
        <canvas key={index} id={`pdf-canvas-${index + 1}`} />
      ));

      return newState;
    });

    const extractedTextData = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const dataText = await extractTextFromPage(page);
      extractedTextData.push(dataText);

      const viewport = page.getViewport({ scale: 1.0 });
      const canvas = document.getElementById(`pdf-canvas-${pageNumber}`);
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    }

    props.onExtractedData(extractedTextData);

    const highlightedWords = highlightKeywords(extractedTextData, allSkillsArr);

    setExtractedPdfData((prevState) => {
      let newState = { ...prevState };

      newState.highlightedData = highlightedWords;
      newState.textData = extractedTextData.map((text, index) => (
        <p key={index}>{text}</p>
      ));
      setIsLoading(false);

      return newState;
    });
  };

  const handleSubmit = (values) => {
    _logger("formik on submit", values);

    const skillValues = values.skills;
    const userSkills = values.userSkills;

    const skillsObjects = skillValues.map((skill, index) => {
      let matchedSkill = allSkillsArr.find(
        (skillState) =>
          skill.skillName.toLowerCase() === skillState.skillName.toLowerCase()
      );

      let skillObject = {
        skillName: skill.skillName,
        years: userSkills[index].years,
        months: userSkills[index].months,
        skillId: matchedSkill ? matchedSkill.skillId : null,
        experienceLevelId: skill.experienceLevel,
      };

      return skillObject;
    });

    userSkillService
      .addMultiple(skillsObjects)
      .then(addUserSkillSuccess)
      .catch(addUserSkillError);
  };

  const addUserSkillSuccess = (response) => {
    _logger("addUserSkillSuccess", response);
    toastr.success("Your skills have been successfully added");
  };

  const addUserSkillError = (error) => {
    _logger("addUserSkillError", error);
    toastr.error("An error occurred adding your skills");
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="row">
          <div className="col">
            <h1>PDF Viewer</h1>
            <div>{extractedPdfData.canvas}</div>
          </div>

          <div className="col">
            <div className="row">
              <h1>PDF Data</h1>
              <div className="card">
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border my-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="card-body">{extractedPdfData.textData}</div>
                )}
              </div>

              <h1>Highlights</h1>
              <div className="card">
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border my-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="card-body">
                    {extractedPdfData.highlightedData}
                  </div>
                )}
              </div>

              <h1>Education</h1>
              <div className="card">
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border my-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="card-body">{extractedPdfData.education}</div>
                )}
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col- 6">
              <div>
                <Formik
                  enableReinitialize={true}
                  onSubmit={handleSubmit}
                  initialValues={{
                    skills: extractedPdfData.skillNames,
                    education: extractedPdfData.educationText,
                    experienceLevel: experienceLevelOptions,
                  }}
                >
                  {({ values }) => (
                    <Form>
                      <div>
                        <label htmlFor="skills" className="form-label mt-2">
                          <h1> Skills</h1>
                        </label>
                        <div className="card">
                          <div className="mt-2">
                            <FieldArrayGenerator
                              values={values}
                              experienceLevelOptions={experienceLevelOptions}
                            />
                          </div>

                          <div className="mb-3 mx-2">
                            <label htmlFor="education" className="form-label">
                              Education
                            </label>
                            <Field
                              className="form-control pdf-viewer-wrapper-textarea-height"
                              id="education"
                              name="education"
                              aria-describedby="education"
                              component="textarea"
                            />
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className={"btn btn-primary mb-2"}
                              id="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PdfViewer.propTypes = {
  url: PropTypes.string.isRequired,
  onExtractedData: PropTypes.func,
};

export default PdfViewer;
