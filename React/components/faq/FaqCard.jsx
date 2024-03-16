import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./faq.css";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import "./faq.css";

function FaqCard(props) {
  const _logger = debug.extend("faqCard");
  const aFaq = props?.faq;
  const navigate = useNavigate();

  const edit = () => {
    let stateInTransit = { type: "FAQ_EDIT", payload: props.faq };
    _logger("state", stateInTransit);
    navigate(`/faqs/${props.faq.id}/edit`, { state: stateInTransit });
  };

  const onFaqDeletePressed = (e) => {
    e.preventDefault();
    props.faqDeleteHandler(aFaq, e);
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <strong>{aFaq?.question}</strong>
        </Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col>
              <h4>{aFaq?.answer}</h4>
              <h5 className="text-muted">{aFaq?.category?.name}</h5>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              {props.currentUser.roles.includes("SysAdmin") ? (
                <React.Fragment>
                  <FiEdit
                    cursor="pointer"
                    className="faqiconsize"
                    onClick={edit}
                  ></FiEdit>
                  <BsFillTrashFill
                    cursor="pointer"
                    className="faqiconsize"
                    onClick={onFaqDeletePressed}
                  ></BsFillTrashFill>
                </React.Fragment>
              ) : null}
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
``;
FaqCard.propTypes = {
  faq: PropTypes.shape({
    answer: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
  faqDeleteHandler: PropTypes.func.isRequired,
};

export default FaqCard;
