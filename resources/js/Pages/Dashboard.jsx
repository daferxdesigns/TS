import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c'];

export default function Statistics({ ticketStatuses, totalClients, totalInstallers }) {
  const chartData = Object.entries(ticketStatuses).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Statistics</h2>}
    >
      <Head title="Statistics" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-sm text-gray-500">Total Clients</h3>
            <p className="text-2xl font-bold">{totalClients}</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-sm text-gray-500">Total Installers</h3>
            <p className="text-2xl font-bold">{totalInstallers}</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-sm text-gray-500 mb-2">Ticket Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
