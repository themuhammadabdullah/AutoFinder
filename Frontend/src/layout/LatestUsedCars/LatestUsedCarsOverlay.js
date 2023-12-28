//imports
import LatestUsedCars from "./LatestUsedCars";

function LatestUsedCarsOverlay() {
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
              Latest Used Cars
            </h3>
          </div>
          <div className="col-md-6 text-right">
            <a
              href="/used-cars"
              style={{
                textDecoration: "underline",
                marginTop: "20px !important",
              }}
            >
              View All Used Cars
            </a>
          </div>
        </div>
        <LatestUsedCars />
      </div>
    </>
  );
}

export default LatestUsedCarsOverlay;
