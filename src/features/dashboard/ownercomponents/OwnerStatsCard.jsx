function OwnerStatsCard({ title, value }) {
  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg">

      <h3 className="text-gray-400 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}

export default OwnerStatsCard;