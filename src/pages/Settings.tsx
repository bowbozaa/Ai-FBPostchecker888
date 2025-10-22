import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Settings() {
  const [config, setConfig] = useState({
    facebookToken: '',
    lineToken: '',
    googleSheetsId: '',
  });

  const handleSave = () => {
    localStorage.setItem('fbchecker-config', JSON.stringify(config));
    alert('บันทึกการตั้งค่าเรียบร้อย');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">ตั้งค่าระบบ</h1>
        <p className="text-muted-foreground">จัดการ API tokens และการแจ้งเตือน</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>กำหนดค่า API tokens สำหรับการเชื่อมต่อบริการต่าง ๆ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Facebook Access Token</label>
            <Input
              type="password"
              placeholder="Your Facebook access token"
              value={config.facebookToken}
              onChange={(e) => setConfig({ ...config, facebookToken: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">LINE Notify Token</label>
            <Input
              type="password"
              placeholder="Your LINE notify token"
              value={config.lineToken}
              onChange={(e) => setConfig({ ...config, lineToken: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Google Sheets ID</label>
            <Input
              type="text"
              placeholder="Your Google Sheets ID"
              value={config.googleSheetsId}
              onChange={(e) => setConfig({ ...config, googleSheetsId: e.target.value })}
            />
          </div>
          <Button onClick={handleSave} className="w-full">บันทึกการตั้งค่า</Button>
        </CardContent>
      </Card>
    </div>
  );
}
