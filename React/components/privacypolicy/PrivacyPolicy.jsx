import React from "react";

function PrivacyPolicy() {
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
      <h1 className="mt-4">Privacy Policy</h1>
      <p className="p-text mb-5">
        This Privacy Statement outlines how we collect, use, disclose, and
        protect the personal information of our website visitors. We are
        committed to respecting your privacy and ensuring the security of your
        personal information.
      </p>
      <h3>Information We Collect:</h3>
      <p className="p-text mb-5">
        We may collect certain personal information when you interact with our
        website, such as your name, email address, contact information, and any
        other information you provide voluntarily.
      </p>
      <h3>Use of Information:</h3>
      <p className="p-text">We may use the collected information to:</p>
      <ul className="list-text mb-5">
        <li>Provide and personalize our services to meet your needs.</li>
        <li>
          Communicate with you regarding our products, services, and updates.{" "}
        </li>
        <li>Improve our website and enhance user experience.</li>
        <li>Respond to your inquiries and provide customer support.</li>
        <li>Conduct research and analysis for business purposes.</li>
        <li>Comply with legal and regulatory requirements.</li>
      </ul>
      <h3>Information Sharing:</h3>
      <p className="p-text mb-5">
        We do not sell, trade, or rent your personal information to third
        parties. However, we may share your information with trusted service
        providers who assist us in operating our website and conducting our
        business. These third parties are obligated to keep your information
        confidential and are prohibited from using it for any other purpose.
      </p>
      <h3>Data Security</h3>
      <p className="p-text mb-5">
        We implement industry-standard security measures to protect your
        personal information from unauthorized access, disclosure, alteration,
        or destruction. However, please note that no method of transmission over
        the internet or electronic storage is 100% secure, and we cannot
        guarantee absolute security.
      </p>
      <h3>Cookies and Tracking Technologies:</h3>
      <p className="p-text mb-5">
        We may use cookies and similar tracking technologies to enhance your
        browsing experience and collect information about how you interact with
        our website. You can modify your browser settings to disable cookies or
        receive alerts when cookies are being sent. However, please note that
        disabling cookies may affect the functionality of certain parts of our
        website. Click to view our <a href="/policy/cookies">Cookies Policy</a>.
      </p>
      <h3>Links to Third-Party Websites</h3>
      <p className="p-text mb-5">
        Our website may contain links to third-party websites for your
        convenience and reference. We do not have control over the privacy
        practices or content of these websites. We encourage you to review the
        privacy statements of those third-party websites before providing any
        personal information.
      </p>
      <h3>Children&apos;s Policy</h3>

      <p className="p-text mb-5">
        Our website is not intended for children under the age of 13. We do not
        knowingly collect personal information from children. If you believe
        that we may have inadvertently collected personal information from a
        child, please contact us, and we will take appropriate measures to
        delete that information.
      </p>
      <h3>Changes to this Privacy Statement</h3>
      <p className="p-text mb-5">
        We reserve the right to update or modify this Privacy Statement at any
        time without prior notice. Any changes will be effective immediately
        upon posting the updated Privacy Statement on our website.
      </p>
      <h3>Contact Us</h3>
      <p className="p-text mb-5">
        If you have any questions or concerns about our Privacy Statement or the
        handling of your personal information, please contact us using the
        provided contact information on our website.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
