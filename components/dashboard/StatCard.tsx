type Props = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6"> 
      <p className="text-2xl font-bold">{icon}</p>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
