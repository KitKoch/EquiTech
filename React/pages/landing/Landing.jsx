import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  CardGroup,
  Modal,
  Button,
} from "react-bootstrap";
import {
  User,
  Award,
  Folder,
  Sliders,
  Smile,
  Globe,
  DollarSign,
  Users,
  Key,
} from "react-feather";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import "./landing.css";
import newsletterService from "../../services/newsletterService";
import NewsletterLandingCard from "./NewsletterLandingCard";
import blogsService from "../../services/blogsService";
import BlogLandingCard from "./BlogLandingCard";

const _logger = debug.extend("Landing");

const LandingIntro = (props) => {
  _logger("LandingIntro props", props);

  const dashboardBtn = (user) => {
    if (user.currentUser.roles.includes("SysAdmin")) {
      return "/dashboard/analytics";
    } else if (user.currentUser.roles.includes("Candidate")) {
      return "/dashboards/candidate";
    } else if (user.currentUser.roles.includes("OrgAdmin")) {
      return "/dashboard/organization";
    } else if (user.currentUser.roles.includes("HiringAdmin")) {
      return "/hiring/admin/dashboard";
    }
  };

  const isLoggedIn = props.currentUser.currentUser.isLoggedIn;

  return (
    <section className="landing-intro landing-bg pt-5 pt-lg-6 pb-5 pb-lg-7">
      <Container className="landing-intro-content">
        <Row className="align-items-center">
          <Col lg="5" className="mx-auto">
            <h1 className="my-4 landing-first-statement">
              Find & hire high quality talent.
            </h1>
            <p className="text-lg fs-3">
              Find the best talent for your company while saving time on
              recruiting & hiring.
            </p>
            {isLoggedIn && (
              <div className="my-4">
                <a
                  href={dashboardBtn(props.currentUser)}
                  className="btn btn-success btn-lg me-2 register-btn"
                >
                  Dashboard
                </a>
              </div>
            )}
          </Col>
          <Col lg="7" className="d-none d-lg-flex mx-auto text-center">
            <div className="landing-intro-screenshot pb-3">
              <img
                src="https://cms-assets.themuse.com/media/lead/04132023-1319571139-pixelfit-behavioral-interview-questions.jpg"
                alt="Dark/Light Bootstrap React Admin Template"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const EmployerFeatures = () => (
  <section className="py-6 bg-white">
    <Container className="position-relative z-3">
      <div className="mb-5 text-center">
        <h1 className="mb-3 employer-features">Features for Employer</h1>
      </div>
      {/* <Row>
        <Col md="12" className="mx-auto text-center">
          <Row>
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="mb-4">
                <h1 className="mb-3 employer-features">
                  Features for Employer
                </h1>
              </div>
            </div>
          </Row>
        </Col>
      </Row> */}

      <Row>
        <Col md="12">
          <div className="card-group">
            <div className="card employer-features-card">
              <div className="card-body">
                <Folder />
                <h5 className="card-title fs-1 mt-2 title-row">
                  Offer Negotiator
                </h5>
                <p className="card-text fs-4">
                  Our negotiation tool streamline the process by providing a
                  platform where both parties can negotiate in real-time and
                  come to an agreement faster: Negotiating a job offer can be a
                  time-consuming and complex process, especially if there are
                  multiple rounds of back-and-forth between the employer and
                  candidate.
                </p>
              </div>
            </div>
            <div className="card employer-features-card">
              <div className="card-body">
                <User />
                <h5 className="card-title fs-1  mt-2 title-row">
                  External Talent Identifier
                </h5>
                <p className="card-text fs-4">
                  Saves time and resources: Sifting through resumes and
                  applications can be a time-consuming and resource-intensive
                  process for employers. An external talent identifier can help
                  automate the initial screening process, allowing employers to
                  quickly identify top candidates and reduce the amount of time
                  spent on manual screening.
                </p>
              </div>
            </div>
            <div className=" card employer-features-card">
              <div className="card-body">
                <Award />
                <h5 className="card-title fs-1  mt-2 title-row">
                  Company culture and values assessment
                </h5>
                <p className="card-text fs-4">
                  Differentiates the company from competitors: In today&apos;s
                  job market, candidates have more options than ever before, and
                  employers need to find ways to stand out from the competition.
                  By highlighting their unique culture and values, employers can
                  differentiate themselves from other companies and attract top
                  talent who are looking for a workplace that aligns with their
                  personal values.
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

const Testimonials = () => (
  <section className="py-6">
    <Container>
      <div className="mb-5 text-center">
        <h2 className="h1 company-reviews">Companies love Fairly</h2>
        <p className="text-muted fs-lg">
          Here&apos;s what some of our customers have to say about using our
          platform.
        </p>
      </div>
      <Row>
        <Col md="6" lg="4">
          <Card as="blockquote" className="landing-quote border">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <User />
                </div>
                <div className="ps-3">
                  <h5 className="mb-1 mt-2">Sherry</h5>
                  <small className="d-block text-muted h5 fw-normal">
                    Head of Product
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “I&apos;ve had a fantastic experience with Fairly.
                <span>
                  The platform is easy to use and has helped me find some of the
                  best candidates for my company.
                </span>{" "}
                The screening tools and candidate matching system are
                particularly helpful. I highly recommend Fairly to any employer
                looking to hire great talent.”
              </p>
              <div className="landing-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card as="blockquote" className="landing-quote border">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <User />
                </div>
                <div className="ps-3">
                  <h5 className="mb-1 mt-2">Alejandro</h5>
                  <small className="d-block text-muted h5 fw-normal">
                    Hiring Manager
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “I cannot recommend Fairly enough!{" "}
                <span>
                  The platform is intuitive and easy to use, and the quality of
                  candidates is outstanding.
                </span>{" "}
                The customer service team is responsive and provides excellent
                support. I have successfully hired several excellent employees
                through Fairly, and I will continue to use their services in the
                future.”
              </p>
              <div className="landing-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" lg="4" className="d-block d-md-none d-lg-block">
          <Card as="blockquote" className="landing-quote border">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <User />
                </div>
                <div className="ps-3">
                  <h5 className="mb-1 mt-2">John</h5>
                  <small className="d-block text-muted h5 fw-normal">
                    Hiring Manager
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “Fairly is the best in the business. The platform is
                user-friendly, and the screening tools are robust. We have found
                some amazing candidates through Fairly, and the customer support
                team has been instrumental in helping us to attract and retain
                top talent. <span>Fantastic customer service!</span>”
              </p>
              <div className="landing-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

const CandidatePromo = () => {
  return (
    <section className="bg-white py-6">
      <Container>
        <div className="mb-5 text-center">
          <h2 className="h1">Job Seekers</h2>
          <p className="text-muted fs-lg">
            What can Fairly&apos;s revolutionary platform do for you?
          </p>
        </div>

        <Row>
          <Col md="6">
            <div className="d-flex py-3">
              <div className="landing-feature">
                <Sliders />
              </div>
              <div className="flex-grow-1">
                <h4 className="mt-0">Prioritize what is important to you</h4>
                <p className="fs-lg">
                  Break free from traditional constraints, as Fairly empowers
                  you to set your own terms.
                </p>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex py-3">
              <div className="landing-feature">
                <Smile />
              </div>
              <div className="flex-grow-1">
                <h4 className="mt-0">Level the playing field</h4>
                <p className="fs-lg">
                  Fairly helps eliminate bias in the job search process,
                  connecting you with employers who value your skills and
                  experiences
                </p>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex py-3">
              <div className="landing-feature">
                <Globe />
              </div>
              <div className="flex-grow-1">
                <h4 className="mt-0">
                  Work in a creative, diverse environment
                </h4>
                <p className="fs-lg">
                  Experience a job search platform that champions diversity and
                  inclusion, matching you with employers committed to creating
                  an inclusive workplace where you can thrive.
                </p>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex py-3">
              <div className="landing-feature">
                <Users />
              </div>
              <div className="flex-grow-1">
                <h4 className="mt-0">Avoid awkward negotiations</h4>
                <p className="fs-lg">
                  Say goodbye to uncomfortable negotiations with our platform
                  that streamlines the process, ensuring fair compensation and
                  benefits that meet your individual needs.
                </p>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex py-3">
              <div className="landing-feature">
                <DollarSign />
              </div>
              <div className="flex-grow-1">
                <h4 className="mt-0">Find your market worth</h4>
                <p className="fs-lg">
                  Fairly&apos;s innovative system helps you find the real value
                  of your talent, without inherent bias.
                </p>
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex py-3">
              <div className="landing-feature">
                <i data-feather="download-cloud"></i>
                <Key />
              </div>
              <div className="flex-grow-1">
                <h4 className="mt-0">
                  Land a job at a company that is a good fit for you
                </h4>
                <p className="fs-lg">
                  Unlock a world of opportunities, as Fairly intelligently
                  matches you with employers who share your values.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState({
    blogsArray: [],
    blogComponents: [],
  });
  false && _logger(blogs);

  useEffect(() => {
    blogsService.getBlogs(0, 3).then(onGetBlogsSuccess).catch(onGetBlogsError);
  }, []);

  const onGetBlogsSuccess = (response) => {
    const blogsData = response.item.pagedItems;

    setBlogs((prevState) => {
      const newBlogs = { ...prevState };
      newBlogs.blogsArray = blogsData;
      newBlogs.blogComponents = blogsData.map(mapBlogs);
      return newBlogs;
    });
  };

  const onGetBlogsError = (error) => {
    _logger(error);
  };

  const mapBlogs = (blog) => {
    return <BlogLandingCard blog={blog} key={`Blog-${blog.id}`} />;
  };

  return (
    <section className="py-6">
      <Container>
        <Row>
          <Col md="10" className="mx-auto text-center">
            <div className="mb-5">
              <h2 className="h1">Blogs</h2>
              <p className="text-muted text-lg">
                How can a more diverse talent pool improve your company? How can
                we level the playing field and remove inherent bias?
              </p>
              <p className="text-muted text-lg">
                Learn more about innovating your talent acquisition.
              </p>
            </div>

            <CardGroup>{blogs.blogComponents}</CardGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Newsletters = () => {
  const [newsletters, setNewsletters] = useState({
    newsletterArray: [],
    newsLetterComponents: [],
  });

  useEffect(() => {
    newsletterService
      .getAll(0, 3)
      .then(onGetNewslettersSuccess)
      .catch(onGetNewslettersError);
  }, []);

  const onGetNewslettersSuccess = (response) => {
    const newsletterData = response.item.pagedItems;

    setNewsletters((prevState) => {
      const newsletters = { ...prevState };
      newsletters.newsletterArray = newsletterData;
      newsletters.newsLetterComponents = newsletterData.map(mapNewsletters);
      return newsletters;
    });
  };

  const onGetNewslettersError = (error) => {
    _logger(error);
  };

  const mapNewsletters = (newsletter) => {
    return (
      <NewsletterLandingCard
        newsletter={newsletter}
        key={`Newsletter-${newsletter.id}`}
      />
    );
  };

  return (
    <section className="py-6 bg-white" id="demos">
      <Container className="position-relative z-3">
        <Row>
          <Col md="12" className="mx-auto text-center">
            <Row>
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="mb-4">
                  <h2 className="h1 mb-3">Newsletters</h2>
                  <p className="text-muted fs-lg">
                    Subscribe to our newsletters to stay up to date on the
                    latest in high quality, diverse talent acquisition!
                  </p>
                </div>
              </div>
            </Row>

            <Row>
              <CardGroup>{newsletters.newsLetterComponents}</CardGroup>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Landing = (props) => {
  _logger("Landing props", props);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (hasAcceptedCookies) {
      setShowModal(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowModal(false);
  };

  const handleDeclineCookies = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <LandingIntro currentUser={props} />
      <EmployerFeatures />
      <Testimonials />
      <CandidatePromo />
      <Blogs />
      <Newsletters />
      <section className="py-6 bg-white">
        <Container>
          <Row>
            <Col md="12" className="mx-auto text-center">
              <p>
                By using our website, you consent to the collection, use, and
                disclosure of your personal information as described in this{" "}
                <a href="/policy/privacy">Privacy Policy</a>.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal show={showModal} onHide={handleDeclineCookies} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Cookie Consent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This website uses cookies to ensure you get the best experience on
            our website. Click to view our{" "}
            <a href="/policy/cookies">Cookies Policy</a>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAcceptCookies}>
            Accept
          </Button>
          <Button variant="danger" onClick={handleDeclineCookies}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

Landing.propTypes = {
  currentUser: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
};

LandingIntro.propTypes = {
  currentUser: PropTypes.shape({
    currentUser: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
    }),
  }),
};

export default Landing;
