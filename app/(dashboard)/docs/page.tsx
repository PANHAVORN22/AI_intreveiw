'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Code, HelpCircle, Zap, ChevronRight, ExternalLink } from 'lucide-react';

const docs = [
  {
    category: 'Getting Started',
    icon: Zap,
    items: [
      {
        title: 'Introduction',
        description: 'Get familiar with InterviewAI platform basics',
        readTime: 5,
      },
      {
        title: 'Quick Start Guide',
        description: 'Set up your first interview in minutes',
        readTime: 8,
      },
      {
        title: 'Platform Overview',
        description: 'Explore all features and capabilities',
        readTime: 12,
      },
    ],
  },
  {
    category: 'Interview Templates',
    icon: BookOpen,
    items: [
      {
        title: 'Creating Templates',
        description: 'How to create and customize interview templates',
        readTime: 15,
      },
      {
        title: 'Template Library',
        description: 'Browse pre-built templates for different roles',
        readTime: 10,
      },
      {
        title: 'Best Practices',
        description: 'Tips for designing effective interview templates',
        readTime: 12,
      },
    ],
  },
  {
    category: 'API Reference',
    icon: Code,
    items: [
      {
        title: 'Authentication',
        description: 'Learn how to authenticate API requests',
        readTime: 6,
      },
      {
        title: 'Interviews Endpoint',
        description: 'Manage interviews programmatically',
        readTime: 14,
      },
      {
        title: 'Candidates Endpoint',
        description: 'Work with candidate data via API',
        readTime: 12,
      },
      {
        title: 'Webhooks',
        description: 'Set up real-time event notifications',
        readTime: 10,
      },
    ],
  },
  {
    category: 'FAQs',
    icon: HelpCircle,
    items: [
      {
        title: 'Common Questions',
        description: 'Answers to frequently asked questions',
        readTime: 8,
      },
      {
        title: 'Troubleshooting',
        description: 'Resolve common issues and errors',
        readTime: 10,
      },
      {
        title: 'Pricing & Billing',
        description: 'Information about plans and billing',
        readTime: 7,
      },
    ],
  },
];

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('Getting Started');

  const filteredDocs = docs
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-ai-text-primary mb-4">Documentation</h1>
          <p className="text-xl text-ai-text-muted mb-8">Learn how to use InterviewAI and build amazing interview experiences</p>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
            <Input
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-ai-card-bg border border-ai-border text-ai-text-primary placeholder-ai-text-muted focus:border-ai-violet text-base"
            />
          </div>
        </div>

        {/* Documentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-2">
              <h3 className="text-sm font-semibold text-ai-text-muted uppercase tracking-wider mb-4">Categories</h3>
              {docs.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setExpandedCategory(expandedCategory === category.category ? '' : category.category)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    expandedCategory === category.category
                      ? 'bg-ai-violet/20 text-ai-violet border border-ai-violet/50'
                      : 'text-ai-text-secondary hover:bg-ai-border/30'
                  }`}
                >
                  <span className="font-medium">{category.category}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${expandedCategory === category.category ? 'rotate-90' : ''}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {filteredDocs.length > 0 ? (
              <div className="space-y-8">
                {filteredDocs.map((category) => (
                  <div key={category.category}>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ai-border">
                      <category.icon className="w-6 h-6 text-ai-violet" />
                      <h2 className="text-2xl font-bold text-ai-text-primary">{category.category}</h2>
                    </div>

                    <div className="space-y-4">
                      {category.items.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block p-5 border border-ai-border rounded-lg hover:border-ai-violet hover:bg-ai-violet/5 transition-all group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-ai-text-primary group-hover:text-ai-violet transition-colors">
                              {item.title}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-ai-text-muted group-hover:text-ai-violet transition-colors opacity-0 group-hover:opacity-100" />
                          </div>
                          <p className="text-sm text-ai-text-muted mb-3">{item.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-ai-card-bg text-ai-text-secondary px-2 py-1 rounded">
                              {item.readTime} min read
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-ai-text-muted mb-6">No documentation found matching your search</p>
                <Button
                  onClick={() => setSearchTerm('')}
                  className="bg-ai-violet hover:bg-ai-violet/90 text-white"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 bg-ai-card-bg border border-ai-border rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-ai-text-primary mb-4">Can&apos;t find what you&apos;re looking for?</h3>
          <p className="text-ai-text-muted mb-6">Contact our support team for additional assistance</p>
          <Button className="bg-ai-violet hover:bg-ai-violet/90 text-white">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
