
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Mail, 
  Phone, 
  Save,
  AlertTriangle 
} from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Event Management Co.',
    bio: 'Professional event organizer with 5+ years of experience.',
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailEvents: true,
    smsReminders: false,
    pushNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    dataSharing: false,
    analytics: true,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      {/* Profile Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="w-5 h-5 text-purple-400" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-300">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-300">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Bell className="w-5 h-5 text-blue-400" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">Email Booking Notifications</p>
              <p className="text-sm text-gray-400">Get notified when new bookings are made</p>
            </div>
            <Switch
              checked={notifications.emailBookings}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, emailBookings: checked }))
              }
            />
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">Event Updates</p>
              <p className="text-sm text-gray-400">Receive updates about your events</p>
            </div>
            <Switch
              checked={notifications.emailEvents}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, emailEvents: checked }))
              }
            />
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">SMS Reminders</p>
              <p className="text-sm text-gray-400">Get SMS reminders for important events</p>
            </div>
            <Switch
              checked={notifications.smsReminders}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, smsReminders: checked }))
              }
            />
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">Push Notifications</p>
              <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
            </div>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, pushNotifications: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-green-400" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">Public Profile</p>
              <p className="text-sm text-gray-400">Make your profile visible to other users</p>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, profileVisible: checked }))
              }
            />
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">Data Sharing</p>
              <p className="text-sm text-gray-400">Allow sharing of anonymized data for improvements</p>
            </div>
            <Switch
              checked={privacy.dataSharing}
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, dataSharing: checked }))
              }
            />
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">Analytics Tracking</p>
              <p className="text-sm text-gray-400">Help us improve by tracking usage analytics</p>
            </div>
            <Switch
              checked={privacy.analytics}
              onCheckedChange={(checked) => 
                setPrivacy(prev => ({ ...prev, analytics: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-gray-800 border-red-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
