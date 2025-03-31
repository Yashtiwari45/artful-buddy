
import React from 'react';
import { ChartData } from '@/lib/types';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface ChartRendererProps {
  chartData: ChartData;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  // Format data for Recharts
  const formattedData = chartData.data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    chartData.data.datasets.forEach((dataset, datasetIndex) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  const chartConfig = {
    education: {
      label: "Education",
      theme: {
        light: "#4f46e5",
        dark: "#818cf8",
      },
    },
    materials: {
      label: "Materials",
      theme: {
        light: "#ef4444",
        dark: "#f87171",
      },
    },
    techniques: {
      label: "Techniques",
      theme: {
        light: "#10b981",
        dark: "#34d399",
      },
    },
    styles: {
      label: "Styles",
      theme: {
        light: "#f59e0b",
        dark: "#fbbf24",
      },
    },
    movements: {
      label: "Movements",
      theme: {
        light: "#8b5cf6",
        dark: "#a78bfa",
      },
    }
  };

  if (chartData.type === 'pie') {
    return (
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Visual Representation</h3>
        <div className=" w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                dataKey={chartData.data.datasets[0].label}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {formattedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={chartData.data.datasets[0].backgroundColor?.[index] || `hsl(${index * 45}, 70%, 60%)`} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, chartData.data.datasets[0].label]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  } else if (chartData.type === 'bar') {
    return (
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Visual Representation</h3>
        <div className="w-full">
          <ChartContainer config={chartConfig}>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartData.data.datasets.map((dataset, index) => (
                <Bar 
                  key={index} 
                  dataKey={dataset.label} 
                  fill={dataset.backgroundColor?.[0] || `var(--color-${Object.keys(chartConfig)[index % Object.keys(chartConfig).length]})`}
                />
              ))}
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    );
  } else if (chartData.type === 'line') {
    return (
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Visual Representation</h3>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartData.data.datasets.map((dataset, index) => (
                <Line 
                  key={index} 
                  type="monotone" 
                  dataKey={dataset.label} 
                  stroke={dataset.borderColor || `var(--color-${Object.keys(chartConfig)[index % Object.keys(chartConfig).length]})`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium mb-4">No Chart Data Available</h3>
      <p>The requested chart data could not be displayed.</p>
    </div>
  );
};

export default ChartRenderer;
