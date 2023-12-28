//imports
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div style={{ background: "#23292F" }}>
      <div class="container">
        <hr
          style={{
            backgroundColor: "gray",
            height: "1px",
            border: "none",
            margin: "0px 0px 10px",
          }}
        />

        <div class="copyright footer-links  centered-content">
          <p style={{ color: "#999" }}>
            Copyright &copy 2003 - 2023 Auto Finder (Pvt) Ltd. - All Rights
            Reserved.
          </p>
          <br />
          <a href="/">Terms of Service</a>
          &nbsp;|&nbsp;
          <a href="/">Privacy Policy</a>
          <p class="copyright mt0" style={{ color: "#999" }}>
            Reproduction of material from any Autofinder.com pages without
            permission is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
