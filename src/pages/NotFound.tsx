import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-muted-foreground">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-2">ไม่พบหน้าที่คุณต้องการ</h2>
      <p className="text-muted-foreground mb-8">
        ขออภัย หน้าที่คุณกำลังมองหาไม่มีอยู่ในระบบ
      </p>
      <Link to="/">
        <Button size="lg">🏠 กลับหน้าแรก</Button>
      </Link>
    </div>
  );
}
