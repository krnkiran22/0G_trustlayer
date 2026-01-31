'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShieldCheckIcon,
  CpuChipIcon,
  BoltIcon,
  ServerIcon,
  LockClosedIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const mission = {
  title: 'Our Mission',
  description:
    'SafeGuard AI aims to democratize DeFi security by providing accessible, affordable, and reliable risk analysis for everyone. Powered by 0G Network, we deliver enterprise-grade analysis at a fraction of traditional costs.',
};

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Comprehensive Analysis',
    description: 'Our AI analyzes 8 critical risk factors including rug pull risk, smart contract vulnerabilities, and liquidity issues.',
  },
  {
    icon: LockClosedIcon,
    title: 'TEE Verification',
    description: 'All analyses run in Trusted Execution Environments, ensuring integrity and trustworthiness of results.',
  },
  {
    icon: BoltIcon,
    title: '96% Cost Reduction',
    description: 'Decentralized infrastructure means massive cost savings compared to traditional cloud-based solutions.',
  },
  {
    icon: ServerIcon,
    title: 'Decentralized Storage',
    description: '0G Network provides censorship-resistant storage for all analysis results with cryptographic verification.',
  },
  {
    icon: CpuChipIcon,
    title: 'AI-Powered',
    description: 'Advanced machine learning models trained on thousands of contracts to detect patterns and risks.',
  },
  {
    icon: ChartBarIcon,
    title: 'Real-Time Analysis',
    description: 'Get instant results without waiting. Our distributed network ensures fast processing times.',
  },
];

const howOGPowers = [
  {
    title: '0G DA (Data Availability)',
    description: 'Ensures all analysis data is available and verifiable on the decentralized network.',
  },
  {
    title: '0G Storage',
    description: 'Stores analysis results permanently with cryptographic proofs at minimal cost.',
  },
  {
    title: '0G Compute',
    description: 'Runs risk analysis algorithms in TEE environments for secure computation.',
  },
];

const faqs = [
  {
    question: 'How accurate is the risk analysis?',
    answer: 'Our AI models are trained on extensive datasets of smart contracts, including known scams and verified safe contracts. While no analysis is 100% foolproof, our system provides reliable risk indicators to inform your decisions.',
  },
  {
    question: 'What networks are supported?',
    answer: 'Currently, we support Ethereum, Binance Smart Chain (BSC), and Polygon. More networks will be added based on community demand.',
  },
  {
    question: 'Is my data private?',
    answer: 'Yes! All analyses run in Trusted Execution Environments (TEE), and results are stored on decentralized infrastructure. We do not collect or store personal information.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Analysis is currently free for all users! Our operational costs are 96% lower than traditional solutions thanks to 0G Network, allowing us to offer the service at no charge.',
  },
  {
    question: 'Can I use this for investment decisions?',
    answer: 'Our analysis provides risk indicators and should be used as one tool in your research process. Always do your own due diligence and never invest more than you can afford to lose.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Hero */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SafeGuard AI
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Democratizing DeFi security through decentralized AI infrastructure
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-12 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{mission.title}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{mission.description}</p>
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-slate-600">
              Comprehensive security analysis at your fingertips
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 0G Network Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by 0G Network
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              The first decentralized AI operating system enabling scalable, secure, and cost-effective analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howOGPowers.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" size="lg" asChild>
              <a href="https://0g.ai" target="_blank" rel="noopener noreferrer">
                Learn More About 0G
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-slate-600">
              Built with cutting-edge technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Next.js 14', category: 'Frontend' },
              { name: 'Node.js', category: 'Backend' },
              { name: 'ethers.js', category: 'Blockchain' },
              { name: '0G Network', category: 'Infrastructure' },
              { name: 'TypeScript', category: 'Language' },
              { name: 'Tailwind CSS', category: 'Styling' },
              { name: 'TEE', category: 'Security' },
              { name: 'AI/ML Models', category: 'Analysis' },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="font-semibold text-slate-900">{tech.name}</p>
                    <p className="text-xs text-slate-600 mt-1">{tech.category}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Analyze?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start protecting your DeFi investments today
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/analyze">Analyze Contract Now</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
