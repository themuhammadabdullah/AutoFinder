// Modal.js
import React from "react";
import Modal from "react-modal";

const NavbarModal = ({ isOpen, closeModal }) => {
  const customModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      width: "50vw",
      margin: "auto",
      height: "18vw",
      padding: "20px",
      borderRadius: "15px",
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customModalStyle}
    >
      <div style={{ padding: "15px" }}>
        <div>
          <h2 style={{ color: "#233D7B", fontWeight: "bold" }}>
            Download Our App Now!
          </h2>
        </div>
        <div>
          <p style={{ color: "grey" }}>
            Download our App. It’s faster and better.
          </p>
        </div>
        <div>
          <a href="https://play.google.com/store/apps/details?id=com.pakwheels&amp;referrer=utm_source%3Dpakwheels.com%26utm_medium%3Dmobile-web-link%26utm_content%3Dinterstitial%26utm_campaign%3Dorganic-installs">
            <img
              alt="Google Play"
              class="mr5"
              height="34"
              src="https://wsa4.pakwheels.com/assets/google-play-badge-f4bed6cbd8a3a1be7c79377c4441447a.svg"
              title="Google Play"
            />
          </a>
          <a href="https://click.google-analytics.com/redirect?tid=UA-642162-19&amp;url=https%3A%2F%2Fitunes.apple.com%2Fpk%2Fapp%2Fpakwheels%2Fid739776365%3Fmt%3D8&amp;aid=com.pakwheels.www&amp;idfa={idfa}&amp;cs=pakwheels.com&amp;cm=mobile-web-link&amp;cn=organic-installs&amp;cc=interstitial&amp;hash=md5">
            <img
              alt="App Store"
              height="34"
              src="https://wsa1.pakwheels.com/assets/app-store-badge-4d05ff70e5546f31e3891739ea40abad.svg"
              title="App Store"
            />
          </a>
          <a href="https://appgallery.huawei.com/#/app/C101437147">
            <img
              alt="AppGallery"
              height="34"
              src="https://wsa4.pakwheels.com/assets/huawei-store-badge-7ad06f9ffe74b644d49c6221af98f5b3.svg"
              title="AppGallery"
            />
          </a>
        </div>
        <div>
          <input
            id="app_mobile_number"
            name="app_mobile_number"
            placeholder="Enter Your Phone No"
            type="text"
            className="mt-3"
            style={{ borderRadius: "5px" }}
          />
          <span class="input-group-btn mt-5">
            <input
              style={{ background: "#023F87", color: "#fff" }}
              class="btn ml-1"
              name="commit"
              onclick="sendAppLink(&#39;Main - Index&#39;)"
              type="submit"
              value="Send Link"
            />
          </span>
        </div>
        <div style={{ marginTop: "5px" }}></div>
      </div>
    </Modal>
  );
};

export default NavbarModal;
