'use client';

import { useState } from 'react';
import { TemplateCard } from '@/components/resources/TemplateCard';
import { GuideCard } from '@/components/resources/GuideCard';
import { SnippetCard } from '@/components/resources/SnippetCard';
import { ResourceFilter } from '@/components/resources/ResourceFilter';
import { BookOpen } from 'lucide-react';

export default function ResourceLibraryPage() {
  const [currentTab, setCurrentTab] = useState('All');
  const resourceTemplates: never[] = [];
  const guides: never[] = [];
  const codeSnippets: never[] = [];

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
              <div className="rounded-lg border border-dashed border-ai-border p-6 text-sm text-ai-text-muted">
                No resource templates have been loaded yet.
              </div>
            </div>

            {/* Row 2: Guides on left, Remaining Templates on right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Guides Section - 1 column */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-lg font-bold text-ai-text-primary">Guides & Articles</h2>
                <div className="rounded-lg border border-dashed border-ai-border p-6 text-sm text-ai-text-muted">
                  No guides available yet.
                </div>
              </div>

              {/* More Templates - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-bold text-ai-text-primary">More Templates</h2>
                <div className="rounded-lg border border-dashed border-ai-border p-6 text-sm text-ai-text-muted">
                  More templates will appear here once the library is connected.
                </div>
              </div>
            </div>

            {/* Row 3: Code Snippets Grid */}
            <div>
              <h2 className="text-lg font-bold text-ai-text-primary mb-4">Code Snippets</h2>
              <div className="rounded-lg border border-dashed border-ai-border p-6 text-sm text-ai-text-muted">
                No snippets loaded yet.
              </div>
            </div>

            {/* Row 4: Remaining guides and templates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* More guides */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-ai-text-primary">More Guides</h2>
                <div className="rounded-lg border border-dashed border-ai-border p-6 text-sm text-ai-text-muted">
                  Additional guides will appear here once available.
                </div>
              </div>

              {/* Last templates */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-bold text-ai-text-primary">Additional Resources</h2>
                <div className="rounded-lg border border-dashed border-ai-border p-6 text-sm text-ai-text-muted">
                  Additional resources will show up here when loaded.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
