
import { useState } from 'react';
import { Settings as SettingsIcon, Globe, Palette, Bell, Database, Shield, HelpCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    language: 'en',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    dataRetention: '1year',
    analyticsTracking: true,
    errorReporting: true,
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    emailService: 'enabled',
    paymentGateway: 'stripe',
    calendarSync: false,
    smsService: false,
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Configure your application preferences and system settings.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-festival-100 dark:bg-gray-700">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Appearance Settings */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-festival-500" />
                Appearance & Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Timezone</label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                      <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Format</label>
                  <Select value={generalSettings.dateFormat} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, dateFormat: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <Select value={generalSettings.currency} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-festival-500" />
                Global Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                <div>
                  <h3 className="font-medium">Desktop Notifications</h3>
                  <p className="text-sm text-muted-foreground">Show notifications on your desktop</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                <div>
                  <h3 className="font-medium">Sound Notifications</h3>
                  <p className="text-sm text-muted-foreground">Play sounds for important alerts</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                <div>
                  <h3 className="font-medium">Weekly Reports</h3>
                  <p className="text-sm text-muted-foreground">Receive weekly summary emails</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-festival-500" />
                Data & Backup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-medium">Automatic Backups</h3>
                    <p className="text-sm text-muted-foreground">Automatically backup data daily</p>
                  </div>
                  <Switch 
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, autoBackup: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-medium">Analytics Tracking</h3>
                    <p className="text-sm text-muted-foreground">Help improve the platform by sharing usage data</p>
                  </div>
                  <Switch 
                    checked={systemSettings.analyticsTracking}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, analyticsTracking: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-medium">Error Reporting</h3>
                    <p className="text-sm text-muted-foreground">Automatically report errors to help fix bugs</p>
                  </div>
                  <Switch 
                    checked={systemSettings.errorReporting}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, errorReporting: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Data Retention Period</label>
                <Select value={systemSettings.dataRetention} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, dataRetention: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button className="festival-gradient text-white hover:scale-105 transition-transform duration-200">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="hover:scale-105 transition-transform duration-200">
                  Create Backup Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-festival-500" />
                Third-Party Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Email Service</h3>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Send transactional and marketing emails</p>
                  <Button size="sm" variant="outline" className="hover:scale-105 transition-transform duration-200">Configure</Button>
                </div>

                <div className="p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Payment Gateway</h3>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Stripe</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Process payments securely</p>
                  <Button size="sm" variant="outline" className="hover:scale-105 transition-transform duration-200">Configure</Button>
                </div>

                <div className="p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Calendar Sync</h3>
                    <Badge variant="secondary">Not Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Sync events with Google Calendar</p>
                  <Button size="sm" className="festival-gradient text-white hover:scale-105 transition-transform duration-200">Connect</Button>
                </div>

                <div className="p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">SMS Service</h3>
                    <Badge variant="secondary">Not Connected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Send SMS notifications</p>
                  <Button size="sm" className="festival-gradient text-white hover:scale-105 transition-transform duration-200">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-festival-500" />
                Help & Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start h-auto p-4 hover:scale-105 transition-transform duration-200">
                <div className="text-left">
                  <h3 className="font-medium">Documentation</h3>
                  <p className="text-sm text-muted-foreground">Browse our comprehensive user guides</p>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start h-auto p-4 hover:scale-105 transition-transform duration-200">
                <div className="text-left">
                  <h3 className="font-medium">Contact Support</h3>
                  <p className="text-sm text-muted-foreground">Get help from our support team</p>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start h-auto p-4 hover:scale-105 transition-transform duration-200">
                <div className="text-left">
                  <h3 className="font-medium">Feature Requests</h3>
                  <p className="text-sm text-muted-foreground">Suggest new features or improvements</p>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start h-auto p-4 hover:scale-105 transition-transform duration-200">
                <div className="text-left">
                  <h3 className="font-medium">System Status</h3>
                  <p className="text-sm text-muted-foreground">Check the current status of our services</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-festival-500 to-festival-600 text-white border-none">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                <p className="text-white/80 mb-4">Our support team is here to help you 24/7</p>
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
