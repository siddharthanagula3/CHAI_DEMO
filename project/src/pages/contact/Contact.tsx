import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900"
          >
            <Mail className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Have questions? We're here to help. Reach out to our team for support,
            feedback, or inquiries.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900">
                  <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Email Us
                  </h3>
                  <a
                    href="mailto:support@completehealthai.com"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    support@completehealthai.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-secondary-100 p-3 dark:bg-secondary-900">
                  <Phone className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Call Us
                  </h3>
                  <a
                    href="tel:+15551234567"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    +1 (214) 940-6749
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-accent-100 p-3 dark:bg-accent-900">
                  <MapPin className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Visit Us
                  </h3>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    000 Summit Ave<br />
                    Arlington, TX 76013
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-success-100 p-3 dark:bg-success-900">
                  <Clock className="h-6 w-6 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Business Hours
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                    Saturday: 10:00 AM - 4:00 PM PST<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
                leftIcon={<Send size={16} />}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                How do I upgrade to Premium?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can upgrade to Premium from your account settings. Choose your preferred
                billing cycle and follow the payment instructions.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                Can I export my health data?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can export your health data in various formats from the settings
                page. Your data belongs to you.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                How secure is my health data?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We use industry-standard encryption and security measures to protect your
                data. Learn more in our Privacy Policy.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                What devices are supported?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our app works on all modern browsers and devices. We also support integration
                with popular fitness trackers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;