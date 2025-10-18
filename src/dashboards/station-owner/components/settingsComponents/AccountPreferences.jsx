import React from 'react';
import { Card, CardContent, CardHeader } from '../settingsComponents/Card';
import { Label } from '../settingsComponents/Label';
import { Input } from '../settingsComponents/Input';
import { Switch } from '../settingsComponents/Switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../settingsComponents/Select';

const AccountPreferences = () => {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">Account Preferences</h2>
        <p className="text-sm text-gray-500">Manage your default language, time zone, and appearance.</p>
      </CardHeader>
      <CardContent className="grid gap-6">

        {/* Language Selection */}
        <div className="grid gap-2">
          <Label htmlFor="language">Language</Label>
          <Select defaultValue="en">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="si">සිංහල (Sinhala)</SelectItem>
              <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time Zone */}
        <div className="grid gap-2">
          <Label htmlFor="timezone">Time Zone</Label>
          <Input
            id="timezone"
            type="text"
            placeholder="e.g., GMT+05:30 Sri Lanka Time"
            defaultValue="GMT+05:30"
          />
        </div>

        {/* Date Format */}
        <div className="grid gap-2">
          <Label htmlFor="date-format">Date Format</Label>
          <Select defaultValue="ddmmyyyy">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
              <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="yyyymmdd">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time Format */}
        <div className="grid gap-2">
          <Label htmlFor="time-format">Time Format</Label>
          <Select defaultValue="24h">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24-Hour</SelectItem>
              <SelectItem value="12h">12-Hour (AM/PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Theme / Dark Mode Toggle */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <p className="text-sm text-gray-500">Toggle between light and dark appearance.</p>
          </div>
          <Switch id="dark-mode" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountPreferences;
