"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Play,
  Pause,
  Square,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Upload,
  Download,
  RefreshCw,
  Settings,
  Shield,
} from "lucide-react"

const executingContracts = [
  {
    id: 1,
    name: "银行间数据共享协议-ABC银行",
    status: "executing",
    progress: 75,
    startDate: "2024-01-15",
    expectedCompletion: "2024-01-20",
    currentPhase: "数据交付",
    nextMilestone: "数据验收",
    participants: {
      provider: "ABC银行",
      consumer: "XYZ银行",
    },
    executionSteps: [
      { name: "合约激活", status: "completed", completedAt: "2024-01-15 09:00" },
      { name: "数据准备", status: "completed", completedAt: "2024-01-16 14:30" },
      { name: "数据交付", status: "in_progress", startedAt: "2024-01-17 10:00" },
      { name: "数据验收", status: "pending", expectedAt: "2024-01-19 16:00" },
      { name: "付款处理", status: "pending", expectedAt: "2024-01-20 12:00" },
    ],
    metrics: {
      dataTransferred: "2.5GB",
      transactionValue: "¥50,000",
      completionRate: 75,
      slaCompliance: 98,
    },
  },
  {
    id: 2,
    name: "医疗数据研究授权-医学院",
    status: "paused",
    progress: 45,
    startDate: "2024-01-10",
    expectedCompletion: "2024-01-25",
    currentPhase: "数据匿名化",
    nextMilestone: "伦理审查",
    participants: {
      provider: "市人民医院",
      consumer: "医学研究院",
    },
    executionSteps: [
      { name: "合约激活", status: "completed", completedAt: "2024-01-10 08:00" },
      { name: "数据收集", status: "completed", completedAt: "2024-01-12 17:00" },
      { name: "数据匿名化", status: "paused", pausedAt: "2024-01-14 11:30" },
      { name: "伦理审查", status: "pending", expectedAt: "2024-01-20 09:00" },
      { name: "数据交付", status: "pending", expectedAt: "2024-01-24 15:00" },
    ],
    metrics: {
      dataTransferred: "0GB",
      transactionValue: "¥30,000",
      completionRate: 45,
      slaCompliance: 85,
    },
  },
  {
    id: 3,
    name: "教育资源按次计费-在线平台",
    status: "completed",
    progress: 100,
    startDate: "2024-01-05",
    expectedCompletion: "2024-01-15",
    currentPhase: "已完成",
    nextMilestone: "无",
    participants: {
      provider: "教育出版社",
      consumer: "在线教育平台",
    },
    executionSteps: [
      { name: "合约激活", status: "completed", completedAt: "2024-01-05 10:00" },
      { name: "内容授权", status: "completed", completedAt: "2024-01-06 14:00" },
      { name: "平台集成", status: "completed", completedAt: "2024-01-10 16:00" },
      { name: "用量统计", status: "completed", completedAt: "2024-01-14 12:00" },
      { name: "费用结算", status: "completed", completedAt: "2024-01-15 18:00" },
    ],
    metrics: {
      dataTransferred: "15.2GB",
      transactionValue: "¥120,000",
      completionRate: 100,
      slaCompliance: 99,
    },
  },
]

const alerts = [
  {
    id: 1,
    contractId: 2,
    type: "warning",
    title: "数据匿名化进程暂停",
    description: "医疗数据匿名化过程中发现敏感信息，需要人工审核",
    timestamp: "2024-01-16 11:30",
    severity: "medium",
  },
  {
    id: 2,
    contractId: 1,
    type: "info",
    title: "数据交付进度更新",
    description: "已完成75%的数据传输，预计2小时内完成",
    timestamp: "2024-01-16 15:20",
    severity: "low",
  },
  {
    id: 3,
    contractId: 1,
    type: "error",
    title: "网络连接异常",
    description: "数据传输过程中出现网络中断，系统已自动重试",
    timestamp: "2024-01-16 13:45",
    severity: "high",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "executing":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">执行中</Badge>
    case "paused":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">已暂停</Badge>
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已完成</Badge>
    case "failed":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">执行失败</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getStepStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "in_progress":
      return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
    case "paused":
      return <Pause className="h-4 w-4 text-yellow-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-gray-400" />
    default:
      return <AlertTriangle className="h-4 w-4 text-red-600" />
  }
}

function getAlertIcon(type: string) {
  switch (type) {
    case "error":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "info":
      return <CheckCircle className="h-4 w-4 text-blue-600" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-400" />
  }
}

export function ContractExecution() {
  const { toast } = useToast()
  const [contractList, setContractList] = useState(executingContracts)
  const [alertsList, setAlertsList] = useState(alerts)
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [isBatchDialogOpen, setIsBatchDialogOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadContract, setUploadContract] = useState<any>(null)
  const [isBlockchainDialogOpen, setIsBlockchainDialogOpen] = useState(false)
  const [blockchainContract, setBlockchainContract] = useState<any>(null)
  const [configForm, setConfigForm] = useState({
    autoRetry: true,
    maxRetries: 3,
    notifyEmail: "ops@example.com",
    enableAudit: true,
    executionWindow: "24h",
  })
  const [batchSelection, setBatchSelection] = useState<string[]>([])
  const [uploadRemarks, setUploadRemarks] = useState("")

  const filteredContracts = contractList.filter((contract) => {
    return filterStatus === "all" || contract.status === filterStatus
  })

  const handleExecutionConfig = () => {
    setIsConfigDialogOpen(true)
  }

  const handleSaveConfig = () => {
    setIsConfigDialogOpen(false)
    toast({
      title: "执行配置已保存",
      description: "新的执行配置将实时生效。",
    })
  }

  const handleBatchExecute = () => {
    const pendingContracts = contractList.filter((c) => c.status !== "completed")
    if (!pendingContracts.length) {
      toast({
        title: "没有可执行的合约",
        description: "当前没有可批量执行的合约。",
        variant: "destructive",
      })
      return
    }
    setBatchSelection(pendingContracts.map((c) => c.id.toString()))
    setIsBatchDialogOpen(true)
  }

  const handleConfirmBatch = () => {
    if (!batchSelection.length) {
      toast({
        title: "请选择合约",
        description: "请至少选择一个合约再执行。",
        variant: "destructive",
      })
      return
    }
    setIsBatchDialogOpen(false)
    toast({
      title: "批量执行已启动",
      description: `共 ${batchSelection.length} 份合约已进入执行队列。`,
    })
  }

  const updateContractStatus = (contractId: number, status: string) => {
    setContractList((prev) =>
      prev.map((contract) => (contract.id === contractId ? { ...contract, status } : contract)),
    )
  }

  const handlePause = (e: React.MouseEvent, contract: any) => {
    e.stopPropagation()
    updateContractStatus(contract.id, "paused")
    toast({
      title: "执行已暂停",
      description: `合约“${contract.name}”已暂停执行。`,
    })
  }

  const handleResume = (e: React.MouseEvent, contract: any) => {
    e.stopPropagation()
    updateContractStatus(contract.id, "executing")
    toast({
      title: "执行已恢复",
      description: `合约“${contract.name}”已恢复执行。`,
    })
  }

  const handleStop = (e: React.MouseEvent, contract: any) => {
    e.stopPropagation()
    updateContractStatus(contract.id, "paused")
    toast({
      title: "执行已停止",
      description: `合约“${contract.name}”已停止，可稍后重新执行。`,
    })
  }

  const handleUploadProof = (e: React.MouseEvent, contract?: any) => {
    e.stopPropagation()
    const target = contract || selectedContract
    if (!target) {
      toast({
        title: "请选择合约",
        description: "请先选择需要上传凭证的合约。",
        variant: "destructive",
      })
      return
    }
    setUploadContract(target)
    setIsUploadDialogOpen(true)
  }

  const handleConfirmUpload = () => {
    if (!uploadContract) return
    setIsUploadDialogOpen(false)
    setUploadRemarks("")
    toast({
      title: "凭证已上传",
      description: `合约“${uploadContract.name}”的执行凭证已提交。`,
    })
  }

  const handleDownloadReport = () => {
    if (!selectedContract) {
      toast({
        title: "请选择合约",
        description: "请在左侧选择一个合约。",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "报告生成中",
      description: "执行报告生成完成后将自动下载。",
    })
  }

  const handleProcessPayment = () => {
    if (!selectedContract) {
      toast({
        title: "请选择合约",
        description: "请在左侧选择一个合约。",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "付款处理已启动",
      description: `合约“${selectedContract.name}”的付款流程已启动。`,
    })
  }

  const handleBlockchainLink = (contract?: any) => {
    const target = contract || selectedContract
    if (!target) {
      toast({
        title: "请选择合约",
        description: "请在左侧选择一个合约。",
        variant: "destructive",
      })
      return
    }
    if (!target.blockchainHash) {
      toast({
        title: "尚未存证",
        description: "该合约尚未进行区块链存证。",
        variant: "destructive",
      })
      return
    }
    setBlockchainContract(target)
    setIsBlockchainDialogOpen(true)
  }

  const handleRetryExecution = () => {
    if (!selectedContract) {
      toast({
        title: "请选择合约",
        description: "请在左侧选择一个合约。",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "重新执行已排队",
      description: `合约“${selectedContract.name}”的执行任务将重新运行。`,
    })
  }

  const handleVerifyBlockchain = () => {
    if (!blockchainContract) return
    toast({
      title: "验证中",
      description: "正在验证区块链存证，请稍候...",
    })
    setTimeout(() => {
      toast({
        title: "存证验证通过",
        description: `合约“${blockchainContract.name}”的存证记录有效。`,
      })
      setIsBlockchainDialogOpen(false)
    }, 1500)
  }

  const handleAcknowledgeAlert = (alertId: number) => {
    setAlertsList((prev) => prev.filter((alert) => alert.id !== alertId))
    toast({
      title: "提醒已处理",
      description: "该执行提醒已归档。",
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">合约执行</h1>
            <p className="text-sm text-muted-foreground mt-1">实时监控合约执行状态和自动化流程管理</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExecutionConfig}>
              <Settings className="mr-2 h-4 w-4" />
              执行配置
            </Button>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={handleBatchExecute}>
              <Play className="mr-2 h-4 w-4" />
              批量执行
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">执行中的合约</h2>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="executing">执行中</SelectItem>
                  <SelectItem value="paused">已暂停</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contract List */}
            <div className="space-y-4">
              {filteredContracts.map((contract) => (
                <Card
                  key={contract.id}
                  className={`cursor-pointer transition-all ${
                    selectedContract?.id === contract.id ? "ring-2 ring-secondary" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedContract(contract)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">{contract.name}</CardTitle>
                          {getStatusBadge(contract.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>当前阶段: {contract.currentPhase}</span>
                          <span>下一里程碑: {contract.nextMilestone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">预计完成</p>
                        <p className="text-sm font-medium">{contract.expectedCompletion}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>执行进度</span>
                        <span>{contract.progress}%</span>
                      </div>
                      <Progress value={contract.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">数据传输</p>
                        <p className="font-medium">{contract.metrics.dataTransferred}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">交易金额</p>
                        <p className="font-medium">{contract.metrics.transactionValue}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">完成率</p>
                        <p className="font-medium">{contract.metrics.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">SLA合规</p>
                        <p className="font-medium">{contract.metrics.slaCompliance}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{contract.participants.provider}</span>
                        <span>→</span>
                        <span>{contract.participants.consumer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {contract.status === "executing" && (
                          <Button variant="ghost" size="sm" onClick={(e) => handlePause(e, contract)} title="暂停执行">
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                        {contract.status === "paused" && (
                          <Button variant="ghost" size="sm" onClick={(e) => handleResume(e, contract)} title="恢复执行">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={(e) => handleStop(e, contract)} title="停止执行">
                          <Square className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => handleUploadProof(e, contract)} title="上传凭证">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Execution Steps */}
            {selectedContract && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">执行步骤</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedContract.executionSteps.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">{getStepStatusIcon(step.status)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{step.name}</p>
                          {step.completedAt && (
                            <p className="text-xs text-muted-foreground">完成于: {step.completedAt}</p>
                          )}
                          {step.startedAt && step.status === "in_progress" && (
                            <p className="text-xs text-muted-foreground">开始于: {step.startedAt}</p>
                          )}
                          {step.expectedAt && step.status === "pending" && (
                            <p className="text-xs text-muted-foreground">预计: {step.expectedAt}</p>
                          )}
                          {step.pausedAt && step.status === "paused" && (
                            <p className="text-xs text-muted-foreground">暂停于: {step.pausedAt}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">执行提醒</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {alertsList
                    .filter((alert) => !selectedContract || alert.contractId === selectedContract.id)
                    .map((alert) => (
                      <div key={alert.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-start space-x-2">
                          <div className="flex-shrink-0 mt-0.5">{getAlertIcon(alert.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium">{alert.title}</p>
                              <Badge
                                variant={alert.severity === "high" ? "destructive" : "outline"}
                                className="text-xs"
                              >
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                              <Button variant="ghost" size="sm" className="text-xs" onClick={() => handleAcknowledgeAlert(alert.id)}>
                                知道了
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  onClick={(e) => handleUploadProof(e)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  上传凭证
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  onClick={handleDownloadReport}
                >
                  <Download className="mr-2 h-4 w-4" />
                  下载报告
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  onClick={handleProcessPayment}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  处理付款
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  onClick={handleRetryExecution}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  重新执行
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Execution Config Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>执行配置</DialogTitle>
            <DialogDescription>配置执行任务的自动化规则与通知方式</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>最大重试次数</Label>
                <Input
                  type="number"
                  min={0}
                  value={configForm.maxRetries}
                  onChange={(e) => setConfigForm((prev) => ({ ...prev, maxRetries: Number(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <Label>执行时间窗口</Label>
                <Select
                  value={configForm.executionWindow}
                  onValueChange={(value) => setConfigForm((prev) => ({ ...prev, executionWindow: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6h">6小时</SelectItem>
                    <SelectItem value="12h">12小时</SelectItem>
                    <SelectItem value="24h">24小时</SelectItem>
                    <SelectItem value="48h">48小时</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>通知邮箱</Label>
              <Input
                type="email"
                value={configForm.notifyEmail}
                onChange={(e) => setConfigForm((prev) => ({ ...prev, notifyEmail: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>其他设置</Label>
              <div className="space-y-2 text-sm text-muted-foreground">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={configForm.autoRetry}
                    onChange={(e) => setConfigForm((prev) => ({ ...prev, autoRetry: e.target.checked }))}
                  />
                  <span>执行失败后自动重试</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={configForm.enableAudit}
                    onChange={(e) => setConfigForm((prev) => ({ ...prev, enableAudit: e.target.checked }))}
                  />
                  <span>启用执行审计日志</span>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSaveConfig}>保存配置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Execute Dialog */}
      <Dialog open={isBatchDialogOpen} onOpenChange={setIsBatchDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>批量执行合约</DialogTitle>
            <DialogDescription>选择需要批量执行的合约和执行策略</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {contractList
                .filter((contract) => contract.status !== "completed")
                .map((contract) => (
                  <label key={contract.id} className="flex items-center space-x-2 p-2 border rounded">
                    <input
                      type="checkbox"
                      value={contract.id}
                      checked={batchSelection.includes(contract.id.toString())}
                      onChange={(e) => {
                        const value = e.target.value
                        setBatchSelection((prev) =>
                          e.target.checked ? [...prev, value] : prev.filter((id) => id !== value),
                        )
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{contract.name}</p>
                      <p className="text-xs text-muted-foreground">当前阶段: {contract.currentPhase}</p>
                    </div>
                    {getStatusBadge(contract.status)}
                  </label>
                ))}
            </div>
            <div className="space-y-2">
              <Label>批量执行说明</Label>
              <Textarea
                placeholder="填写执行任务说明（可选）"
                value={uploadRemarks}
                onChange={(e) => setUploadRemarks(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBatchDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmBatch}>确认执行</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Proof Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>上传执行凭证</DialogTitle>
            <DialogDescription>
              {uploadContract ? `合约：${uploadContract.name}` : "选择合约后上传执行凭证"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">拖拽文件到此处或点击上传</p>
              <Button variant="outline" size="sm">
                选择文件
              </Button>
            </div>
            <div className="space-y-2">
              <Label>备注说明</Label>
              <Textarea
                placeholder="填写执行凭证说明（可选）"
                value={uploadRemarks}
                onChange={(e) => setUploadRemarks(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmUpload}>上传凭证</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Blockchain Verification Dialog */}
      <Dialog open={isBlockchainDialogOpen} onOpenChange={setIsBlockchainDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              区块链存证验证
            </DialogTitle>
            <DialogDescription>验证合约在区块链上的存证信息</DialogDescription>
          </DialogHeader>
          {blockchainContract && blockchainContract.blockchainHash && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">合约名称:</span>
                  <span className="font-medium">{blockchainContract.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">合约编号:</span>
                  <span>{blockchainContract.contractNumber}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">交易哈希:</span>
                  <code className="text-xs font-mono">{blockchainContract.blockchainHash.substring(0, 20)}...</code>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">区块高度:</span>
                  <span>1,234,567</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">存证时间:</span>
                  <span>{blockchainContract.expectedCompletion || "2024-01-16"}</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">存证验证通过</span>
                </div>
                <p className="text-xs text-green-700">
                  该合约已成功存证到区块链，所有信息不可篡改，具有法律效力。
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBlockchainDialogOpen(false)}>
              关闭
            </Button>
            {blockchainContract && blockchainContract.blockchainHash && (
              <Button onClick={handleVerifyBlockchain}>
                <Shield className="mr-2 h-4 w-4" />
                重新验证
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
