import StatCard from "./StatCard";

function QuickStat() {
  return (
    <div>
    <div className="row">
      <StatCard stat="1,816" label="IMPRESSIONS" color="primary" />
      <StatCard stat="65" label="CLICKS" color="warning" />
      <StatCard stat="3.1%" label="CTR" color="info" />
      <StatCard stat="47" label="ACTIONS" color="danger" />
    </div>
  </div>
  );
}

export default QuickStat;
