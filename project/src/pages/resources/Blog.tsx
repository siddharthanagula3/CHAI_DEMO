import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag, Share2, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'All',
    'Health Tips',
    'Fitness',
    'Nutrition',
    'Mental Health',
    'Technology',
    'Success Stories'
  ];

  const blogPosts = [
    {
      title: '10 Tips for Better Sleep Tracking',
      excerpt: 'Learn how to optimize your sleep tracking for better insights and improved rest quality.',
      image: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      category: 'Health Tips',
      readTime: '5 min read'
    },
    {
      title: 'Understanding Body Composition Analysis',
      excerpt: 'A comprehensive guide to interpreting your body composition metrics and making improvements.',
      image: 'https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Mark Thompson',
      date: '2024-01-12',
      category: 'Fitness',
      readTime: '8 min read'
    },
    {
      title: 'AI in Healthcare: The Future is Here',
      excerpt: 'Explore how artificial intelligence is revolutionizing personal health tracking and analysis.',
      image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Tech Health Team',
      date: '2024-01-10',
      category: 'Technology',
      readTime: '6 min read'
    },
    {
      title: 'Nutrition Tracking Made Simple',
      excerpt: 'Tips and tricks for effective nutrition logging and understanding your eating habits.',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Emma Rodriguez',
      date: '2024-01-08',
      category: 'Nutrition',
      readTime: '4 min read'
    },
    {
      title: 'Mental Wellness Through Technology',
      excerpt: 'How modern apps and AI can help maintain and improve your mental health.',
      image: 'https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Dr. Michael Brown',
      date: '2024-01-05',
      category: 'Mental Health',
      readTime: '7 min read'
    },
    {
      title: 'From Couch to 5K: A Success Story',
      excerpt: 'Read how John used Complete Health AI to achieve his fitness goals.',
      image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'John Smith',
      date: '2024-01-03',
      category: 'Success Stories',
      readTime: '5 min read'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || 
                          post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <BookOpen className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Health & Wellness Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover insights, tips, and success stories to help you on your health journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white dark:bg-primary-500'
                      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="rounded-full bg-primary-500 px-3 py-1 text-sm text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <BookOpen className="mr-1 h-4 w-4" />
                    {post.readTime}
                  </span>
                  <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 rounded-lg bg-primary-50 p-8 dark:bg-primary-900/30">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Get the latest health tips and wellness insights delivered to your inbox.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button className="rounded-lg bg-primary-600 px-6 py-2 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;