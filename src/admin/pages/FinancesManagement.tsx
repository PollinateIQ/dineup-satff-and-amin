import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: 'order' | 'staff' | 'stock' | 'utilities' | 'other';
}

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
}

interface FinancialProjection {
  nextMonthTarget: number;
  currentMonthPerformance: number;
  lastMonthPerformance: number;
}

const FinancesManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({ totalRevenue: 0, totalExpenses: 0, netProfit: 0 });
  const [projection, setProjection] = useState<FinancialProjection>({ nextMonthTarget: 0, currentMonthPerformance: 0, lastMonthPerformance: 0 });

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const mockTransactions: Transaction[] = [
      { id: '1', date: '2023-05-01', description: 'Daily orders', amount: 1500, category: 'order' },
      { id: '2', date: '2023-05-01', description: 'Staff wages', amount: -500, category: 'staff' },
      { id: '3', date: '2023-05-02', description: 'Stock purchase', amount: -300, category: 'stock' },
      { id: '4', date: '2023-05-03', description: 'Utility bill', amount: -200, category: 'utilities' },
      { id: '5', date: '2023-05-04', description: 'Daily orders', amount: 1800, category: 'order' },
      // Add more mock transactions here
    ];

    setTransactions(mockTransactions);

    const mockSummary: FinancialSummary = {
      totalRevenue: 35000,
      totalExpenses: 25000,
      netProfit: 10000
    };

    setSummary(mockSummary);

    const mockProjection: FinancialProjection = {
      nextMonthTarget: 40000,
      currentMonthPerformance: 35000,
      lastMonthPerformance: 32000
    };

    setProjection(mockProjection);
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [30000, 32000, 28000, 35000, 40000, 38000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: [25000, 27000, 24000, 28000, 30000, 29000],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Finances Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FinancialCard
          title="Total Revenue"
          value={summary.totalRevenue}
          icon={<DollarSign className="h-8 w-8 text-green-500" />}
          trend="up"
        />
        <FinancialCard
          title="Total Expenses"
          value={summary.totalExpenses}
          icon={<DollarSign className="h-8 w-8 text-red-500" />}
          trend="down"
        />
        <FinancialCard
          title="Net Profit"
          value={summary.netProfit}
          icon={<DollarSign className="h-8 w-8 text-blue-500" />}
          trend="up"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>
        <Line data={chartData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Financial Projections</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Next Month Target</p>
              <p className="text-2xl font-bold">${projection.nextMonthTarget.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Month Performance</p>
              <p className="text-2xl font-bold">${projection.currentMonthPerformance.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Month Performance</p>
              <p className="text-2xl font-bold">${projection.lastMonthPerformance.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>
        <ExpenseBreakdown transactions={transactions} />
      </div>
    </div>
  );
};

const FinancialCard: React.FC<{ title: string; value: number; icon: React.ReactNode; trend: 'up' | 'down' }> = ({ title, value, icon, trend }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-6"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">${value.toFixed(2)}</p>
      </div>
      <div className="bg-gray-100 rounded-full p-3">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {trend === 'up' ? (
        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
      ) : (
        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
      )}
      <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? '+5%' : '-3%'} from last month
      </span>
    </div>
  </motion.div>
);

const ExpenseBreakdown: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const expenseCategories = ['staff', 'stock', 'utilities', 'other'];
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (transaction.amount < 0 && expenseCategories.includes(transaction.category)) {
      acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {} as Record<string, number>);

  const totalExpenses = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-4">
      {expenseCategories.map((category) => (
        <div key={category} className="flex items-center">
          <div className="w-32 text-sm font-medium text-gray-500 capitalize">{category}</div>
          <div className="flex-grow">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${((categoryTotals[category] || 0) / totalExpenses) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
          <div className="w-24 text-right text-sm font-medium text-gray-900">
            ${(categoryTotals[category] || 0).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancesManagement;