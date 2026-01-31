'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnalysisCard from '@/components/features/AnalysisCard';
import { Badge } from '@/components/ui/badge';
import { Analysis } from '@/types';
import { exampleContracts } from '@/lib/mockData';
import {
  ChartBarIcon,
  ClockIcon,
  ShieldExclamationIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  // Mock data for dashboard
  const mockAnalyses: Analysis[] = exampleContracts.map((contract, index) => ({
    id: `dashboard-${index}`,
    contractAddress: contract.address,
    network: contract.network,
    riskLevel: contract.risk,
    overallRisk: contract.risk === 'LOW' ? 2.1 : contract.risk === 'MEDIUM' ? 5.5 : 7.5,
    timestamp: new Date(Date.now() - index * 86400000).toISOString(),
  }));

  const stats = [
    {
      label: 'Total Analyses',
      value: '12',
      icon: ChartBarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'High Risk Detected',
      value: '3',
      icon: ShieldExclamationIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Total Saved',
      value: '$4.80',
      icon: CurrencyDollarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Last Analysis',
      value: '2 hours ago',
      icon: ClockIcon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
            <p className="text-slate-600">Track your contract analysis history and insights</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Analysis History */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnalyses.map((analysis) => (
                        <AnalysisCard key={analysis.id} analysis={analysis} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Risk Distribution */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Low Risk</span>
                        <Badge variant="success">4</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Medium Risk</span>
                        <Badge variant="warning">5</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">High Risk</span>
                        <Badge variant="danger">3</Badge>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="text-center">
                        <p className="text-sm text-slate-600 mb-1">Average Risk Score</p>
                        <p className="text-3xl font-bold text-slate-900">4.8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">Cost Savings</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">$4.80</p>
                    <p className="text-sm text-slate-600">
                      vs ${(4.80 / 0.04).toFixed(2)} on traditional cloud
                    </p>
                    <div className="mt-4 pt-4 border-t border-indigo-200">
                      <p className="text-xs text-slate-600">Powered by 0G Network</p>
                      <p className="text-2xl font-bold text-indigo-600">96% Savings</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
