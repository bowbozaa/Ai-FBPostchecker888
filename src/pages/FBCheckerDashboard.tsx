import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { usePostCheckerStore } from '@/store/usePostCheckerStore';
import { exportService } from '@/services/exportService';
import { Download, Trash2, Copy, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router';

export default function FBCheckerDashboard() {
  const { toast } = useToast();
  const { results, stats, clearResults, deleteResult } = usePostCheckerStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const recentResults = results.slice(0, 20);

  const handleExportAll = async () => {
    if (results.length === 0) {
      toast({
        title: 'ไม่มีข้อมูล',
        description: 'ไม่มีผลการวิเคราะห์ให้ส่งออก',
        variant: 'destructive',
      });
      return;
    }

    try {
      await exportService.exportToExcel(results);
      toast({
        title: '✅ ส่งออกสำเร็จ',
        description: `ส่งออกข้อมูล ${results.length} รายการเป็น Excel แล้ว`,
      });
    } catch (err: any) {
      toast({
        title: '❌ เกิดข้อผิดพลาด',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const handleClearAll = () => {
    clearResults();
    setShowClearConfirm(false);
    toast({
      title: '✅ ลบข้อมูลสำเร็จ',
      description: 'ข้อมูลทั้งหมดถูกลบแล้ว',
    });
  };

  const handleDelete = (id: string) => {
    deleteResult(id);
    toast({
      title: '✅ ลบรายการสำเร็จ',
    });
  };

  const handleCopy = (postId: string) => {
    navigator.clipboard.writeText(postId);
    toast({
      title: '✅ คัดลอกแล้ว',
      description: `Post ID: ${postId}`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { class: string; text: string }> = {
      safe: { class: 'bg-green-100 text-green-800 border-green-200', text: '✅ ปลอดภัย' },
      risky: { class: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: '⚠️ มีความเสี่ยง' },
      dangerous: { class: 'bg-red-100 text-red-800 border-red-200', text: '🚨 อันตราย' },
    };
    const variant = variants[status] || variants.safe;
    return <Badge className={variant.class}>{variant.text}</Badge>;
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📊 Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            สรุปผลการวิเคราะห์โพสต์ Facebook
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportAll}
            disabled={results.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            ส่งออก Excel
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowClearConfirm(true)}
            disabled={results.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            ลบข้อมูลทั้งหมด
          </Button>
        </div>
      </div>

      {/* Clear Confirmation */}
      {showClearConfirm && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>คุณแน่ใจหรือว่าต้องการลบข้อมูลทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้</span>
            <div className="flex gap-2 ml-4">
              <Button size="sm" variant="outline" onClick={() => setShowClearConfirm(false)}>
                ยกเลิก
              </Button>
              <Button size="sm" variant="destructive" onClick={handleClearAll}>
                ยืนยันลบ
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <CardDescription className="text-blue-600 font-semibold">
              📝 โพสต์ทั้งหมด
            </CardDescription>
            <CardTitle className="text-5xl font-extrabold text-blue-600">
              {stats.totalPosts}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <CardDescription className="text-green-600 font-semibold">
              ✅ ปลอดภัย
            </CardDescription>
            <CardTitle className="text-5xl font-extrabold text-green-600">
              {stats.safePosts}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <CardDescription className="text-yellow-600 font-semibold">
              ⚠️ มีความเสี่ยง
            </CardDescription>
            <CardTitle className="text-5xl font-extrabold text-yellow-600">
              {stats.riskyPosts}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-3">
            <CardDescription className="text-red-600 font-semibold">
              🚨 อันตราย
            </CardDescription>
            <CardTitle className="text-5xl font-extrabold text-red-600">
              {stats.dangerousPosts}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Average Risk Score */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>📈 คะแนนความเสี่ยงเฉลี่ย</span>
            <span className={`text-4xl font-bold ${getRiskColor(stats.avgRiskScore)}`}>
              {stats.avgRiskScore}%
            </span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>🕐 ประวัติการวิเคราะห์ล่าสุด</CardTitle>
          <CardDescription>แสดง 20 รายการล่าสุด</CardDescription>
        </CardHeader>
        <CardContent>
          {recentResults.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="text-6xl">📭</div>
              <p className="text-xl font-semibold text-muted-foreground">
                ยังไม่มีข้อมูลการวิเคราะห์
              </p>
              <Link to="/fb-post-checker">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  🚀 เริ่มวิเคราะห์โพสต์
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentResults.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusBadge(result.status)}
                          <span className={`text-2xl font-bold ${getRiskColor(result.riskScore)}`}>
                            {result.riskScore}%
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Post ID:</span>
                            <code className="text-xs bg-muted px-2 py-0.5 rounded">
                              {result.postId}
                            </code>
                          </div>
                          <div className="text-muted-foreground">
                            {new Date(result.timestamp).toLocaleString('th-TH')}
                          </div>
                          {result.bannedKeywords.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {result.bannedKeywords.slice(0, 3).map((kw, idx) => (
                                <Badge key={idx} variant="destructive" className="text-xs">
                                  {kw}
                                </Badge>
                              ))}
                              {result.bannedKeywords.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{result.bannedKeywords.length - 3} เพิ่มเติม
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(result.postId)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(result.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
