"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck, AlertTriangle, FileText, Loader2, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function ComplianceRisk() {
  const { toast } = useToast()
  const [selectedRegulation, setSelectedRegulation] = useState("")
  const [isNewCheckOpen, setIsNewCheckOpen] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [viewRegulation, setViewRegulation] = useState<any>(null)
  const [viewAssessment, setViewAssessment] = useState<any>(null)
  const [isReportGenerating, setIsReportGenerating] = useState(false)

  const handleStartCheck = () => {
    setIsChecking(true)
    setTimeout(() => {
      setIsChecking(false)
      setIsNewCheckOpen(false)
      toast({
        title: "合规检查完成",
        description: "已完成对所选合约的合规性检查，未发现严重风险。",
      })
    }, 2000)
  }

  const handleGenerateReport = () => {
    setIsReportGenerating(true)
    setTimeout(() => {
      setIsReportGenerating(false)
      toast({
        title: "报告生成成功",
        description: "合规分析报告已生成并发送至您的邮箱。",
      })
    }, 2000)
  }

  const handleSaveSettings = () => {
    toast({
      title: "设置已保存",
      description: "合规检查参数和风险阈值已更新。",
    })
  }

  const [regulations, setRegulations] = useState([
    {
      id: "gdpr",
      name: "GDPR",
      fullName: "通用数据保护条例",
      region: "欧盟",
      status: "已配置",
      lastUpdate: "2025-03-10",
      applicableContracts: 15,
    },
    {
      id: "ccpa",
      name: "CCPA",
      fullName: "加州消费者隐私法案",
      region: "美国加州",
      status: "已配置",
      lastUpdate: "2025-03-08",
      applicableContracts: 8,
    },
    {
      id: "pipl",
      name: "个人信息保护法",
      fullName: "中华人民共和国个人信息保护法",
      region: "中国",
      status: "已配置",
      lastUpdate: "2025-03-12",
      applicableContracts: 22,
    },
    {
      id: "cross-border",
      name: "数据跨境传输规则",
      fullName: "数据出境安全评估办法",
      region: "中国",
      status: "待配置",
      lastUpdate: "-",
      applicableContracts: 0,
    },
  ])

  const [isAddRegulationOpen, setIsAddRegulationOpen] = useState(false)
  const [newRegulation, setNewRegulation] = useState({
    name: "",
    fullName: "",
    region: "",
  })

  const handleAddRegulation = () => {
    if (!newRegulation.name || !newRegulation.fullName || !newRegulation.region) {
      toast({
        title: "信息不完整",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    const newReg = {
      id: `reg-${Date.now()}`,
      name: newRegulation.name,
      fullName: newRegulation.fullName,
      region: newRegulation.region,
      status: "待配置",
      lastUpdate: new Date().toISOString().split('T')[0],
      applicableContracts: 0,
    }

    setRegulations([...regulations, newReg])
    setIsAddRegulationOpen(false)
    setNewRegulation({ name: "", fullName: "", region: "" })
    toast({
      title: "添加成功",
      description: "新法规已添加到列表中",
    })
  }

  const riskAssessments = [
    {
      id: "1",
      contractId: "CT-2025-001",
      contractName: "数据共享服务合约",
      riskLevel: "中等",
      complianceScore: 85,
      issues: ["数据跨境传输风险", "第三方处理风险"],
      lastAssessment: "2025-03-15",
      status: "已评估",
    },
    {
      id: "2",
      contractId: "CT-2025-002",
      contractName: "API访问授权合约",
      riskLevel: "低",
      complianceScore: 95,
      issues: [],
      lastAssessment: "2025-03-14",
      status: "已评估",
    },
    {
      id: "3",
      contractId: "CT-2025-003",
      contractName: "云存储服务合约",
      riskLevel: "高",
      complianceScore: 65,
      issues: ["数据主权风险", "合规审计缺失", "加密标准不符"],
      lastAssessment: "2025-03-13",
      status: "需要整改",
    },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "高":
        return "destructive"
      case "中等":
        return "secondary"
      case "低":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">合规与风险管理</h2>
          <p className="text-muted-foreground">内置合规法规库，自动化合规校验与风险评估</p>
        </div>
        <Dialog open={isNewCheckOpen} onOpenChange={setIsNewCheckOpen}>
          <DialogTrigger asChild>
            <Button>
              <ShieldCheck className="mr-2 h-4 w-4" />
              新建合规检查
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新建合规检查</DialogTitle>
              <DialogDescription>选择合约和适用的法规进行合规性检查。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="contract">选择合约</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择要检查的合约" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ct-001">数据共享服务合约 (CT-2025-001)</SelectItem>
                    <SelectItem value="ct-002">API访问授权合约 (CT-2025-002)</SelectItem>
                    <SelectItem value="ct-003">云存储服务合约 (CT-2025-003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="regulation">适用法规</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择主要适用法规" />
                  </SelectTrigger>
                  <SelectContent>
                    {regulations.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewCheckOpen(false)}>
                取消
              </Button>
              <Button onClick={handleStartCheck} disabled={isChecking}>
                {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                开始检查
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">合规法规</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">已配置规则</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">风险评估</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">本月完成</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">高风险合约</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">3</div>
            <p className="text-xs text-muted-foreground">需要关注</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">合规得分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">87%</div>
            <p className="text-xs text-muted-foreground">平均合规分数</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="regulations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="regulations">法规库</TabsTrigger>
          <TabsTrigger value="assessment">风险评估</TabsTrigger>
          <TabsTrigger value="reports">合规报告</TabsTrigger>
          <TabsTrigger value="settings">合规设置</TabsTrigger>
        </TabsList>

        <TabsContent value="regulations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>合规法规库</CardTitle>
                  <CardDescription>管理内置的合规法规和隐私保护要求</CardDescription>
                </div>
                <Dialog open={isAddRegulationOpen} onOpenChange={setIsAddRegulationOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      新增法规
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新增合规法规</DialogTitle>
                      <DialogDescription>添加新的合规法规到系统中。</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="reg-name">法规简称</Label>
                        <Input
                          id="reg-name"
                          placeholder="例如：GDPR"
                          value={newRegulation.name}
                          onChange={(e) => setNewRegulation({ ...newRegulation, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="reg-fullname">法规全称</Label>
                        <Input
                          id="reg-fullname"
                          placeholder="例如：通用数据保护条例"
                          value={newRegulation.fullName}
                          onChange={(e) => setNewRegulation({ ...newRegulation, fullName: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="reg-region">适用区域</Label>
                        <Input
                          id="reg-region"
                          placeholder="例如：欧盟"
                          value={newRegulation.region}
                          onChange={(e) => setNewRegulation({ ...newRegulation, region: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddRegulationOpen(false)}>
                        取消
                      </Button>
                      <Button onClick={handleAddRegulation}>保存</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulations.map((regulation) => (
                  <div key={regulation.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{regulation.name}</h4>
                          <Badge variant={regulation.status === "已配置" ? "default" : "secondary"}>
                            {regulation.status}
                          </Badge>
                          <Badge variant="outline">{regulation.region}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{regulation.fullName}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setViewRegulation(regulation)}>
                          查看规则
                        </Button>
                        <Button size="sm" onClick={() => setViewRegulation(regulation)}>
                          {regulation.status === "已配置" ? "编辑" : "配置"}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">适用合约:</span> {regulation.applicableContracts} 个
                      </div>
                      <div>
                        <span className="text-muted-foreground">最后更新:</span> {regulation.lastUpdate || "未配置"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>风险评估报告</CardTitle>
              <CardDescription>查看合约风险等级评估和合规分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAssessments.map((assessment) => (
                  <div key={assessment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{assessment.contractName}</h4>
                          <Badge variant={getRiskColor(assessment.riskLevel) as any}>{assessment.riskLevel}风险</Badge>
                          <Badge variant={assessment.status === "需要整改" ? "destructive" : "default"}>
                            {assessment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">合约编号: {assessment.contractId}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          生成报告
                        </Button>
                        <Button size="sm" onClick={() => setViewAssessment(assessment)}>
                          查看详情
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>合规得分</span>
                        <span>{assessment.complianceScore}%</span>
                      </div>
                      <Progress value={assessment.complianceScore} />
                    </div>
                    {assessment.issues.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">识别的风险:</div>
                        <div className="flex flex-wrap gap-2">
                          {assessment.issues.map((issue, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              {issue}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">最后评估: {assessment.lastAssessment}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>合规报告生成</CardTitle>
              <CardDescription>生成详细的合规与风险分析报告</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">报告类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择报告类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliance">合规分析报告</SelectItem>
                      <SelectItem value="risk">风险评估报告</SelectItem>
                      <SelectItem value="audit">审计报告</SelectItem>
                      <SelectItem value="summary">综合报告</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-range">时间范围</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择时间范围" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">最近7天</SelectItem>
                      <SelectItem value="30d">最近30天</SelectItem>
                      <SelectItem value="90d">最近90天</SelectItem>
                      <SelectItem value="1y">最近1年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleGenerateReport} disabled={isReportGenerating}>
                {isReportGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                {isReportGenerating ? "生成中..." : "生成报告"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>合规设置</CardTitle>
              <CardDescription>配置合规检查参数和风险阈值</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="auto-check">自动合规检查</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择检查频率" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">每日</SelectItem>
                      <SelectItem value="weekly">每周</SelectItem>
                      <SelectItem value="monthly">每月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="risk-threshold">风险阈值</Label>
                  <Input id="risk-threshold" placeholder="设置风险评分阈值" />
                </div>
              </div>
              <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Regulation Details Dialog */}
      <Dialog open={!!viewRegulation} onOpenChange={(open) => !open && setViewRegulation(null)}>
        <DialogContent className="max-w-2xl">
          {viewRegulation && (
            <>
              <DialogHeader>
                <DialogTitle>{viewRegulation.name} 详情</DialogTitle>
                <DialogDescription>{viewRegulation.fullName}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">适用区域</Label>
                    <div className="font-medium">{viewRegulation.region}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">状态</Label>
                    <div className="font-medium">{viewRegulation.status}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">最后更新</Label>
                    <div className="font-medium">{viewRegulation.lastUpdate}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">适用合约数</Label>
                    <div className="font-medium">{viewRegulation.applicableContracts}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>核心合规要求</Label>
                  <div className="border rounded-md p-4 text-sm space-y-2 bg-muted/50">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>数据主体权利保护 (访问、更正、删除)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>数据处理的合法性基础</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>数据泄露通知机制</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>跨境数据传输评估</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setViewRegulation(null)}>关闭</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Assessment Details Dialog */}
      <Dialog open={!!viewAssessment} onOpenChange={(open) => !open && setViewAssessment(null)}>
        <DialogContent className="max-w-2xl">
          {viewAssessment && (
            <>
              <DialogHeader>
                <DialogTitle>风险评估详情 - {viewAssessment.contractName}</DialogTitle>
                <DialogDescription>合约编号: {viewAssessment.contractId}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">风险等级</div>
                    <Badge variant={getRiskColor(viewAssessment.riskLevel) as any} className="text-base px-4 py-1">
                      {viewAssessment.riskLevel}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">合规得分</div>
                    <div className="text-2xl font-bold">{viewAssessment.complianceScore}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">评估状态</div>
                    <div className="font-medium">{viewAssessment.status}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    识别的风险项
                  </h4>
                  {viewAssessment.issues && viewAssessment.issues.length > 0 ? (
                    <div className="space-y-2">
                      {viewAssessment.issues.map((issue: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 border rounded-md bg-red-50 dark:bg-red-950/20 text-sm"
                        >
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground border rounded-md border-dashed">
                      未发现明显风险
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">整改建议</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>1. 完善数据跨境传输的安全评估文档。</p>
                    <p>2. 更新隐私政策以符合最新的法规要求。</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewAssessment(null)}>
                  关闭
                </Button>
                <Button>导出详细报告</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div >
  )
}
