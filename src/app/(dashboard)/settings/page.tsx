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
  Moon, 
  Sun, 
  Monitor,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Save,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [settings, setSettings] = useState({
    // Profile
    displayName: 'John Doe',
    email: 'john@example.com',
    bio: 'Entrepreneur and lifelong learner',
    
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
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'voice', label: 'Voice & AI', icon: Mic },
    { id: 'data', label: 'Data & Storage', icon: Database },
  ]

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="text-lg">JD</AvatarFallback>
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
        <textarea 
          className="w-full p-3 border border-border rounded-lg resize-none"
          rows={3}
          value={settings.bio}
          onChange={(e) => updateSetting('bio', e.target.value)}
          placeholder="Tell us about yourself..."
        />
      </div>
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
        
        <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
          <div>
            <p className="font-medium">Data Sharing</p>
            <p className="text-sm text-muted-foreground">Share anonymized data to improve Daksha</p>
          </div>
          <Switch 
            checked={settings.dataSharing}
            onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
          <div>
            <p className="font-medium">Analytics Tracking</p>
            <p className="text-sm text-muted-foreground">Help us improve with usage analytics</p>
          </div>
          <Switch 
            checked={settings.analyticsTracking}
            onCheckedChange={(checked) => updateSetting('analyticsTracking', checked)}
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h4 className="font-medium text-destructive">Danger Zone</h4>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Download className="w-4 h-4" />
            Export All Data
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 text-destructive border-destructive">
            <Trash2 className="w-4 h-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'system', label: 'System', icon: Monitor },
            ].map((theme) => (
              <button
                key={theme.value}
                onClick={() => updateSetting('theme', theme.value)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  settings.theme === theme.value 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border/30 hover:border-border/50'
                }`}
              >
                <theme.icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{theme.label}</p>
              </button>
            ))}
          </div>
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
      
      <div className="space-y-4">
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
              <SelectItem value="de-DE">German</SelectItem>
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
        
        <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
          <div>
            <p className="font-medium">Auto Transcription</p>
            <p className="text-sm text-muted-foreground">Automatically convert voice to text</p>
          </div>
          <Switch 
            checked={settings.autoTranscription}
            onCheckedChange={(checked) => updateSetting('autoTranscription', checked)}
          />
        </div>
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
      
      <div className="space-y-4">
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
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Data Retention</label>
          <Select value={settings.dataRetention} onValueChange={(value) => updateSetting('dataRetention', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
              <SelectItem value="forever">Forever</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="p-4 rounded-lg bg-muted/30">
        <h4 className="font-medium mb-2">Storage Usage</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Journal Entries</span>
            <span>2.3 MB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Voice Recordings</span>
            <span>45.7 MB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Attachments</span>
            <span>12.1 MB</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm font-medium">
            <span>Total</span>
            <span>60.1 MB</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection()
      case 'notifications': return renderNotificationsSection()
      case 'privacy': return renderPrivacySection()
      case 'appearance': return renderAppearanceSection()
      case 'voice': return renderVoiceSection()
      case 'data': return renderDataSection()
      default: return renderProfileSection()
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="notion-title font-serif text-foreground text-3xl">
                  Settings
                </h1>
                <p className="text-muted-foreground mt-1">
                  Customize your Daksha experience
                </p>
              </div>
            </div>
          </div>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="animate-in slide-in-from-left-4 fade-in duration-500">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card className="animate-in slide-in-from-right-4 fade-in duration-500 delay-150">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const Icon = settingSections.find(s => s.id === activeSection)?.icon;
                  return Icon ? <Icon className="w-5 h-5" /> : null;
                })()}
                {settingSections.find(s => s.id === activeSection)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderSection()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}