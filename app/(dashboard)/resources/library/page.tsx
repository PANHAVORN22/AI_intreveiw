'use client';

import { useState } from 'react';
import { resourceTemplates, guides, codeSnippets } from '@/lib/mock-data';
import { TemplateCard } from '@/components/resources/TemplateCard';
import { GuideCard } from '@/components/resources/GuideCard';
import { SnippetCard } from '@/components/resources/SnippetCard';
import { ResourceFilter } from '@/components/resources/ResourceFilter';
import { BookOpen } from 'lucide-react';

export default function ResourceLibraryPage() {
  const [currentTab, setCurrentTab] = useState('All');

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-ai-card-bg border-r border-ai-border p-6 overflow-y-auto flex-shrink-0">
        <ResourceFilter onTabChange={setCurrentTab} currentTab={currentTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-ai-violet/20 text-ai-violet">
                <BookOpen className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold text-ai-text-primary">Interview Resources</h1>
            </div>
            <p className="text-ai-text-muted">
              Discover interview templates, technical guides, and code snippets to ace your preparation.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="space-y-8">
            {/* Row 1: Large Templates */}
            <div>
              <h2 className="text-lg font-bold text-ai-text-primary mb-4">Featured Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {resourceTemplates.slice(0, 2).map((template) => (
                  <div key={template.id} style={{ gridColumn: 'span 1' }}>
                    <TemplateCard {...template} />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Guides on left, Remaining Templates on right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Guides Section - 1 column */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-lg font-bold text-ai-text-primary">Guides & Articles</h2>
                {guides.slice(0, 2).map((guide) => (
                  <GuideCard key={guide.id} {...guide} />
                ))}
              </div>

              {/* More Templates - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-bold text-ai-text-primary">More Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resourceTemplates.slice(2, 4).map((template) => (
                    <TemplateCard key={template.id} {...template} />
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: Code Snippets Grid */}
            <div>
              <h2 className="text-lg font-bold text-ai-text-primary mb-4">Code Snippets</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {codeSnippets.map((snippet) => (
                  <SnippetCard key={snippet.id} {...snippet} />
                ))}
              </div>
            </div>

            {/* Row 4: Remaining guides and templates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* More guides */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-ai-text-primary">More Guides</h2>
                {guides.slice(2, 4).map((guide) => (
                  <GuideCard key={guide.id} {...guide} />
                ))}
              </div>

              {/* Last templates */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-bold text-ai-text-primary">Additional Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resourceTemplates.slice(4, 6).map((template) => (
                    <TemplateCard key={template.id} {...template} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
