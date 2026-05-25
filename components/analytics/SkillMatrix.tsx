'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SkillMatrixProps {
  skills: {
    dataStructures: number;
    systemDesign: number;
    codeQuality: number;
    communication: number;
  };
}

export function SkillMatrix({ skills }: SkillMatrixProps) {
  const data = [
    { name: 'Data Structures', value: skills.dataStructures },
    { name: 'System Design', value: skills.systemDesign },
    { name: 'Code Quality', value: skills.codeQuality },
    { name: 'Communication', value: skills.communication },
  ];

  const colors = ['#6366F1', '#06B6D4', '#8B5CF6', '#EC4899'];

  return (
    <div className="rounded-lg border border-ai-border bg-ai-card-bg p-6">
      <h3 className="text-lg font-semibold text-ai-text-primary mb-4">Technical Skills</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
          <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: '1px solid #1F2937',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-3 mt-6">
        {data.map((skill, idx) => (
          <div key={skill.name} className="text-sm">
            <p className="text-ai-text-muted mb-1">{skill.name}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-ai-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${skill.value}%`,
                    backgroundColor: colors[idx],
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-ai-text-primary w-8 text-right">{skill.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
