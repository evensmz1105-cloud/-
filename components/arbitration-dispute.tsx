"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Gavel, FileText } from "lucide-react"

export function ArbitrationDispute() {
  const [selectedCase, setSelectedCase] = useState("")

  const disputeCases = [
    {
      id: "ARB-2024-001",
      contractId: "CT-2024-001",
      contractName: "数据共享服务合约",
      disputeType: "付款争议",
      status: "仲裁中",
      priority: "高",
      submitter: "甲方公司",
      respondent: "乙方数据提供商",
      submitTime: "2024-01-15 10:30",
      arbitrator: "平台仲裁委员会",
      estimatedResolution: "2024-01-20",
    },
    {
      id: "ARB-2024-002",
      contractId: "CT-2024-002",
      contractName: "API访问授权合约",
      disputeType: "服务质量争议",
      status: "已结案",
      priority: "中",
      submitter: "乙方服务商",
      respondent: "甲方企业",
      submitTime: "2024-01-10 14:20",
      arbitrator: "第三方仲裁机构",
      estimatedResolution: "2024-01-18",
    },
    {
      id: "ARB-2024-003",
      contractId: "CT-2024-003",
      contractName: "云存储服务合约",
      disputeType: "数据安全争议",
      status: "证据收集",
      priority: "高",
      submitter: "甲方用户",
      respondent: "乙方云服务商",
      submitTime: "2024-01-12 09:15",
      arbitrator: "待分配",
      estimatedResolution: "2024-01-25",
    },
  ]

  const arbitrationEngines = [
    {
      id: "1",
      name: "智能合约执行引擎",
      type: "自动化",
      status: "运行中",
      processedCases: 156,
      accuracy: 94,
      avgResolutionTime: "2.3天",
    },
    {
      id: "2",
      name: "专家仲裁系统",
      type: "人工辅助",
      status: "运行中",
      processedCases: 89,
      accuracy: 98,
      avgResolutionTime: "5.7天",
    },
    {
      id: "3",
      name: "区块链存证验证",
      type: "证据分析",
      status: "运行中",
      processedCases: 234,
      accuracy: 99,
      avgResolutionTime: "1.2天",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已结案":
        return "default"
      case "仲裁中":
        return "secondary"
      case "证据收集":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "destructive"
      case "中":
        return "secondary"
      case "低":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">仲裁与争议解决</h2>
          <p className="text-muted-foreground">内置仲裁机制，自动化争议处理与仲裁报告生成</p>
        </div>
        <Button>
          <Gavel className="mr-2 h-4 w-4" />
          发起仲裁申请
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">争议案件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">本月新增</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">仲裁中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">5</div>
            <p className="text-xs text-muted-foreground">正在处理</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已结案</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">28</div>
            <p className="text-xs text-muted-foreground">本月完成</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均处理时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2天</div>
            <p className="text-xs text-muted-foreground">较上月-0.8天</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cases">争议案件</TabsTrigger>
          <TabsTrigger value="create">发起仲裁</TabsTrigger>
          <TabsTrigger value="engines">仲裁引擎</TabsTrigger>
          <TabsTrigger value="reports">仲裁报告</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>争议案件列表</CardTitle>
              <CardDescription>查看和管理所有争议仲裁案件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputeCases.map((case_) => (
                  <div key={case_.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{case_.contractName}</h4>
                          <Badge variant={getStatusColor(case_.status) as any}>{case_.status}</Badge>
                          <Badge variant={getPriorityColor(case_.priority) as any}>{case_.priority}优先级</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          案件编号: {case_.id} • 合约: {case_.contractId}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          查看详情
                        </Button>
                        {case_.status === "仲裁中" && <Button size="sm">处理案件</Button>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">争议类型:</span> {case_.disputeType}
                      </div>
                      <div>
                        <span className="text-muted-foreground">仲裁员:</span> {case_.arbitrator}
                      </div>
                      <div>
                        <span className="text-muted-foreground">申请方:</span> {case_.submitter}
                      </div>
                      <div>
                        <span className="text-muted-foreground">被申请方:</span> {case_.respondent}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      提交时间: {case_.submitTime} • 预计解决: {case_.estimatedResolution}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>发起仲裁申请</CardTitle>
              <CardDescription>提交合约争议仲裁申请</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contract-select">相关合约</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择争议相关的合约" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CT-2024-001">数据共享服务合约 (CT-2024-001)</SelectItem>
                      <SelectItem value="CT-2024-002">API访问授权合约 (CT-2024-002)</SelectItem>
                      <SelectItem value="CT-2024-003">云存储服务合约 (CT-2024-003)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dispute-type">争议类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择争议类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payment">付款争议</SelectItem>
                      <SelectItem value="delivery">交付争议</SelectItem>
                      <SelectItem value="quality">服务质量争议</SelectItem>
                      <SelectItem value="security">数据安全争议</SelectItem>
                      <SelectItem value="breach">违约争议</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="respondent">被申请方</Label>
                  <Input id="respondent" placeholder="输入被申请方名称" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">优先级</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">争议描述</Label>
                <Textarea
                  id="description"
                  placeholder="请详细描述争议的具体情况、涉及的合约条款和要求的解决方案..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evidence">证据材料</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground">点击上传或拖拽文件到此处</p>
                  <p className="text-xs text-muted-foreground mt-1">支持 PDF, DOC, JPG, PNG 格式</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>
                  <Gavel className="mr-2 h-4 w-4" />
                  提交仲裁申请
                </Button>
                <Button variant="outline">保存草稿</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>仲裁引擎管理</CardTitle>
              <CardDescription>管理自动化仲裁引擎和处理规则</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {arbitrationEngines.map((engine) => (
                  <div key={engine.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{engine.name}</h4>
                          <Badge variant="default">{engine.status}</Badge>
                          <Badge variant="outline">{engine.type}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          配置
                        </Button>
                        <Button size="sm">查看详情</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">处理案件:</span> {engine.processedCases}
                      </div>
                      <div>
                        <span className="text-muted-foreground">准确率:</span> {engine.accuracy}%
                      </div>
                      <div>
                        <span className="text-muted-foreground">平均处理时间:</span> {engine.avgResolutionTime}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>引擎效率</span>
                        <span>{engine.accuracy}%</span>
                      </div>
                      <Progress value={engine.accuracy} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>仲裁报告生成</CardTitle>
              <CardDescription>生成详细的仲裁决定和争议解决报告</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-case">选择案件</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择要生成报告的案件" />
                    </SelectTrigger>
                    <SelectContent>
                      {disputeCases.map((case_) => (
                        <SelectItem key={case_.id} value={case_.id}>
                          {case_.contractName} ({case_.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-type">报告类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择报告类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decision">仲裁决定书</SelectItem>
                      <SelectItem value="process">处理过程报告</SelectItem>
                      <SelectItem value="evidence">证据分析报告</SelectItem>
                      <SelectItem value="summary">案件总结报告</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                生成仲裁报告
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
