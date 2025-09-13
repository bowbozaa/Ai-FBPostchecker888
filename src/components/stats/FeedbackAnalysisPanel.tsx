/**
 * FeedbackAnalysisPanel.tsx - Panel สำหรับแสดงผลวิเคราะห์ Feedback จากผู้ใช้
 */
import { useEffect, useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Flag } from 'lucide-react'
import { postService } from '@/services/postService'
import { PolicyRule } from '@/utils/risk'

// โครงสร้างข้อมูลสำหรับสถิติแต่ละกฎ
interface RuleStat {
  rule: PolicyRule;
  count: number;
  percentage: number;
}

interface FeedbackAnalysisPanelProps {
  isDark?: boolean;
}

export default function FeedbackAnalysisPanel({ isDark }: FeedbackAnalysisPanelProps) {
  const [stats, setStats] = useState<RuleStat[]>([]);
  const [totalFlagged, setTotalFlagged] = useState(0);

  useEffect(() => {
    // 1. ดึงข้อมูลโพสต์ทั้งหมด
    const allPosts = postService.getPosts();

    // 2. กรองเฉพาะโพสต์ที่ถูกรายงานว่า 'flagged'
    const flaggedPosts = allPosts.filter(p => p.feedback === 'flagged');
    setTotalFlagged(flaggedPosts.length);

    if (flaggedPosts.length === 0) {
      setStats([]);
      return;
    }

    // 3. นับจำนวนครั้งที่แต่ละ Rule ID ถูกใช้ในโพสต์ที่ถูก Flagged
    const ruleCounts = new Map<string, { rule: PolicyRule; count: number }>();
    for (const post of flaggedPosts) {
      if (post.risk.matchedRules) {
        // ใช้ Set เพื่อป้องกันการนับซ้ำในโพสต์เดียวกัน (ถ้าต้องการนับทุกครั้งที่เจอ ให้ลบส่วนนี้)
        const uniqueRuleIdsInPost = new Set(post.risk.matchedRules.map(r => r.id));
        uniqueRuleIdsInPost.forEach(ruleId => {
          const matchedRule = post.risk.matchedRules.find(r => r.id === ruleId);
          if (matchedRule) {
            if (ruleCounts.has(ruleId)) {
              ruleCounts.get(ruleId)!.count++;
            } else {
              ruleCounts.set(ruleId, { rule: matchedRule, count: 1 });
            }
          }
        });
      }
    }

    // 4. แปลง Map เป็น Array และคำนวณเปอร์เซ็นต์
    const statsArray: RuleStat[] = Array.from(ruleCounts.values()).map(({ rule, count }) => ({
      rule,
      count,
      percentage: (count / flaggedPosts.length) * 100,
    }));

    // 5. เรียงลำดับจากมากไปน้อย
    statsArray.sort((a, b) => b.count - a.count);

    setStats(statsArray);
  }, []);

  const cardClass = isDark ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white/80 backdrop-blur-sm border-gray-200'
  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600'

  return (
    <Card className={`${cardClass} border shadow-lg mt-8`}>
      <CardHeader>
        <CardTitle className={`${textClass} flex items-center gap-2`}>
          <Flag className="w-5 h-5 text-red-500" />
          ผลวิเคราะห์ Feedback
        </CardTitle>
        <CardDescription className={textSecondaryClass}>
          สถิติของกฎที่ถูกผู้ใช้รายงานว่า 'ถูกลงโทษ' บ่อยที่สุด (จากทั้งหมด {totalFlagged} โพสต์ที่ถูกรายงาน)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`rounded-xl border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule (Keyword/Regex)</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">พบในโพสต์ที่ถูกลงโทษ</TableHead>
                <TableHead className="text-right">% ของโพสต์ที่ถูกลงโทษ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    {totalFlagged > 0 ? 'กำลังประมวลผล...' : 'ยังไม่มีข้อมูล Feedback ที่ถูกรายงาน'}
                  </TableCell>
                </TableRow>
              ) : (
                stats.map(({ rule, count, percentage }) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">
                      <div className="max-w-xs truncate" title={rule.keyword}>{rule.keyword}</div>
                      {rule.is_regex && <Badge variant="outline" className="ml-2 bg-transparent">Regex</Badge>}
                    </TableCell>
                    <TableCell>{rule.category}</TableCell>
                    <TableCell className="text-right">{count} ครั้ง</TableCell>
                    <TableCell className="text-right">{percentage.toFixed(1)}%</TableCell>
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
