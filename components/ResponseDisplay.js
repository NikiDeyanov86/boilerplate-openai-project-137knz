import { useState } from "react";

const CarCard = ({ car }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="car-card">
      <h2>
        {car.manufacturer} {car.model}
      </h2>

      <p><b>Fit Score:</b> {car.fitScore ?? car.rating}/100</p>

      <p>{car.productionYears}</p>
      <p>{car.chassisType}</p>
      <p>{car.engine}</p>
      <p>{car.drivetrain}</p>

      <button
        type="button"
        className="expand-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide details" : "Show details"}
      </button>

      {expanded && (
        <div className="car-details">
          <p><b>Transmission:</b> {car.transmission}</p>
          <p><b>Fuel Economy:</b> {car.fuelEconomy}</p>
          <p><b>0-100:</b> {car.acceleration}</p>

          <p><b>Price:</b> {car.estimatedPrice}</p>
          <p><b>Rating:</b> {car.rating}/10</p>
          <p><b>Reliability:</b> {car.reliabilityScore}</p>
          <p><b>Maintenance:</b> {car.maintenanceCost}</p>

          <p><b>Why this fits:</b> {car.reasoning}</p>

          <h4>Common Issues</h4>
          <ul>
            {car.commonIssues?.map((i, idx) => (
              <li key={idx}>
                {i.issue} — {i.repairCostEstimate}
              </li>
            ))}
          </ul>

          <h4>AutoData Reference</h4>
          <a href={car.autoDataLink} target="_blank" rel="noreferrer">
            View full specs
          </a>
        </div>
      )}
    </div>
  );
};

const ResponseDisplay = ({ data, error, loading }) => {
  if (loading) return <p>Finding best vehicles...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="response-display">
      {data.result.cars.map((car, index) => (
        <CarCard key={index} car={car} />
      ))}
    </div>
  );
};

export default ResponseDisplay;