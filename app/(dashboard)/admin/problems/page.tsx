'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Problem, ProblemDifficulty } from '@/types';

type ProblemFormState = {
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  tags: string;
};

const emptyForm: ProblemFormState = {
  title: '',
  description: '',
  difficulty: 'medium',
  tags: '',
};

export default function AdminProblemsPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProblemFormState>(emptyForm);

  async function loadProblems() {
    setLoading(true);
    const { data, error } = await supabase
      .from('problems')
      .select('id, title, description, difficulty, tags, starter_code, test_cases, created_by, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setProblems((data ?? []) as Problem[]);
    setLoading(false);
  }

  useEffect(() => {
    void loadProblems();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (problem: Problem) => {
    setEditingId(problem.id);
    setForm({
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      tags: (problem.tags ?? []).join(', '),
    });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Title and description are required.');
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      difficulty: form.difficulty,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const { error } = editingId
      ? await supabase.from('problems').update(payload).eq('id', editingId)
      : await supabase.from('problems').insert(payload);

    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }

    toast.success(editingId ? 'Problem updated.' : 'Problem created.');
    resetForm();
    await loadProblems();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('problems').delete().eq('id', id);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Problem deleted.');
    await loadProblems();
  };

  const handleGenerate = async () => {
    if (!form.title.trim()) {
      toast.error('Enter a title before generating a problem.');
      return;
    }

    setSaving(true);
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        difficulty: form.difficulty,
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        save: false,
      }),
    });

    const data = (await response.json()) as { problem?: { description?: string; difficulty?: ProblemDifficulty; tags?: string[] } ; error?: string };
    if (!response.ok || !data.problem) {
      toast.error(data.error ?? 'Problem generation failed.');
      setSaving(false);
      return;
    }

    setForm((current) => ({
      ...current,
      description: data.problem?.description ?? current.description,
      difficulty: data.problem?.difficulty ?? current.difficulty,
      tags: data.problem?.tags?.join(', ') ?? current.tags,
    }));
    toast.success('Generated draft loaded.');
    setSaving(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ai-text-primary mb-2">Problem Bank</h1>
        <p className="text-ai-text-muted">Create, edit, generate, and delete interview problems.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
        <div className="rounded-lg border border-ai-border bg-ai-card-bg p-6 space-y-4 h-fit">
          <div>
            <h2 className="text-lg font-semibold text-ai-text-primary">{editingId ? 'Edit problem' : 'New problem'}</h2>
            <p className="text-sm text-ai-text-muted">Use AI to draft content, then save it to Supabase.</p>
          </div>

          <div className="space-y-3">
            <Input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Problem title"
            />
            <Select value={form.difficulty} onValueChange={(value) => setForm((current) => ({ ...current, difficulty: value as ProblemDifficulty }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={form.tags}
              onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
              placeholder="tags, comma, separated"
            />
            <Textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Problem description"
              className="min-h-52"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSave} disabled={saving} className="bg-ai-violet hover:bg-ai-violet/90 text-white">
              {editingId ? 'Update' : 'Create'}
            </Button>
            <Button variant="outline" onClick={handleGenerate} disabled={saving}>
              Generate draft
            </Button>
            {editingId && (
              <Button variant="outline" onClick={resetForm} disabled={saving}>
                Cancel
              </Button>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-ai-border bg-ai-card-bg overflow-hidden">
          <div className="border-b border-ai-border px-6 py-4">
            <h2 className="text-lg font-semibold text-ai-text-primary">Problems</h2>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-ai-text-muted">Loading problems...</div>
          ) : (
            <div className="divide-y divide-ai-border">
              {problems.map((problem) => (
                <div key={problem.id} className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-ai-text-primary">{problem.title}</h3>
                      <p className="text-sm text-ai-text-muted capitalize">{problem.difficulty}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEdit(problem)}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-500/30 text-red-300 hover:bg-red-500/10" onClick={() => handleDelete(problem.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-ai-text-secondary whitespace-pre-wrap line-clamp-4">{problem.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(problem.tags ?? []).map((tag) => (
                      <span key={tag} className="rounded-full border border-ai-border px-2 py-1 text-xs text-ai-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {problems.length === 0 && (
                <div className="p-6 text-sm text-ai-text-muted">No problems yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
