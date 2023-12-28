//imports
import React from "react";
import Navbar from "../Navbar/Navbar";

//style
const errorPageStyle = {
  padding: "40px 0",
  background: "#fff",
  fontFamily: "'Arvo', serif",
};

const h1Style = {
  fontSize: "80px",
};

const h3Style = {
  fontSize: "80px",
};

const linkStyle = {
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "1em",
  background: "#B73439",
  margin: "5px 0",
  display: "inline-block",
};

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "30vh",
};

function ErrorPage() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div style={centerStyle}>
        <section style={errorPageStyle} className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="col-sm-12 col-sm-offset-1 text-center">
                  <div className="contant_box_404">
                    <p>The page you are looking for is not available!</p>

                    <a href="/" style={linkStyle} className="link_404">
                      Go to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ErrorPage;
