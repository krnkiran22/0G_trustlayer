'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WarningsListProps {
  warnings: string[];
}

export default function WarningsList({ warnings }: WarningsListProps) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <span>Warning Signs</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {warnings.map((warning, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-red-700">
              <span className="text-red-600 mt-0.5">•</span>
              <span>{warning}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
