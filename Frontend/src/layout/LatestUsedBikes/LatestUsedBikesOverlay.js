//imports
import LatestUsedBikes from "./LatestUsedBikes";

function LatestUsedBikesOverlay() {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          background: "#F2F3F3",
          padding: "40px 40px",
          marginTop: "150px",
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <h3 style={{ fontWeight: "bold", padding: "20px" }}>
              Latest Used Bikes
            </h3>
          </div>
          <div className="col-md-6 text-right">
            <a
              href="/used-bikes"
              style={{
                textDecoration: "underline",
                marginTop: "20px !important",
              }}
            >
              View All Used Bikes
            </a>
          </div>
        </div>
        <LatestUsedBikes />
      </div>
    </>
  );
}

export default LatestUsedBikesOverlay;
