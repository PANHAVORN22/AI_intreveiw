'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const candidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 111-2222',
    location: 'San Francisco, CA',
    position: 'Senior Frontend Engineer',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 4.8,
    interviews: 3,
  },
  {
    id: 2,
    name: 'Marcus Williams',
    email: 'marcus.w@email.com',
    phone: '+1 (555) 222-3333',
    location: 'New York, NY',
    position: 'Backend Engineer',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    rating: 4.6,
    interviews: 2,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    email: 'emma.r@email.com',
    phone: '+1 (555) 333-4444',
    location: 'Austin, TX',
    position: 'Full-Stack Developer',
    status: 'Interviewing',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    rating: 4.5,
    interviews: 1,
  },
  {
    id: 4,
    name: 'James Park',
    email: 'james.park@email.com',
    phone: '+1 (555) 444-5555',
    location: 'Seattle, WA',
    position: 'DevOps Engineer',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 4.9,
    interviews: 4,
  },
  {
    id: 5,
    name: 'Olivia Bennett',
    email: 'olivia.b@email.com',
    phone: '+1 (555) 555-6666',
    location: 'Boston, MA',
    position: 'QA Engineer',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    rating: 4.3,
    interviews: 2,
  },
  {
    id: 6,
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 666-7777',
    location: 'Los Angeles, CA',
    position: 'Frontend Engineer',
    status: 'Inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    rating: 4.2,
    interviews: 1,
  },
  {
    id: 7,
    name: 'Jessica Martinez',
    email: 'jessica.m@email.com',
    phone: '+1 (555) 777-8888',
    location: 'Denver, CO',
    position: 'Data Engineer',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    rating: 4.7,
    interviews: 3,
  },
  {
    id: 8,
    name: 'Christopher Lee',
    email: 'chris.lee@email.com',
    phone: '+1 (555) 888-9999',
    location: 'Chicago, IL',
    position: 'Senior Backend Engineer',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
    rating: 4.9,
    interviews: 5,
  },
];

const statusColors = {
  Active: 'bg-green-500/20 text-green-300 border-green-500/30',
  Interviewing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Inactive: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-ai-text-primary mb-2">Candidates</h1>
              <p className="text-ai-text-muted">Manage all candidates and their interview history</p>
            </div>
            <Button className="bg-ai-violet hover:bg-ai-violet/90 text-white">Add Candidate</Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
              <Input
                placeholder="Search candidates by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-ai-card-bg border border-ai-border text-ai-text-primary placeholder-ai-text-muted focus:border-ai-violet"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-ai-card-bg border border-ai-border rounded-lg text-ai-text-primary focus:border-ai-violet focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Filter Button */}
            <Button variant="outline" className="border-ai-border text-ai-text-secondary hover:bg-ai-border/20">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-ai-text-muted mb-6">
          Showing {filteredCandidates.length} of {candidates.length} candidates
        </p>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-ai-card-bg border border-ai-border rounded-xl p-6 hover:border-ai-violet/50 transition-all duration-200">
              {/* Header with Avatar and Rating */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <img src={candidate.avatar} alt={candidate.name} className="w-16 h-16 rounded-full border-2 border-ai-violet" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-ai-text-primary">{candidate.name}</h3>
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-ai-violet/20 text-ai-violet">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{candidate.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-ai-text-muted">{candidate.position}</p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusColors[candidate.status as keyof typeof statusColors]}`}>
                  {candidate.status}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 py-4 border-y border-ai-border mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-ai-text-muted" />
                  <a href={`mailto:${candidate.email}`} className="text-ai-violet hover:text-ai-cyan transition-colors">
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-ai-text-muted" />
                  <span className="text-ai-text-secondary">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-ai-text-muted" />
                  <span className="text-ai-text-secondary">{candidate.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-background border border-ai-border">
                  <p className="text-xs text-ai-text-muted mb-1">Interviews</p>
                  <p className="text-2xl font-bold text-ai-text-primary">{candidate.interviews}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-ai-border">
                  <p className="text-xs text-ai-text-muted mb-1">Rating</p>
                  <p className="text-2xl font-bold text-ai-violet">{candidate.rating}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-ai-violet hover:bg-ai-violet/90 text-white">
                  View Profile
                </Button>
                <Button variant="outline" className="flex-1 border-ai-border text-ai-text-secondary hover:bg-ai-border/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ai-text-muted mb-4">No candidates found matching your search criteria</p>
            <Button className="bg-ai-violet hover:bg-ai-violet/90 text-white">
              Add Your First Candidate
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
