import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, Scale, Shield, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using Complete Health AI, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using our services, you shall be subject to any posted guidelines or rules applicable to such services.`
    },
    {
      title: 'Description of Service',
      content: `Complete Health AI provides an AI-powered health tracking and wellness platform. The service includes:
        • Health and fitness tracking
        • AI-generated insights and recommendations
        • Voice command functionality
        • Video summary generation
        • Data visualization and analysis`
    },
    {
      title: 'User Responsibilities',
      content: `As a user of the service, you agree to:
        • Provide accurate information
        • Maintain the security of your account
        • Not share account credentials
        • Use the service as intended
        • Comply with all applicable laws`
    },
    {
      title: 'Premium Services',
      content: `Premium features are available through paid subscriptions. Terms for premium services include:
        • Automatic renewal unless cancelled
        • Pro-rated refunds for cancellations
        • Access to premium features
        • Priority support
        • Advanced AI capabilities`
    },
    {
      title: 'Data Usage',
      content: `We collect and process data in accordance with our Privacy Policy. This includes:
        • Personal information
        • Health and fitness data
        • Usage statistics
        • Device information
        • Communication preferences`
    },
    {
      title: 'Intellectual Property',
      content: `All content and functionality on Complete Health AI is the exclusive property of our company and is protected by copyright, trademark, and other laws.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900"
          >
            <FileText className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="flex items-center">
            <AlertCircle className="mr-4 h-6 w-6 text-primary-600" />
            <p className="text-gray-700 dark:text-gray-300">
              Please read these Terms of Service carefully before using Complete Health AI.
              Your access to and use of the service is conditioned on your acceptance of and
              compliance with these terms.
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {section.title}
              </h2>
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Limitation of Liability */}
        <div className="mt-12 rounded-lg bg-warning-50 p-8 dark:bg-warning-900/30">
          <div className="flex items-center">
            <Scale className="mr-4 h-6 w-6 text-warning-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Limitation of Liability
            </h2>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Complete Health AI and its affiliates shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </div>

        {/* Privacy & Security */}
        <div className="mt-8 rounded-lg bg-primary-50 p-8 dark:bg-primary-900/30">
          <div className="flex items-center">
            <Shield className="mr-4 h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Privacy & Security
            </h2>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Your use of Complete Health AI is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand how we collect, use, and
            protect your information.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-12 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="flex items-center">
            <HelpCircle className="mr-4 h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Questions?
            </h2>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Email: legal@completehealthai.com</li>
            <li>Address: 123 Health Street, San Francisco, CA 94105</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>

        {/* Last Updated */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          These terms of service were last updated on January 15, 2024.
          We reserve the right to update these terms at any time.
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;