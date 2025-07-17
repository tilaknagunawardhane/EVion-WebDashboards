import React from 'react';
import { Card, CardHeader, CardContent } from '../settingsComponents/Card';
import { Label } from '../settingsComponents/Label';
import { Switch } from '../settingsComponents/Switch';
import { COLORS, FONTS } from '../../../../constants';

const NotificationsSettings = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Station Notifications</h2>
        <p className="text-sm text-muted-foreground" style={{color: COLORS.secondaryText}}>Manage how you receive alerts and updates for your station.</p>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base" style={{fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.normal}}>Receive Fault Alerts</h3>
            <p className="text-sm text-muted-foreground" style={{color: COLORS.secondaryText}}>
              Get notified when faults are reported on your station or chargers.
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base" style={{fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.normal}}>Booking Reminders</h3>
            <p className="text-sm text-muted-foreground" style={{color: COLORS.secondaryText}}>
              Email or in-app reminders for upcoming bookings.
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base" style={{fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.normal}}>Session Completion Alerts</h3>
            <p className="text-sm text-muted-foreground" style={{color: COLORS.secondaryText}}>
              Notify when a charging session is completed.
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base" style={{fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.normal}}>Admin Announcements</h3>
            <p className="text-sm text-muted-foreground" style={{color: COLORS.secondaryText}}>
              Platform-wide announcements or policy changes.
            </p>
          </div>
          <Switch />
        </div>

      </CardContent>
    </Card>
  );
};

export default NotificationsSettings;
