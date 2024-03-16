import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function CookiesPolicy() {
  return (
    <div className="container">
      <a href="/">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="16.3515625 11.1015625 16.3515625 12.25 9.2421875 12.25 12.4960938 15.53125 11.6757812 16.3515625 7 11.6757812 11.6757812 7 12.4960938 7.8203125 9.2421875 11.1015625"></polygon>
        </svg>
        Back to Home
      </a>
      <h1 className="mt-4">Cookies Policy</h1>
      <p className="p-text mb-5">
        This website uses cookies to enhance the user experience and provide
        personalized services. By using this website, you consent to the use of
        cookies in accordance with this Cookies Policy.
      </p>
      <h3>What are Cookies?</h3>
      <p className="p-text mb-5">
        Cookies are small text files that are placed on your computer or mobile
        device when you visit a website. They are widely used to make websites
        work more efficiently, as well as to provide information to the owners
        of the site.
      </p>
      <h3>How do we use Cookies?</h3>
      <p className="p-text mb-5">
        We use cookies to analyze website traffic, personalize content, and
        provide social media features. We also share information about your use
        of our site with our social media, advertising, and analytics partners.
      </p>
      <h3>Types of Cookies We Use</h3>
      <ul className="p-text mb-5">
        <li>
          <strong>Essential cookies:</strong> These cookies are necessary for
          the website to function properly and cannot be switched off in our
          systems. They are usually set in response to actions made by you, such
          as setting your privacy preferences, logging in, or filling in forms.
        </li>
        <li>
          <strong>Analytical cookies:</strong> These cookies allow us to analyze
          website traffic and measure the performance of our site. They help us
          understand how visitors interact with our website, which pages are the
          most and least popular, and see how visitors move around the site.
        </li>
        <li>
          <strong>Marketing cookies:</strong> These cookies are used to track
          visitors across websites. The intention is to display ads that are
          relevant and engaging for the individual user and thereby more
          valuable for publishers and third-party advertisers.
        </li>
      </ul>
      <h3>Managing Cookies</h3>
      <p className="p-text mb-5">
        You can control and/or delete cookies as you wish. You can delete all
        cookies that are already on your computer, and you can set most browsers
        to prevent them from being placed. However, if you do this, you may have
        to manually adjust some preferences every time you visit a site, and
        some services and functionalities may not work.
      </p>
      <h3>More Information</h3>
      <p>
        If you have any questions about our use of cookies, please{" "}
        <a href="/">contact us</a>.
      </p>
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
    </div>
  );
}

export default CookiesPolicy;
