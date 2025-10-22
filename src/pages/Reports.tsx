import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Reports() {
  const handleExport = (format: string) => {
    console.log('Exporting as:', format);
    alert('Feature coming soon!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">รายงาน</h1>
        <p className="text-muted-foreground">ดูและส่งออกรายงานการวิเคราะห์</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Export Excel</CardTitle>
            <CardDescription>ส่งออกเป็นไฟล์ Excel (.xlsx)</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleExport('Excel')} className="w-full">
              📥 Export Excel
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Export Google Sheets</CardTitle>
            <CardDescription>ส่งข้อมูลไปยัง Google Sheets</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleExport('Google Sheets')} className="w-full">
              📤 Export to Sheets
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Export CSV</CardTitle>
            <CardDescription>ส่งออกเป็นไฟล์ CSV</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleExport('CSV')} className="w-full">
              📄 Export CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
