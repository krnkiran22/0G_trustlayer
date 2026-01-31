'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface RiskFactorCardProps {
  name: string;
  value: number;
  description?: string;
}

export default function RiskFactorCard({ name, value, description }: RiskFactorCardProps) {
  const getColorClass = (val: number): string => {
    if (val <= 3) return 'bg-green-600';
    if (val <= 6) return 'bg-yellow-500';
    return 'bg-red-600';
  };

  const getTextColor = (val: number): string => {
    if (val <= 3) return 'text-green-600';
    if (val <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
          <span className={cn('text-2xl font-bold', getTextColor(value))}>
            {value.toFixed(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn('h-full transition-all', getColorClass(value))}
              style={{ width: `${(value / 10) * 100}%` }}
            />
          </div>
          {description && (
            <p className="text-xs text-slate-600">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
