import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      icon: <Database className="h-6 w-6 text-primary-600" />,
      title: 'Data Collection',
      content: `We collect information that you provide directly to us, including:
        • Personal information (name, email, date of birth)
        • Health and fitness data
        • Device and usage information
        • Communication preferences`
    },
    {
      icon: <Eye className="h-6 w-6 text-secondary-600" />,
      title: 'Data Usage',
      content: `Your data is used to:
        • Provide and improve our services
        • Generate personalized health insights
        • Create AI-powered recommendations
        • Enhance user experience
        • Maintain service security`
    },
    {
      icon: <Lock className="h-6 w-6 text-accent-600" />,
      title: 'Data Security',
      content: `We implement robust security measures:
        • End-to-end encryption
        • Regular security audits
        • Secure data storage
        • Access controls
        • Continuous monitoring`
    },
    {
      icon: <UserCheck className="h-6 w-6 text-success-600" />,
      title: 'Your Rights',
      content: `You have the right to:
        • Access your data
        • Request data deletion
        • Opt-out of data sharing
        • Update your information
        • Export your data`
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
            <Shield className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300">
            At Complete Health AI, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our service. Please read this privacy
            policy carefully. If you do not agree with the terms of this privacy policy, please do not access
            the application.
          </p>
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
              <div className="mb-4 flex items-center">
                <div className="mr-4 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GDPR Compliance */}
        <div className="mt-12 rounded-lg bg-primary-50 p-8 dark:bg-primary-900/30">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            GDPR Compliance
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            We are committed to ensuring GDPR compliance and protecting the rights of EU citizens:
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
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
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Email: privacy@completehealthai.com</li>
            <li>Address: 123 Health Street, San Francisco, CA 94105</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>

        {/* Last Updated */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          This privacy policy was last updated on January 15, 2024.
          We reserve the right to make changes to this policy at any time.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;