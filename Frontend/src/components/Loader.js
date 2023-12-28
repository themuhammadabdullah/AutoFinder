import React from "react";

const loaderStyle = {
  width: "56px",
  height: "56px",
  display: "grid",
  border: "4.5px solid #0000",
  borderRadius: "50%",
  borderColor: "#dbdcef #0000",
  animation: "spinner-e04l1k 1s infinite linear",
};

const beforeAfterStyle = {
  content: '""',
  gridArea: "1/1",
  margin: "2.2px",
  border: "inherit",
  borderRadius: "50%",
};

const beforeStyle = {
  borderColor: "#474bff #0000",
  animation: "inherit",
  animationDuration: "0.5s",
  animationDirection: "reverse",
};

const afterStyle = {
  margin: "8.9px",
};

const Loader = () => {
  const keyframes = `
    @keyframes spinner-e04l1k {
      100% {
        transform: rotate(1turn);
      }
    }
  `;

  return (
    <>
      <div style={loaderStyle} className="spinner">
        <div style={beforeAfterStyle}></div>
        <div style={beforeAfterStyle}></div>
      </div>
      <style>{keyframes}</style>
    </>
  );
};

export default Loader;
