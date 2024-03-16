import React, { useState, useEffect } from "react";
import { FieldArray, Field } from "formik";
import PropTypes from "prop-types";

const FieldArrayGenerator = (props) => {
  const [mappedExperienceOptions, setExperienceLevel] = useState([]);

  useEffect(() => {
    setExperienceLevel(() => {
      const ns = props.experienceLevelOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ));

      return ns;
    });
  }, [props.experienceLevelOptions]);

  return (
    <div className="mb-3">
      <FieldArray
        name="skills"
        render={(fieldArrayBag) => (
          <>
            {props?.values.skills?.map((skill, index) => (
              <div key={`${skill.skillName}${index}`}>
                <SkillForm
                  skill={skill}
                  index={index}
                  mappedExperienceOptions={mappedExperienceOptions}
                  fieldArrayBag={fieldArrayBag}
                />
              </div>
            ))}
          </>
        )}
      />
    </div>
  );
};

FieldArrayGenerator.propTypes = {
  values: PropTypes.shape({
    skills: PropTypes.arr,
    education: PropTypes.string,
    experienceLevel: PropTypes.arr,
  }),
  experienceLevelOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default FieldArrayGenerator;

const SkillForm = ({
  skill,
  index,
  mappedExperienceOptions,
  fieldArrayBag,
}) => {
  const { push, remove } = fieldArrayBag;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      return !prev;
    });
  };
  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-5">
          <Field
            className="form-control"
            name={`skills[${index}].skillName`}
            key={`field${skill.skillName}${index}`}
          />
        </div>

        <div className="col">
          <button
            key={`plus${skill.skillName}${index}`}
            type="button"
            onClick={() => push()}
            className="btn btn-primary btn-hover"
          >
            +
          </button>
          <button
            key={`less${skill.skillName}${index}`}
            type="button"
            onClick={() => remove(index)}
            className="btn btn-secondary mx-1 btn-hover"
          >
            -
          </button>
          <button
            key={`${skill.skillName}${index}`}
            type="button"
            onClick={toggleDropdown}
            className="btn btn-primary text-start btn-hover"
          >
            Add details
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-5 mt-2">
          {isDropdownOpen && (
            <>
              <div className="row">
                <div className="col">
                  <label htmlFor="skillyears" className="form-label">
                    Skills Years
                  </label>
                  <Field
                    name={`userSkills.${index}.years`}
                    className="form-control"
                  />
                </div>

                <div className="col">
                  <label htmlFor="skillmonth" className="form-label">
                    Skills Months
                  </label>
                  <Field
                    name={`userSkills.${index}.months`}
                    className="form-control"
                  />
                </div>
              </div>
              <label htmlFor="experienceLevel">Proficiency</label>
              <Field
                component="select"
                name={`skills[${index}].experienceLevel`}
                className="form-control mb-3"
                id="experienceLevel"
              >
                <option>Select your experience level with this skill</option>
                {mappedExperienceOptions}
              </Field>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

SkillForm.propTypes = {
  fieldArrayBag: PropTypes.shape({
    push: PropTypes.func,
    remove: PropTypes.func,
  }),
  index: PropTypes.number.isRequired,
  skill: PropTypes.shape({
    experienceLevel: PropTypes.string,
    skillName: PropTypes.string.isRequired,
  }),
  education: PropTypes.string,
  mappedExperienceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
