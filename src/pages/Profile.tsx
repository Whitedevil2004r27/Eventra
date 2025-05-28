
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Edit, Shield, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Event Management Pro',
    location: 'New York, NY',
    bio: 'Passionate event organizer with 5+ years of experience in creating memorable experiences.',
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMarketing: false,
    pushNotifications: true,
    smsNotifications: false,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Profile Settings</h1>
        <p className="text-muted-foreground text-lg">
          Manage your account information and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-festival-100 dark:bg-gray-700">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card className="bg-gradient-to-r from-festival-500 to-festival-600 text-white border-none">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <Button 
                    size="icon" 
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-festival-600 hover:bg-white/90"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                  <p className="text-white/80">{profileData.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <Badge className="mt-2 bg-white/20 text-white hover:bg-white/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified Account
                  </Badge>
                </div>

                <div className="ml-auto">
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input
                    value={profileData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 disabled:opacity-50"
                  rows={3}
                />
              </div>

              {isEditing && (
                <div className="flex gap-4">
                  <Button 
                    onClick={handleSave} 
                    className="festival-gradient text-white hover:scale-105 transition-transform duration-200"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-festival-500" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-medium">Email Booking Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive emails when new bookings are made</p>
                  </div>
                  <Switch
                    checked={notifications.emailBookings}
                    onCheckedChange={(checked) => handleNotificationChange('emailBookings', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">Receive promotional and marketing emails</p>
                  </div>
                  <Switch
                    checked={notifications.emailMarketing}
                    onCheckedChange={(checked) => handleNotificationChange('emailMarketing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-festival-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-festival-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-festival-500" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start h-auto p-4 hover:scale-105 transition-transform duration-200">
                  <div className="text-left">
                    <h3 className="font-medium">Change Password</h3>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto p-4 hover:scale-105 transition-transform duration-200">
                  <div className="text-left">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto p-4 hover:scale-105 transition-transform duration-200">
                  <div className="text-left">
                    <h3 className="font-medium">Login History</h3>
                    <p className="text-sm text-muted-foreground">View recent login activity</p>
                  </div>
                </Button>

                <Button variant="outline" className="w-full justify-start h-auto p-4 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950 hover:scale-105 transition-transform duration-200">
                  <div className="text-left">
                    <h3 className="font-medium">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
