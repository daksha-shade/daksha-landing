"use client"
import { useState } from 'react'
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Mic,
  Database,
  Download,
  Trash2,
  Save,
  ArrowLeft,
  FileText,
  Users,
  Baby,
  Plus,
  Edit3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [settings, setSettings] = useState({
    // Profile
    displayName: 'Shaswat Raj',
    email: 'shaswat@example.com',
    bio: 'Software engineer passionate about AI and building products that help people',

    // Custom Context
    customContext: 'My name is Shaswat Raj and I am a software engineer and I am 20 years old. I work on AI and web development projects. I am passionate about building products that help people. I enjoy coding, learning new technologies, and solving complex problems.',

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    journalReminders: true,
    goalDeadlines: true,
    weeklyReports: true,

    // Privacy
    profileVisibility: 'private',
    dataSharing: false,
    analyticsTracking: true,

    // Partner Sharing
    partnerSharingEnabled: false,
    sharedPartners: [],

    // Parental Controls
    parentalControlsEnabled: false,
    contentFiltering: 'moderate',
    timeRestrictions: false,

    // Appearance
    theme: 'system',
    fontSize: 'medium',
    compactMode: false,

    // Voice & AI
    voiceEnabled: true,
    autoTranscription: true,
    voiceLanguage: 'en-US',
    aiPersonality: 'thoughtful',

    // Data & Storage
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: '1year',
  })

  const settingSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'context', label: 'Custom Context', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'sharing', label: 'Partner Sharing', icon: Users },
    { id: 'parental', label: 'Parental Controls', icon: Baby },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'voice', label: 'Voice & AI', icon: Mic },
    { id: 'data', label: 'Data & Storage', icon: Database },
  ]

  const updateSetting = (key: string, value: string | boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="text-lg">SR</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <Button variant="outline" size="sm">Change Photo</Button>
          <Button variant="ghost" size="sm" className="text-destructive">Remove Photo</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Display Name</label>
          <Input
            value={settings.displayName}
            onChange={(e) => updateSetting('displayName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            value={settings.email}
            onChange={(e) => updateSetting('email', e.target.value)}
            type="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bio</label>
        <Textarea
          rows={3}
          value={settings.bio}
          onChange={(e) => updateSetting('bio', e.target.value)}
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  )

  const renderCustomContextSection = () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Custom Context File</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              This context will be prioritized over your journal entries when Daksha generates responses.
              Include key information about yourself that you want Daksha to always remember.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Your Personal Context</label>
        <Textarea
          value={settings.customContext}
          onChange={(e) => updateSetting('customContext', e.target.value)}
          placeholder="e.g., My name is John Doe, I'm a 25-year-old software engineer working at Tech Corp. I'm passionate about AI and machine learning. I live in San Francisco and enjoy hiking on weekends..."
          rows={8}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          {settings.customContext.length}/2000 characters
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          Save Context
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit3 className="w-4 h-4" />
          Preview
        </Button>
      </div>

      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Tips for effective context:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>- Include your name, age, profession, and key interests</li>
          <li>- Mention your goals and current projects</li>
          <li>- Add personality traits and communication preferences</li>
          <li>- Include important relationships and commitments</li>
          <li>- Keep it concise but comprehensive</li>
        </ul>
      </div>
    </div>
  )

  const renderPartnerSharingSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
        <div>
          <p className="font-medium">Enable Partner Sharing</p>
          <p className="text-sm text-muted-foreground">Allow trusted partners to access shared content</p>
        </div>
        <Switch
          checked={settings.partnerSharingEnabled}
          onCheckedChange={(checked) => updateSetting('partnerSharingEnabled', checked)}
        />
      </div>

      {settings.partnerSharingEnabled && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Shared Partners</h3>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Partner
            </Button>
          </div>

          <div className="text-center p-6 border border-dashed border-border rounded-lg">
            <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No partners added yet</p>
            <Button variant="outline" size="sm" className="mt-2 gap-2">
              <Plus className="w-4 h-4" />
              Invite Partner
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Sharing Permissions</h3>
            <div className="space-y-3">
              {[
                { key: 'shareJournal', label: 'Journal Entries', description: 'Share selected journal entries' },
                { key: 'shareGoals', label: 'Goals & Progress', description: 'Share goal tracking and progress' },
                { key: 'shareMemories', label: 'Memories', description: 'Share photos and memory vault' },
                { key: 'shareInsights', label: 'AI Insights', description: 'Share Daksha insights about you' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border border-border/30">
                  <div>
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderParentalControlsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
        <div>
          <p className="font-medium">Enable Parental Controls</p>
          <p className="text-sm text-muted-foreground">Restrict content and features for younger users</p>
        </div>
        <Switch
          checked={settings.parentalControlsEnabled}
          onCheckedChange={(checked) => updateSetting('parentalControlsEnabled', checked)}
        />
      </div>

      {settings.parentalControlsEnabled && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Content Filtering Level</label>
            <Select value={settings.contentFiltering} onValueChange={(value) => updateSetting('contentFiltering', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strict">Strict - Maximum filtering</SelectItem>
                <SelectItem value="moderate">Moderate - Balanced filtering</SelectItem>
                <SelectItem value="minimal">Minimal - Basic filtering only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
            <div>
              <p className="font-medium">Time Restrictions</p>
              <p className="text-sm text-muted-foreground">Limit usage during certain hours</p>
            </div>
            <Switch
              checked={settings.timeRestrictions}
              onCheckedChange={(checked) => updateSetting('timeRestrictions', checked)}
            />
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-3">
              <Baby className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h3 className="font-medium text-orange-900 dark:text-orange-100">Parental Control Notice</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  These settings help create a safer environment for younger users.
                  Some features may be limited when parental controls are enabled.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      {[
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser and mobile notifications' },
        { key: 'journalReminders', label: 'Journal Reminders', description: 'Daily reminders to journal' },
        { key: 'goalDeadlines', label: 'Goal Deadlines', description: 'Alerts for upcoming goal deadlines' },
        { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary of your weekly progress' },
      ].map((item) => (
        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-border/30">
          <div>
            <p className="font-medium">{item.label}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <Switch
            checked={settings[item.key as keyof typeof settings] as boolean}
            onCheckedChange={(checked) => updateSetting(item.key, checked)}
          />
        </div>
      ))}
    </div>
  )

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Profile Visibility</label>
          <Select value={settings.profileVisibility} onValueChange={(value) => updateSetting('profileVisibility', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="friends">Friends Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {[
            { key: 'dataSharing', label: 'Data Sharing', description: 'Allow anonymized data for research' },
            { key: 'analyticsTracking', label: 'Analytics Tracking', description: 'Help improve Daksha with usage analytics' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-border/30">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch
                checked={settings[item.key as keyof typeof settings] as boolean}
                onCheckedChange={(checked) => updateSetting(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Theme</label>
        <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Font Size</label>
        <Select value={settings.fontSize} onValueChange={(value) => updateSetting('fontSize', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
        <div>
          <p className="font-medium">Compact Mode</p>
          <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
        </div>
        <Switch
          checked={settings.compactMode}
          onCheckedChange={(checked) => updateSetting('compactMode', checked)}
        />
      </div>
    </div>
  )

  const renderVoiceSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
        <div>
          <p className="font-medium">Voice Input</p>
          <p className="text-sm text-muted-foreground">Enable voice commands and dictation</p>
        </div>
        <Switch
          checked={settings.voiceEnabled}
          onCheckedChange={(checked) => updateSetting('voiceEnabled', checked)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Voice Language</label>
        <Select value={settings.voiceLanguage} onValueChange={(value) => updateSetting('voiceLanguage', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">English (US)</SelectItem>
            <SelectItem value="en-GB">English (UK)</SelectItem>
            <SelectItem value="es-ES">Spanish</SelectItem>
            <SelectItem value="fr-FR">French</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">AI Personality</label>
        <Select value={settings.aiPersonality} onValueChange={(value) => updateSetting('aiPersonality', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thoughtful">Thoughtful</SelectItem>
            <SelectItem value="encouraging">Encouraging</SelectItem>
            <SelectItem value="analytical">Analytical</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const renderDataSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
        <div>
          <p className="font-medium">Auto Backup</p>
          <p className="text-sm text-muted-foreground">Automatically backup your data</p>
        </div>
        <Switch
          checked={settings.autoBackup}
          onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Backup Frequency</label>
        <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full gap-2">
          <Download className="w-4 h-4" />
          Export All Data
        </Button>

        <Button variant="destructive" className="w-full gap-2">
          <Trash2 className="w-4 h-4" />
          Delete All Data
        </Button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection()
      case 'context': return renderCustomContextSection()
      case 'notifications': return renderNotificationsSection()
      case 'privacy': return renderPrivacySection()
      case 'sharing': return renderPartnerSharingSection()
      case 'parental': return renderParentalControlsSection()
      case 'appearance': return renderAppearanceSection()
      case 'voice': return renderVoiceSection()
      case 'data': return renderDataSection()
      default: return renderProfileSection()
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/app">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Settings
          </h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {settingSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                      }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const Icon = settingSections.find(s => s.id === activeSection)?.icon
                  return Icon ? <Icon className="w-5 h-5" /> : null
                })()}
                {settingSections.find(s => s.id === activeSection)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}