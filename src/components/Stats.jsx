import StatBox from './StatBox';

export default function Stat({ stats }) {
  return (
    <div className="stats bg-base-100 border-base-300 border w-full mx-auto shadow-md mt-6">
      {stats.map((stat, index) => (
        <StatBox key={index} title={stat.title} value={stat.value} color={stat.color} />
      ))}
    </div>
  );
}
