import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import {
  getAllTypeLabelsWithNulls,
  addTypeLabels,
  deleteTypeLabels,
  clearAllLabelsByType,
} from "../../services/compensationConfigurationService";
import { get3Col } from "../../services/lookUpService";
import toastr from "toastr";
import CompensationLabelSelect from "./CompensationLabelSelect";
const _logger = debug.extend("CompensationConfiguration");

function CompensationConfiguration() {
  const [pageData, setPageData] = useState({
    compensationTypeLabelsList: [],
    compensationLabelsList: [],
    mappedCompTypeLabels: [],
  });

  useEffect(() => {
    get3Col("CompensationLabels")
      .then(onGetAllLabelsSuccess)
      .catch(onGetAllLabelsError);

    getAllTypeLabelsWithNulls()
      .then(onGetAllTypeLabelsSuccess)
      .catch(onGetAllTypeLabelsError);
  }, []);

  const onGetAllLabelsSuccess = (response) => {
    _logger("Successfully load Labels from the server", response);
    const labels = response?.items;

    if (labels) {
      setPageData((prevData) => {
        const newData = { ...prevData };
        newData.compensationLabelsList = labels.map(mapLabel);

        function mapLabel(aLabel) {
          let newLabel = {
            value: Number(aLabel.id),
            label: aLabel.name,
            description: aLabel.col3,
          };
          return newLabel;
        }

        return newData;
      });
    }
  };

  const onGetAllLabelsError = (error) => {
    _logger("Failed to get Compensation Labels", error);
    toastr.error("Failed to get Compensation Labels", error);
  };

  const onGetAllTypeLabelsSuccess = (response) => {
    _logger("Successfully load TypeLabels from the server", response);
    const typesWithLabels = response?.items;
    if (typesWithLabels) {
      setPageData((prevData) => {
        const newData = { ...prevData };
        newData.compensationTypeLabelsList = typesWithLabels.map(mapTypeLabel);

        function mapTypeLabel(aTypeLabel) {
          let newCompLabels = [];

          if (aTypeLabel.compensationLabels !== null) {
            newCompLabels = aTypeLabel.compensationLabels.map(mapLabel);
          }
          function mapLabel(aLabel) {
            let newLabel = {};
            if (aLabel !== null) {
              newLabel = {
                value: Number(aLabel.id),
                label: aLabel.name,
                description: aLabel.col3,
              };
            }
            return newLabel;
          }

          let newTypeLabel = {
            compensationType: aTypeLabel.compensationType,
            compensationLabels: newCompLabels,
          };

          return newTypeLabel;
        }

        return newData;
      });
    }
  };

  const onGetAllTypeLabelsError = (error) => {
    _logger("Failed to get Compensation TypeLabels", error);
    toastr.error("Failed to get Compensation TypeLabels", error);
  };

  useEffect(() => {
    if (
      pageData.compensationLabelsList.length > 0 &&
      pageData.compensationTypeLabelsList.length > 0
    ) {
      setPageData((prevData) => {
        const newData = { ...prevData };
        newData.mappedCompTypeLabels =
          pageData.compensationTypeLabelsList.map(mapCompTypeLabelRow);
        return newData;
      });
    }
  }, [pageData.compensationLabelsList, pageData.compensationTypeLabelsList]);

  const mapCompTypeLabelRow = useCallback((rowData) => {
    let newKey = `${rowData.compensationType.name.charAt(0)}_${
      rowData.compensationType.id
    }`;

    let currentDescriptions = [];
    if (rowData.compensationLabels !== null) {
      rowData.compensationLabels.forEach((aLabel) => {
        currentDescriptions.push(
          <div key={`${newKey}_desc_${aLabel.value}`}>
            - {aLabel.description}
          </div>
        );
      });
    }

    return (
      <tr key={newKey}>
        <td key={`${newKey}_name`} className="text-center">
          {rowData.compensationType.name}
        </td>

        <td key={`${newKey}_box`}>
          <CompensationLabelSelect
            labels={pageData.compensationLabelsList}
            currentValues={rowData.compensationLabels}
            typeId={rowData.compensationType.id}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            clearLabels={clearLabels}
          />
        </td>

        <td key={`${newKey}_desc`}>{currentDescriptions}</td>
      </tr>
    );
  });

  const addLabel = (currentLabels, addingLabel, typeId) => {
    _logger("addLabel", currentLabels, typeId);
    _logger("actionOptions", addingLabel);
    let payload = {
      compensationTypeId: typeId,
      labelId: addingLabel.value,
    };

    const addHandler = () => onAddSuccess(currentLabels, typeId);
    addTypeLabels(payload).then(addHandler).catch(onAddError);
  };

  const onAddSuccess = (currentLabels, typeId) => {
    _logger("Successfully added into TypeLabels @ row:", typeId);
    updatePageData(currentLabels, typeId);
  };

  const onAddError = (error) => {
    _logger("Failed to add a Label to Type", error);
    toastr.error("Failed to add a Label to Type. Please try again.", error);
  };

  const deleteLabel = (currentLabels, deletingLabel, typeId) => {
    _logger("deleteLabel", currentLabels, typeId);
    _logger("actionOptions", deletingLabel);
    let payload = {
      compensationTypeId: typeId,
      labelId: deletingLabel.value,
    };

    const deleteHandler = () => onDeleteSuccess(currentLabels, typeId);
    deleteTypeLabels(payload).then(deleteHandler).catch(onDeleteError);
  };

  const onDeleteSuccess = (currentLabels, typeId) => {
    _logger("Successfully deleted a label from TypeLabels @ row:", typeId);
    updatePageData(currentLabels, typeId);
  };

  const onDeleteError = (error) => {
    _logger("Failed to delete a Label to Type", error);
    toastr.error("Failed to delete a Label to Type. Please try again.", error);
  };

  const clearLabels = (typeId) => {
    const clearHandler = () => onClearSuccess(typeId);
    clearAllLabelsByType(typeId).then(clearHandler).catch(onClearError);
  };

  const onClearSuccess = (typeId) => {
    _logger("Successfully deleted ALL labels from Type", typeId);
    updatePageData([], typeId);
  };

  const onClearError = (error) => {
    _logger("Failed to clear ALL labels from Type", error);
    toastr.error(
      "Failed to clear all labels from Type. Please try again.",
      error
    );
  };

  const updatePageData = (updateLabelData, typeId) => {
    _logger("updatePageData: ", updateLabelData, typeId);

    setPageData((prevData) => {
      let updateData = { ...prevData };

      let targetRowIndex =
        prevData.compensationTypeLabelsList.findIndex(findTypeLabel);

      function findTypeLabel(aType) {
        return aType.compensationType.id === typeId;
      }

      updateData.compensationTypeLabelsList[targetRowIndex].compensationLabels =
        updateLabelData;

      updateData.mappedCompTypeLabels[targetRowIndex] = mapCompTypeLabelRow(
        updateData.compensationTypeLabelsList[targetRowIndex]
      );

      return updateData;
    });
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col>
            <h1>Compensation Configuration</h1>

            <Table bordered hover variant="light">
              <thead>
                <tr>
                  <th width="30%" className="text-center">
                    Type
                  </th>
                  <th width="40%" className="text-center">
                    Label
                  </th>
                  <th width="30%" className="text-center">
                    Label Description
                  </th>
                </tr>
              </thead>

              <tbody>{pageData.mappedCompTypeLabels}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default CompensationConfiguration;
