import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c'];

export default function Statistics({ ticketStatuses, totalTickets, totalClients, totalInstallers }) {
  const chartData = Object.entries(ticketStatuses).map(([status, count]) => ({
    name: capitalize(status),
    value: count,
  }));

  const getStatusCount = (status) => ticketStatuses[status] || 0;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Statistics</h2>}
    >
      <Head title="Statistics" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatCard title="Total Tickets" value={totalTickets} />
          <StatCard title="Open" value={getStatusCount('open')} />
          <StatCard title="In Progress" value={getStatusCount('in_progress')} />
          <StatCard title="On Hold" value={getStatusCount('on_hold')} />
          <StatCard title="Resolved" value={getStatusCount('resolved')} />
          <StatCard title="Closed" value={getStatusCount('closed')} />
          <StatCard title="Total Clients" value={totalClients} />
          <StatCard title="Total Installers" value={totalInstallers} />
        </div>

        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-sm text-gray-500 mb-2">Ticket Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 shadow rounded-lg text-center">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
