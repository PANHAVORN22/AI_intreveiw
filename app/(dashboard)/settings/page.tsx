'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Lock, Eye, Code, Database, Save, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'Tech Corp Inc.',
    timezone: 'America/Los_Angeles',
    language: 'English',
    emailNotifications: true,
    interviewReminders: true,
    weeklyReports: true,
    showPublicProfile: true,
    twoFactorEnabled: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ai-text-primary mb-2">Settings</h1>
          <p className="text-ai-text-muted">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-ai-card-bg border border-ai-border rounded-xl overflow-hidden">
              {[
                { id: 'general', label: 'General', icon: Database },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'privacy', label: 'Privacy & Security', icon: Lock },
                { id: 'api', label: 'API Keys', icon: Code },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-6 py-4 border-b border-ai-border last:border-b-0 transition-colors ${
                    activeTab === id ? 'bg-ai-violet/20 text-ai-violet' : 'text-ai-text-secondary hover:bg-ai-border/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </div>
                  {activeTab === id && <ChevronRight className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="bg-ai-card-bg border border-ai-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-ai-text-primary mb-6">General Settings</h2>

                <div className="space-y-6">
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-ai-text-secondary mb-2">Company Name</label>
                    <Input
                      name="companyName"
                      value={settings.companyName}
                      onChange={handleInputChange}
                      className="bg-background border border-ai-border text-ai-text-primary focus:border-ai-violet"
                    />
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-ai-text-secondary mb-2">Timezone</label>
                    <select
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-ai-border rounded-lg text-ai-text-primary focus:border-ai-violet focus:outline-none"
                    >
                      <option>America/Los_Angeles</option>
                      <option>America/New_York</option>
                      <option>Europe/London</option>
                      <option>Asia/Tokyo</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-ai-text-secondary mb-2">Language</label>
                    <select
                      name="language"
                      value={settings.language}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-ai-border rounded-lg text-ai-text-primary focus:border-ai-violet focus:outline-none"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>

                  <Button className="bg-ai-violet hover:bg-ai-violet/90 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="bg-ai-card-bg border border-ai-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-ai-text-primary mb-6">Notification Settings</h2>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-4 border border-ai-border rounded-lg hover:bg-ai-border/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <Bell className="w-5 h-5 text-ai-violet" />
                      <div>
                        <p className="font-medium text-ai-text-primary">Email Notifications</p>
                        <p className="text-sm text-ai-text-muted">Receive email updates about your account</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('emailNotifications')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.emailNotifications ? 'bg-ai-violet' : 'bg-ai-border'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.emailNotifications ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Interview Reminders */}
                  <div className="flex items-center justify-between p-4 border border-ai-border rounded-lg hover:bg-ai-border/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <Bell className="w-5 h-5 text-ai-cyan" />
                      <div>
                        <p className="font-medium text-ai-text-primary">Interview Reminders</p>
                        <p className="text-sm text-ai-text-muted">Get reminders before upcoming interviews</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('interviewReminders')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.interviewReminders ? 'bg-ai-cyan' : 'bg-ai-border'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.interviewReminders ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Weekly Reports */}
                  <div className="flex items-center justify-between p-4 border border-ai-border rounded-lg hover:bg-ai-border/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <Bell className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="font-medium text-ai-text-primary">Weekly Reports</p>
                        <p className="text-sm text-ai-text-muted">Receive weekly performance reports</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('weeklyReports')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.weeklyReports ? 'bg-green-400' : 'bg-ai-border'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.weeklyReports ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Security */}
            {activeTab === 'privacy' && (
              <div className="bg-ai-card-bg border border-ai-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-ai-text-primary mb-6">Privacy & Security</h2>

                <div className="space-y-6">
                  {/* Public Profile */}
                  <div className="flex items-center justify-between p-4 border border-ai-border rounded-lg hover:bg-ai-border/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <Eye className="w-5 h-5 text-ai-text-muted" />
                      <div>
                        <p className="font-medium text-ai-text-primary">Public Profile</p>
                        <p className="text-sm text-ai-text-muted">Allow others to see your profile</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('showPublicProfile')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.showPublicProfile ? 'bg-ai-violet' : 'bg-ai-border'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.showPublicProfile ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between p-4 border border-ai-border rounded-lg hover:bg-ai-border/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <Lock className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="font-medium text-ai-text-primary">Two-Factor Authentication</p>
                        <p className="text-sm text-ai-text-muted">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle('twoFactorEnabled')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        settings.twoFactorEnabled ? 'bg-red-400' : 'bg-ai-border'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.twoFactorEnabled ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  <Button variant="outline" className="border-ai-border text-ai-text-secondary hover:bg-ai-border/20 w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            )}

            {/* API Keys */}
            {activeTab === 'api' && (
              <div className="bg-ai-card-bg border border-ai-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-ai-text-primary mb-6">API Keys</h2>

                <div className="space-y-6">
                  <p className="text-ai-text-muted">Manage your API keys for programmatic access to InterviewAI</p>

                  {/* API Key List */}
                  <div className="space-y-4">
                    <div className="p-4 border border-ai-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-ai-text-primary">Production API Key</p>
                          <p className="text-sm text-ai-text-muted">sk_live_abc123...xyz</p>
                        </div>
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-300 text-xs font-medium">Active</span>
                      </div>
                      <p className="text-xs text-ai-text-muted mb-3">Last used: 2 hours ago</p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-ai-border text-ai-text-secondary hover:bg-ai-border/20 text-sm">
                          Regenerate
                        </Button>
                        <Button variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/10 text-sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-ai-violet hover:bg-ai-violet/90 text-white">
                    <Code className="w-4 h-4 mr-2" />
                    Create New API Key
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
