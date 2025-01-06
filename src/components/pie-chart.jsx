import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CustomLegend = ({ payload }) => {
  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-black"></div>
        <h3 className="text-base font-2xl">List Kategori Sampah</h3>
      </div>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div 
            className="w-4 h-4" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.name}</span>
        </div>
      ))}
    </div>
  );
};

export function WastePieChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-row items-start justify-center gap-6">
        <div className="w-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  fill: "#333",
                  pointerEvents: "none",
                }}
              >
                Kategori Sampah
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-max mt-10">
          <CustomLegend payload={data} />
        </div>
      </div>
    </div>
  );
}
