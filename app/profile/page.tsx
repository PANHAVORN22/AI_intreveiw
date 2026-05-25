'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, User, Building, Phone, MapPin, Save, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    title: 'Senior Engineering Hiring Manager',
    company: 'Tech Corp Inc.',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate about building great teams and conducting effective technical interviews.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ai-text-primary mb-2">Profile Settings</h1>
          <p className="text-ai-text-muted">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-ai-card-bg border border-ai-border rounded-xl p-8 mb-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-ai-border">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <img src={profile.avatar} alt={profile.name} className="w-32 h-32 rounded-full border-2 border-ai-violet" />
              <Button variant="outline" className="border-ai-border text-ai-text-secondary hover:bg-ai-border/20">
                Change Avatar
              </Button>
            </div>

            {/* Name & Title */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-ai-text-primary mb-2">{profile.name}</h2>
              <p className="text-lg text-ai-violet mb-1">{profile.title}</p>
              <p className="text-sm text-ai-text-muted">{profile.company}</p>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <div className="flex items-center">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-ai-violet hover:bg-ai-violet/90 text-white"
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </div>

          {/* Edit Form */}
          {isEditing ? (
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-ai-text-secondary mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 bg-background border border-ai-border text-ai-text-primary focus:border-ai-violet"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-ai-text-secondary mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-background border border-ai-border text-ai-text-primary focus:border-ai-violet"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-ai-text-secondary mb-2">Job Title</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="pl-10 bg-background border border-ai-border text-ai-text-primary focus:border-ai-violet"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-ai-text-secondary mb-2">Company</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10 bg-background border border-ai-border text-ai-text-primary focus:border-ai-violet"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-ai-text-secondary mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 bg-background border border-ai-border text-ai-text-primary focus:border-ai-violet"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-ai-text-secondary mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-text-muted pointer-events-none" />
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-10 bg-background border border-ai-border text-ai-text-primary focus:border-ai-violet"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-ai-text-secondary mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-background border border-ai-border rounded-lg text-ai-text-primary placeholder-ai-text-muted focus:border-ai-violet focus:outline-none focus:ring-1 focus:ring-ai-violet/30"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button onClick={handleSave} className="bg-ai-violet hover:bg-ai-violet/90 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-ai-border text-ai-text-secondary hover:bg-ai-border/20"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            /* Read-only Profile */
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4 py-4 border-b border-ai-border">
                <Mail className="h-5 w-5 text-ai-text-muted" />
                <div>
                  <p className="text-sm text-ai-text-muted">Email Address</p>
                  <p className="text-ai-text-primary">{profile.email}</p>
                </div>
              </div>

              {/* Title */}
              <div className="flex items-center gap-4 py-4 border-b border-ai-border">
                <Building className="h-5 w-5 text-ai-text-muted" />
                <div>
                  <p className="text-sm text-ai-text-muted">Job Title</p>
                  <p className="text-ai-text-primary">{profile.title}</p>
                </div>
              </div>

              {/* Company */}
              <div className="flex items-center gap-4 py-4 border-b border-ai-border">
                <Building className="h-5 w-5 text-ai-text-muted" />
                <div>
                  <p className="text-sm text-ai-text-muted">Company</p>
                  <p className="text-ai-text-primary">{profile.company}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 py-4 border-b border-ai-border">
                <Phone className="h-5 w-5 text-ai-text-muted" />
                <div>
                  <p className="text-sm text-ai-text-muted">Phone Number</p>
                  <p className="text-ai-text-primary">{profile.phone}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 py-4 border-b border-ai-border">
                <MapPin className="h-5 w-5 text-ai-text-muted" />
                <div>
                  <p className="text-sm text-ai-text-muted">Location</p>
                  <p className="text-ai-text-primary">{profile.location}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="py-4">
                <p className="text-sm text-ai-text-muted mb-2">Bio</p>
                <p className="text-ai-text-primary">{profile.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="bg-ai-card-bg border border-ai-border rounded-xl p-8">
          <h3 className="text-xl font-bold text-ai-text-primary mb-6">Account Actions</h3>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-ai-border text-ai-text-secondary hover:bg-ai-border/20 justify-start"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full border-ai-border text-ai-text-secondary hover:bg-ai-border/20 justify-start"
            >
              Two-Factor Authentication
            </Button>
            <Button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 justify-start border border-red-500/30">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
