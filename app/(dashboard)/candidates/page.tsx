'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

// Candidates will be fetched from Supabase at runtime in the client.

type CandidateStatus = 'Active' | 'Interviewing' | 'Inactive';

type CandidateRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  // interview_sessions relation will be returned as an array of objects
  interview_sessions?: { id: string }[] | null;
};

type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  status: CandidateStatus;
  avatar: string;
  rating: number;
  interviews: number;
};

const statusColors: Record<CandidateStatus, string> = {
  Active: 'bg-green-500/20 text-green-300 border-green-500/30',
  Interviewing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Inactive: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

const normalizeStatus = (status: string | null): CandidateStatus => {
  if (!status) return 'Active';
  const normalized = `${status.charAt(0).toUpperCase()}${status.slice(1)}`;
  if (normalized === 'Active' || normalized === 'Interviewing' || normalized === 'Inactive') {
    return normalized;
  }
  return 'Active';
};

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let mounted = true;

    const fetchCandidates = async () => {
      setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, interview_sessions(id)')
          .eq('role', 'candidate')
          .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load candidates', error);
        setIsLoading(false);
        return;
      }

      if (!mounted) return;

      const rows = (data || []) as CandidateRow[];
      const normalized = rows.map((c) => {
        const fallbackSeed = c.full_name || c.id;
        return {
          id: c.id,
          name: c.full_name ?? 'Unknown Candidate',
          email: '',
          phone: '—',
          location: '—',
          position: '—',
          status: 'Active' as CandidateStatus,
          avatar: c.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fallbackSeed)}`,
          rating: 0,
          interviews: (c.interview_sessions && c.interview_sessions.length) ?? 0,
        };
      });

      setCandidates(normalized);
      setIsLoading(false);
    };

    fetchCandidates();

    return () => { mounted = false };
  }, []);

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
          {isLoading ? 'Loading candidates...' : `Showing ${filteredCandidates.length} of ${candidates.length} candidates`}
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
