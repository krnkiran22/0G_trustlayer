'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  CpuChipIcon, 
  BoltIcon,
  ChartBarIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StatsCounter from '@/components/features/StatsCounter';

const features = [
  {
    icon: BoltIcon,
    title: '96% Cost Savings',
    description: 'Decentralized AI analysis at a fraction of traditional cloud costs',
  },
  {
    icon: ShieldCheckIcon,
    title: 'TEE Verified',
    description: 'Trusted Execution Environment ensures analysis integrity',
  },
  {
    icon: CpuChipIcon,
    title: 'Decentralized',
    description: 'Powered by 0G Network for censorship-resistant analysis',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Submit Contract',
    description: 'Enter the smart contract address you want to analyze',
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: '0G TEE runs comprehensive risk assessment',
  },
  {
    step: '03',
    title: 'Get Results',
    description: 'Receive detailed risk report with actionable insights',
  },
];

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                Protect Your DeFi Investments with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AI-Powered Risk Analysis
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Analyze smart contracts for security risks, rug pulls, and vulnerabilities.
                Powered by 0G's decentralized AI infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/analyze">Analyze Contract Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Contracts Analyzed', value: 15234, suffix: '+' },
              { label: 'Scams Detected', value: 892 },
              { label: 'Users Protected', value: 8500, suffix: '+' },
              { label: 'Cost Savings', value: 96, suffix: '%' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <StatsCounter end={stat.value} suffix={stat.suffix || ''} />
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose SafeGuard AI?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Advanced decentralized risk analysis at unprecedented cost efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Three simple steps to secure your DeFi investments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Secure Your DeFi Investments?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start analyzing smart contracts in seconds
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/analyze">Analyze Now - It's Free</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 0G Branding */}
      <section className="py-12 bg-slate-900">
        <Container>
          <div className="text-center text-white">
            <p className="text-sm mb-2 opacity-75">Powered by</p>
            <a
              href="https://0g.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold hover:text-blue-400 transition-colors"
            >
              0G Network
            </a>
            <p className="text-sm mt-2 opacity-75">
              Decentralized AI Infrastructure
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}

            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
