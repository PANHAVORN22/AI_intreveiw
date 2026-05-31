'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CandidateOption = {
  id: string;
  full_name: string;
  email: string;
};

type NewInterviewSessionFormProps = {
  candidates: CandidateOption[];
  interviewerId: string;
};

export function NewSessionForm({ candidates, interviewerId }: NewInterviewSessionFormProps) {
  const router = useRouter();
  const [candidateId, setCandidateId] = useState(candidates[0]?.id ?? 'new');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [interviewType, setInterviewType] = useState('Frontend');
  const [language, setLanguage] = useState('typescript');
  const [difficulty, setDifficulty] = useState('3');
  const [duration, setDuration] = useState('60');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);

    try {
      let resolvedCandidateId = candidateId;

      if (candidateId === 'new') {
        if (!candidateName.trim()) {
          toast.error('Candidate name is required.');
          setIsCreating(false);
          return;
        }

        const res = await fetch('/api/profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: candidateName.trim(), role: 'candidate' }),
        })
        const created = await res.json()
        if (!res.ok) throw new Error(created?.error || 'Candidate could not be created.')
        resolvedCandidateId = created.id
      }

      const sessionCode = `SES-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      const sessRes = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate_id: resolvedCandidateId,
          interviewer_id: interviewerId,
          problem_id: null,
          status: 'active',
          room_code: sessionCode,
          started_at: new Date().toISOString(),
        }),
      })
      const sessionData = await sessRes.json()
      if (!sessRes.ok) throw new Error(sessionData?.error || 'Session could not be created.')

      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionData.id,
          role: 'assistant',
          content: `Welcome. We will start with a ${interviewType.toLowerCase()} coding exercise in ${language}.`,
        }),
      })

      toast.success('Session created.')
      router.push(`/interviewer/sessions/${sessionData.id}`)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not create interview session.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-ai-card-bg border border-ai-border rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="candidate">Candidate</Label>
          <Select value={candidateId} onValueChange={setCandidateId}>
            <SelectTrigger id="candidate">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New candidate</SelectItem>
              {candidates.map((candidate) => (
                <SelectItem key={candidate.id} value={candidate.id}>
                  {candidate.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Interview type</Label>
          <Select value={interviewType} onValueChange={setInterviewType}>
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Full-Stack">Full-Stack</SelectItem>
              <SelectItem value="System Design">System Design</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {candidateId === 'new' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="candidateName">Candidate name</Label>
            <Input
              id="candidateName"
              value={candidateName}
              onChange={(event) => setCandidateName(event.target.value)}
              placeholder="Alex Johnson"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="candidateEmail">Candidate email</Label>
            <Input
              id="candidateEmail"
              type="email"
              value={candidateEmail}
              onChange={(event) => setCandidateEmail(event.target.value)}
              placeholder="alex@example.com"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger id="difficulty">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration minutes</Label>
          <Input
            id="duration"
            type="number"
            min="15"
            max="180"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>
      </div>

      <Button type="submit" disabled={isCreating} className="bg-ai-violet hover:bg-ai-violet/90 gap-2">
        {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarPlus className="w-4 h-4" />}
        Create session
      </Button>
    </form>
  );
}
