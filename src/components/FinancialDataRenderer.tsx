
import React from 'react';
import { FinancialData } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinancialDataRendererProps {
  financialData: FinancialData;
}

const FinancialDataRenderer: React.FC<FinancialDataRendererProps> = ({ financialData }) => {
  // Format data for chart
  const chartData = financialData.estimatedCosts.map(item => ({
    name: item.category,
    amount: item.amount
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium mb-4">Financial Overview</h3>
      
      <div className="mb-6">
        <h4 className="text-base font-medium mb-2">Estimated Costs Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary">
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-right">Estimated Cost</th>
              </tr>
            </thead>
            <tbody>
              {financialData.estimatedCosts.map((item, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-2">{item.category}</td>
                  <td className="p-2 text-right font-mono">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
              <tr className="bg-primary/5 font-medium">
                <td className="p-2">Total Estimate</td>
                <td className="p-2 text-right font-mono">{formatCurrency(financialData.totalEstimate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-base font-medium mb-2">Cost Distribution</h4>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [`$${value}`, 'Estimated Cost']} />
              <Legend />
              <Bar dataKey="amount" name="Estimated Cost" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h4 className="text-base font-medium mb-2">Additional Information</h4>
        <div className="p-4 rounded-lg bg-secondary/50">
          <p className="mb-2"><span className="font-medium">Timeframe:</span> {financialData.timeframe}</p>
          <p><span className="font-medium">Notes:</span> {financialData.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialDataRenderer;
