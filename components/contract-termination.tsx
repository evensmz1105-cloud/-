"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { XCircle, FileText, Clock } from "lucide-react"

export function ContractTermination() {
  const { toast } = useToast()
  const [tabValue, setTabValue] = useState("requests")
  const [selectedTerminationType, setSelectedTerminationType] = useState("")
  const [requests, setRequests] = useState([
    {
      id: "1",
      contractId: "CT-2025-001",
      contractName: "数据共享服务合约",
      requester: "甲方公司",
      type: "完全解除",
      reason: "业务调整",
      status: "待审核",
      submitTime: "2025-03-15 10:30",
      parties: ["甲方公司", "乙方数据提供商"],
    },
    {
      id: "2",
      contractId: "CT-2025-002",
      contractName: "API访问授权合约",
      requester: "乙方服务商",
      type: "部分解除",
      reason: "服务范围变更",
      status: "已批准",
      submitTime: "2025-03-14 16:45",
      parties: ["甲方企业", "乙方服务商"],
    },
  ])

  const [contracts, setContracts] = useState([
    {
      id: "CT-2025-003",
      name: "云存储服务合约",
      parties: ["企业A", "云服务商B"],
      startDate: "2025-03-01",
      endDate: "2025-12-31",
      status: "执行中",
      canTerminate: true,
    },
    {
      id: "CT-2025-004",
      name: "数据分析服务合约",
      parties: ["公司C", "分析服务商D"],
      startDate: "2025-03-15",
      endDate: "2025-09-15",
      status: "执行中",
      canTerminate: true,
    },
  ])

  const [form, setForm] = useState({
    contractId: "",
    type: "",
    clauses: [] as string[],
    reason: "",
    effectiveDate: "",
    description: "",
  })

  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [selectedContractDetail, setSelectedContractDetail] = useState<any>(null)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [isContractDialogOpen, setIsContractDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request)
    setIsRequestDialogOpen(true)
  }

  const handleApproveRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "已批准" } : req)),
    )
    toast({
      title: "已批准",
      description: "解除申请已批准，系统将通知相关方。",
    })
  }

  const handleRejectRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "已拒绝" } : req)),
    )
    toast({
      title: "已拒绝",
      description: "解除申请已拒绝，申请方将收到通知。",
      variant: "destructive",
    })
  }

  const handleToggleClause = (clause: string) => {
    setForm((prev) => {
      const exists = prev.clauses.includes(clause)
      return {
        ...prev,
        clauses: exists ? prev.clauses.filter((c) => c !== clause) : [...prev.clauses, clause],
      }
    })
  }

  const handleSubmitForm = () => {
    if (!form.contractId || !form.type || !form.reason || !form.effectiveDate) {
      toast({
        title: "请完善信息",
        description: "合约、解除类型、原因和生效日期为必填项。",
        variant: "destructive",
      })
      return
    }

    const contract = contracts.find((c) => c.id === form.contractId)
    const newRequest = {
      id: Date.now().toString(),
      contractId: form.contractId,
      contractName: contract?.name || form.contractId,
      requester: "当前用户",
      type: form.type === "full" ? "完全解除" : form.type === "partial" ? "部分解除" : "条件解除",
      reason: form.reason,
      status: "待审核",
      submitTime: new Date().toLocaleString(),
      parties: contract?.parties || [],
    }
    setRequests((prev) => [newRequest, ...prev])
    toast({
      title: "解除申请已提交",
      description: "已通知合同比方和监管人员审批。",
    })
    setForm({
      contractId: "",
      type: "",
      clauses: [],
      reason: "",
      effectiveDate: "",
      description: "",
    })
    setSelectedTerminationType("")
  }

  const handleSaveDraft = () => {
    toast({
      title: "草稿已保存",
      description: "解除申请草稿已保存，可稍后继续编辑。",
    })
  }

  const handlePreview = () => {
    if (!form.contractId) {
      toast({
        title: "请选择合约",
        description: "请先选择一个合约再预览申请。",
        variant: "destructive",
      })
      return
    }
    setIsPreviewDialogOpen(true)
  }

  const handleViewContract = (contract: any) => {
    setSelectedContractDetail(contract)
    setIsContractDialogOpen(true)
  }

  const handleApplyTermination = (contract: any) => {
    setTabValue("create")
    setForm((prev) => ({ ...prev, contractId: contract.id }))
    setSelectedTerminationType("")
    toast({
      title: "已填充合约信息",
      description: "可以继续选择解除类型并提交申请。",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">合同解除</h2>
          <p className="text-muted-foreground">管理合约解除申请，支持部分解除与条件解除</p>
        </div>
        <Button onClick={() => setTabValue("create")}>
          <XCircle className="mr-2 h-4 w-4" />
          发起解除申请
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">解除申请</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">本月新增</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">待审核</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">需要处理</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已批准</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">本月完成</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均处理时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5天</div>
            <p className="text-xs text-muted-foreground">较上月-0.5天</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">解除申请</TabsTrigger>
          <TabsTrigger value="create">发起解除</TabsTrigger>
          <TabsTrigger value="contracts">可解除合约</TabsTrigger>
          <TabsTrigger value="history">历史记录</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>解除申请列表</CardTitle>
              <CardDescription>查看和处理合约解除申请</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{request.contractName}</h4>
                          <Badge variant={request.status === "待审核" ? "secondary" : "default"}>
                            {request.status}
                          </Badge>
                          <Badge variant="outline">{request.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          合约编号: {request.contractId} • 申请方: {request.requester}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewRequest(request)}>
                          查看详情
                        </Button>
                        {request.status === "待审核" && (
                          <>
                            <Button variant="outline" size="sm" onClick={() => handleRejectRequest(request.id)}>
                              拒绝
                            </Button>
                            <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                              批准
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">解除原因:</span> {request.reason}
                      </div>
                      <div>
                        <span className="text-muted-foreground">申请时间:</span> {request.submitTime}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">涉及方:</span> {request.parties.join(", ")}
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
              <CardTitle>发起解除申请</CardTitle>
              <CardDescription>选择合约并填写解除申请信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contract-select">选择合约</Label>
                  <Select
                    value={form.contractId}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, contractId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择要解除的合约" />
                    </SelectTrigger>
                    <SelectContent>
                      {contracts.map((contract) => (
                        <SelectItem key={contract.id} value={contract.id}>
                          {contract.name} ({contract.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="termination-type">解除类型</Label>
                  <Select
                    value={form.type}
                    onValueChange={(value) => {
                      setSelectedTerminationType(value)
                      setForm((prev) => ({ ...prev, type: value }))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择解除类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">完全解除</SelectItem>
                      <SelectItem value="partial">部分解除</SelectItem>
                      <SelectItem value="conditional">条件解除</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedTerminationType === "partial" && (
                <div className="space-y-2">
                  <Label>选择要解除的条款</Label>
                  <div className="space-y-2 border rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="data-delivery"
                        checked={form.clauses.includes("数据交付条款")}
                        onCheckedChange={() => handleToggleClause("数据交付条款")}
                      />
                      <Label htmlFor="data-delivery">数据交付条款</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="payment"
                        checked={form.clauses.includes("付款义务条款")}
                        onCheckedChange={() => handleToggleClause("付款义务条款")}
                      />
                      <Label htmlFor="payment">付款义务条款</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="access-control"
                        checked={form.clauses.includes("访问控制条款")}
                        onCheckedChange={() => handleToggleClause("访问控制条款")}
                      />
                      <Label htmlFor="access-control">访问控制条款</Label>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reason">解除原因</Label>
                <Textarea
                  id="reason"
                  placeholder="请详细说明解除合约的原因..."
                  className="min-h-[100px]"
                  value={form.reason}
                  onChange={(e) => setForm((prev) => ({ ...prev, reason: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="effective-date">生效日期</Label>
                <Input
                  id="effective-date"
                  type="date"
                  value={form.effectiveDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, effectiveDate: e.target.value }))}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleSubmitForm}>
                  <FileText className="mr-2 h-4 w-4" />
                  提交申请
                </Button>
                <Button variant="outline" onClick={handleSaveDraft}>
                  保存草稿
                </Button>
                <Button variant="outline" onClick={handlePreview}>
                  预览申请
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>可解除合约</CardTitle>
              <CardDescription>查看当前可以申请解除的活跃合约</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{contract.name}</h4>
                        <Badge variant="default">{contract.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contract.id} • {contract.startDate} 至 {contract.endDate}
                      </div>
                      <div className="text-sm text-muted-foreground">参与方: {contract.parties.join(", ")}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewContract(contract)}>
                        查看合约
                      </Button>
                      <Button size="sm" disabled={!contract.canTerminate} onClick={() => handleApplyTermination(contract)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        申请解除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>解除历史</CardTitle>
              <CardDescription>查看已完成的合约解除记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="mx-auto h-12 w-12 mb-4" />
                <p>暂无历史解除记录</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Request Detail Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>解除申请详情</DialogTitle>
            <DialogDescription>查看申请信息并进行审批操作</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">合约名称</p>
                <p className="font-medium">{selectedRequest.contractName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">合约编号</p>
                  <p>{selectedRequest.contractId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">申请方</p>
                  <p>{selectedRequest.requester}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">解除类型</p>
                  <p>{selectedRequest.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">提交时间</p>
                  <p>{selectedRequest.submitTime}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">解除原因</p>
                <p>{selectedRequest.reason}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">涉及方</p>
                <p>{selectedRequest.parties.join("，")}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
              关闭
            </Button>
            {selectedRequest?.status === "待审核" && (
              <>
                <Button variant="outline" onClick={() => selectedRequest && handleRejectRequest(selectedRequest.id)}>
                  拒绝
                </Button>
                <Button onClick={() => selectedRequest && handleApproveRequest(selectedRequest.id)}>批准</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contract Detail Dialog */}
      <Dialog open={isContractDialogOpen} onOpenChange={setIsContractDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>合约详情</DialogTitle>
            <DialogDescription>查看合约基本信息和参与方</DialogDescription>
          </DialogHeader>
          {selectedContractDetail && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">合约名称</p>
                <p className="font-medium">{selectedContractDetail.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">合约编号</p>
                <p>{selectedContractDetail.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">生效时间</p>
                <p>
                  {selectedContractDetail.startDate} 至 {selectedContractDetail.endDate}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">参与方</p>
                <div className="flex flex-wrap gap-2">
                  {selectedContractDetail.parties.map((party: string) => (
                    <Badge key={party} variant="outline">
                      {party}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContractDialogOpen(false)}>
              关闭
            </Button>
            <Button onClick={() => selectedContractDetail && handleApplyTermination(selectedContractDetail)}>发起解除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>解除申请预览</DialogTitle>
            <DialogDescription>提交前确认申请内容</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">合约编号</span>
              <span>{form.contractId || "-"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">解除类型</span>
              <span>
                {form.type === "full"
                  ? "完全解除"
                  : form.type === "partial"
                    ? "部分解除"
                    : form.type === "conditional"
                      ? "条件解除"
                      : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">生效日期</span>
              <span>{form.effectiveDate || "-"}</span>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">解除原因</p>
              <p>{form.reason || "未填写"}</p>
            </div>
            {form.clauses.length > 0 && (
              <div>
                <p className="text-muted-foreground mb-1">解除条款</p>
                <div className="flex flex-wrap gap-2">
                  {form.clauses.map((clause) => (
                    <Badge key={clause} variant="outline">
                      {clause}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              返回修改
            </Button>
            <Button
              onClick={() => {
                setIsPreviewDialogOpen(false)
                handleSubmitForm()
              }}
            >
              确认提交
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
