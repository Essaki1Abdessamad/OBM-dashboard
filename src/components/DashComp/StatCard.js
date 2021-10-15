import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StatCard(props) {
  let bgColor = "bg-" + props.color;

  return (
    <div className="col-md-6 col-lg-3">
      <div className={"card mb-3 border-0 rounded-3 shadow " + bgColor}>
        <div className="card-body text-white">
          <h3 className="card-title h2">{props.stat}</h3>
          <span>
            <FontAwesomeIcon icon={["fas", "chart-line"]} className="me-1" />
            {props.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
