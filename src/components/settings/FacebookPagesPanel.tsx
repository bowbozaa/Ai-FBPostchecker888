
import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Facebook, Loader2, AlertTriangle } from 'lucide-react';
import { FBPageItem } from '@/integrations/facebook';

interface FacebookPagesPanelProps {
  isDark?: boolean;
}

export default function FacebookPagesPanel({ isDark }: FacebookPagesPanelProps) {
  const [pages, setPages] = useState<FBPageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/facebook/pages');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to fetch pages');
      }
      const data = await response.json();
      setPages(data.data || []);
    } catch (e: any) {
      setError(e.message);
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const cardClass = isDark ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white/80 backdrop-blur-sm border-gray-200';
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  return (
    <Card className={`${cardClass} border shadow-lg`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className={`${textClass} flex items-center gap-2`}>
            <Facebook className="w-5 h-5 text-blue-500" />
            Facebook Pages
          </CardTitle>
          <CardDescription className={textSecondaryClass}>
            ดึงและจัดการรายชื่อเพจ Facebook ที่คุณดูแล
          </CardDescription>
        </div>
        <Button onClick={handleFetchPages} disabled={loading}>
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> กำลังดึงข้อมูล...</>
          ) : (
            'Fetch Pages'
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-md">
            <AlertTriangle className="w-4 h-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <div className={`rounded-xl border ${isDark ? 'border-white/10' : 'border-gray-200'} mt-4`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Page ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    กำลังโหลดข้อมูล...
                  </TableCell>
                </TableRow>
              ) : pages.length === 0 && !error ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    คลิกปุ่ม 'Fetch Pages' เพื่อเริ่มดึงข้อมูล
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.name}</TableCell>
                    <TableCell>{page.category || 'N/A'}</TableCell>
                    <TableCell className="text-gray-500">{page.id}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
