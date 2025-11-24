"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Archive, Search, Filter, Eye, Download, Shield, Clock, CheckCircle, Link, History, Upload, X } from "lucide-react"

const filedContracts = [
  {
    id: 1,
    name: "银行间数据共享协议-ABC银行",
    contractNumber: "DC2024001",
    filingDate: "2024-01-15",
    status: "approved",
    industry: "金融",
    participants: ["ABC银行", "XYZ银行", "央行监管"],
    blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    accessLevel: "restricted",
    version: "1.0",
    expiryDate: "2025-01-15",
  },
  {
    id: 2,
    name: "医疗数据研究授权-医学院",
    contractNumber: "DC2024002",
    filingDate: "2024-01-14",
    status: "under_review",
    industry: "医疗",
    participants: ["市人民医院", "医学研究院"],
    blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890ab",
    accessLevel: "confidential",
    version: "2.1",
    expiryDate: "2024-07-14",
  },
  {
    id: 3,
    name: "教育资源共享协议-在线平台",
    contractNumber: "DC2024003",
    filingDate: "2024-01-13",
    status: "approved",
    industry: "教育",
    participants: ["教育出版社", "在线教育平台"],
    blockchainHash: "0x3c4d5e6f7890abcdef1234567890abcd",
    accessLevel: "public",
    version: "1.2",
    expiryDate: "2026-01-13",
  },
  {
    id: 4,
    name: "政府数据开放协议-统计局",
    contractNumber: "DC2024004",
    filingDate: "2024-01-12",
    status: "rejected",
    industry: "政府",
    participants: ["国家统计局", "数据服务商"],
    blockchainHash: "",
    accessLevel: "public",
    version: "1.0",
    expiryDate: "2024-12-31",
  },
]

const accessLogs = [
  {
    id: 1,
    contractId: 1,
    accessor: "监管机构A",
    accessTime: "2024-01-16 09:30",
    action: "查看合约内容",
    ipAddress: "192.168.1.100",
  },
  {
    id: 2,
    contractId: 1,
    accessor: "ABC银行法务部",
    accessTime: "2024-01-16 14:20",
    action: "下载合约副本",
    ipAddress: "10.0.0.50",
  },
  {
    id: 3,
    contractId: 2,
    accessor: "医学研究院",
    accessTime: "2024-01-15 16:45",
    action: "查看审核状态",
    ipAddress: "172.16.0.25",
  },
]

const stats = [
  { name: "已备案合约", value: "156", change: "+12", icon: Archive, color: "text-blue-600" },
  { name: "待审核", value: "8", change: "+3", icon: Clock, color: "text-yellow-600" },
  { name: "审核通过", value: "142", change: "+10", icon: CheckCircle, color: "text-green-600" },
  { name: "区块链存证", value: "148", change: "+11", icon: Shield, color: "text-purple-600" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已通过</Badge>
    case "under_review":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">审核中</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">已拒绝</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getAccessLevelBadge(level: string) {
  switch (level) {
    case "public":
      return (
        <Badge variant="outline" className="text-green-700 border-green-300">
          公开
        </Badge>
      )
    case "restricted":
      return (
        <Badge variant="outline" className="text-yellow-700 border-yellow-300">
          受限
        </Badge>
      )
    case "confidential":
      return (
        <Badge variant="outline" className="text-red-700 border-red-300">
          机密
        </Badge>
      )
    default:
      return <Badge variant="outline">{level}</Badge>
  }
}

export function ContractFiling() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterIndustry, setFilterIndustry] = useState("all")
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [isNewFilingDialogOpen, setIsNewFilingDialogOpen] = useState(false)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [isViewContractOpen, setIsViewContractOpen] = useState(false)
  const [isBlockchainVerifyOpen, setIsBlockchainVerifyOpen] = useState(false)
  const [contractsList, setContractsList] = useState(filedContracts)
  const [accessLogsList, setAccessLogsList] = useState(accessLogs)
  
  // 新增备案表单
  const [filingForm, setFilingForm] = useState({
    contractName: "",
    contractNumber: "",
    industry: "",
    accessLevel: "",
    description: "",
  })

  const filteredContracts = contractsList.filter((contract) => {
    const matchesSearch =
      contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || contract.status === filterStatus
    const matchesIndustry = filterIndustry === "all" || contract.industry === filterIndustry
    return matchesSearch && matchesStatus && matchesIndustry
  })
  
  // 处理备案历史
  const handleFilingHistory = () => {
    setIsHistoryDialogOpen(true)
  }
  
  // 处理新增备案
  const handleNewFiling = () => {
    setIsNewFilingDialogOpen(true)
  }
  
  // 处理提交备案
  const handleSubmitFiling = () => {
    if (!filingForm.contractName || !filingForm.contractNumber || !filingForm.industry || !filingForm.accessLevel) {
      toast({
        title: "信息不完整",
        description: "请填写所有必填项",
        variant: "destructive",
      })
      return
    }
    
    const newContract = {
      id: Math.max(...contractsList.map(c => c.id), 0) + 1,
      name: filingForm.contractName,
      contractNumber: filingForm.contractNumber,
      filingDate: new Date().toISOString().split('T')[0],
      status: "under_review",
      industry: filingForm.industry,
      participants: [],
      blockchainHash: "",
      accessLevel: filingForm.accessLevel,
      version: "1.0",
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }
    
    setContractsList(prev => [...prev, newContract])
    setIsNewFilingDialogOpen(false)
    
    // 重置表单
    setFilingForm({
      contractName: "",
      contractNumber: "",
      industry: "",
      accessLevel: "",
      description: "",
    })
    
    toast({
      title: "备案已提交",
      description: `合约"${newContract.name}"已提交备案，等待审核`,
    })
  }
  
  // 处理查看合约
  const handleViewContract = (contract: any) => {
    setSelectedContract(contract)
    setIsViewContractOpen(true)
  }
  
  // 处理下载合约
  const handleDownloadContract = (contract: any) => {
    toast({
      title: "下载中",
      description: `正在下载合约"${contract.name}"...`,
    })
    // 模拟下载
    setTimeout(() => {
      toast({
        title: "下载完成",
        description: "合约文件已成功下载",
      })
    }, 1500)
  }
  
  // 处理区块链链接
  const handleBlockchainLink = (contract: any) => {
    if (!contract.blockchainHash) {
      toast({
        title: "未存证",
        description: "该合约尚未进行区块链存证",
        variant: "destructive",
      })
      return
    }
    
    setIsBlockchainVerifyOpen(true)
    setSelectedContract(contract)
  }
  
  // 处理验证存证
  const handleVerifyBlockchain = () => {
    if (!selectedContract) return
    
    toast({
      title: "验证中",
      description: "正在验证区块链存证...",
    })
    
    // 模拟验证
    setTimeout(() => {
      toast({
        title: "验证成功",
        description: "区块链存证验证通过，合约信息完整且不可篡改",
      })
      setIsBlockchainVerifyOpen(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">合约备案</h1>
            <p className="text-sm text-muted-foreground mt-1">合约备案管理与区块链存证查询</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleFilingHistory}>
              <History className="mr-2 h-4 w-4" />
              备案历史
            </Button>
            <Button 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={handleNewFiling}
            >
              <Archive className="mr-2 h-4 w-4" />
              新增备案
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className={stat.color}>{stat.change}</span> 本月
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索合约名称或编号..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="approved">已通过</SelectItem>
                  <SelectItem value="under_review">审核中</SelectItem>
                  <SelectItem value="rejected">已拒绝</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部行业</SelectItem>
                  <SelectItem value="金融">金融</SelectItem>
                  <SelectItem value="医疗">医疗</SelectItem>
                  <SelectItem value="教育">教育</SelectItem>
                  <SelectItem value="政府">政府</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAdvancedFilterOpen(true)}
              >
                <Filter className="mr-2 h-4 w-4" />
                高级筛选
              </Button>
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
                          <span>编号: {contract.contractNumber}</span>
                          <span>备案日期: {contract.filingDate}</span>
                          <Badge variant="outline">{contract.industry}</Badge>
                        </div>
                      </div>
                      <div className="text-right">{getAccessLevelBadge(contract.accessLevel)}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">参与方: {contract.participants.length}</span>
                        <span className="text-muted-foreground">版本: v{contract.version}</span>
                        <span className="text-muted-foreground">到期: {contract.expiryDate}</span>
                      </div>
                    </div>

                    {contract.blockchainHash && (
                      <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-muted-foreground">区块链存证:</span>
                        <code className="text-xs font-mono bg-background px-2 py-1 rounded">
                          {contract.blockchainHash.substring(0, 20)}...
                        </code>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-wrap gap-1">
                        {contract.participants.slice(0, 2).map((participant, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {participant}
                          </Badge>
                        ))}
                        {contract.participants.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{contract.participants.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewContract(contract)
                          }}
                          title="查看详情"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadContract(contract)
                          }}
                          title="下载合约"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBlockchainLink(contract)
                          }}
                          title="区块链存证"
                        >
                          <Link className="h-4 w-4" />
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
            {/* Contract Details */}
            {selectedContract && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">备案详情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">备案状态</span>
                      {getStatusBadge(selectedContract.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">访问级别</span>
                      {getAccessLevelBadge(selectedContract.accessLevel)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">合约版本</span>
                      <span>v{selectedContract.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">到期日期</span>
                      <span>{selectedContract.expiryDate}</span>
                    </div>
                  </div>
                  {selectedContract.blockchainHash && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">区块链存证</p>
                      <div className="p-2 bg-muted rounded-lg">
                        <code className="text-xs font-mono break-all">{selectedContract.blockchainHash}</code>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full bg-transparent" 
                        size="sm"
                        onClick={handleBlockchainLink}
                      >
                        <Link className="mr-2 h-4 w-4" />
                        验证存证
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Access Logs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">访问日志</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {accessLogsList
                    .filter((log) => !selectedContract || log.contractId === selectedContract.id)
                    .map((log) => (
                      <div key={log.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{log.accessor}</span>
                          <span className="text-xs text-muted-foreground">{log.accessTime}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.action}</p>
                        <p className="text-xs text-muted-foreground">IP: {log.ipAddress}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* New Filing Dialog */}
      <Dialog open={isNewFilingDialogOpen} onOpenChange={setIsNewFilingDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>新增合约备案</DialogTitle>
            <DialogDescription>提交新合约进行备案审核</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>合约名称</Label>
                <Input
                  placeholder="输入合约名称"
                  value={filingForm.contractName}
                  onChange={(e) => setFilingForm(prev => ({ ...prev, contractName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>合约编号</Label>
                <Input
                  placeholder="输入合约编号"
                  value={filingForm.contractNumber}
                  onChange={(e) => setFilingForm(prev => ({ ...prev, contractNumber: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>所属行业</Label>
                <Select 
                  value={filingForm.industry}
                  onValueChange={(value) => setFilingForm(prev => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择行业" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="金融">金融</SelectItem>
                    <SelectItem value="医疗">医疗</SelectItem>
                    <SelectItem value="教育">教育</SelectItem>
                    <SelectItem value="政府">政府</SelectItem>
                    <SelectItem value="企业">企业</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>访问级别</Label>
                <Select 
                  value={filingForm.accessLevel}
                  onValueChange={(value) => setFilingForm(prev => ({ ...prev, accessLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择访问级别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">公开</SelectItem>
                    <SelectItem value="restricted">受限</SelectItem>
                    <SelectItem value="confidential">机密</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>合约描述</Label>
              <Textarea
                placeholder="详细描述合约的内容和用途"
                value={filingForm.description}
                onChange={(e) => setFilingForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">上传合约文件（可选）</p>
              <Button variant="outline" size="sm">
                选择文件
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsNewFilingDialogOpen(false)
                setFilingForm({
                  contractName: "",
                  contractNumber: "",
                  industry: "",
                  accessLevel: "",
                  description: "",
                })
              }}
            >
              取消
            </Button>
            <Button onClick={handleSubmitFiling}>提交备案</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Contract Dialog */}
      <Dialog open={isViewContractOpen} onOpenChange={setIsViewContractOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>合约详情</DialogTitle>
            <DialogDescription>查看完整的合约备案信息</DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{selectedContract.name}</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedContract.status)}
                  {getAccessLevelBadge(selectedContract.accessLevel)}
                  <Badge variant="outline">{selectedContract.industry}</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">基本信息</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">合约编号:</span>
                      <span>{selectedContract.contractNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">备案日期:</span>
                      <span>{selectedContract.filingDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">合约版本:</span>
                      <span>v{selectedContract.version}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">到期日期:</span>
                      <span>{selectedContract.expiryDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">参与方</h4>
                  <div className="space-y-1">
                    {selectedContract.participants.map((participant: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {participant}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedContract.blockchainHash && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">区块链存证</h4>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">已存证</span>
                    </div>
                    <code className="text-xs font-mono break-all">{selectedContract.blockchainHash}</code>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewContractOpen(false)}>关闭</Button>
            {selectedContract && (
              <Button onClick={() => {
                handleDownloadContract(selectedContract)
                setIsViewContractOpen(false)
              }}>
                <Download className="mr-2 h-4 w-4" />
                下载合约
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Blockchain Verify Dialog */}
      <Dialog open={isBlockchainVerifyOpen} onOpenChange={setIsBlockchainVerifyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              区块链存证验证
            </DialogTitle>
            <DialogDescription>验证合约在区块链上的存证信息</DialogDescription>
          </DialogHeader>
          {selectedContract && selectedContract.blockchainHash && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">合约名称:</span>
                  <span className="font-medium">{selectedContract.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">合约编号:</span>
                  <span>{selectedContract.contractNumber}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">交易哈希:</span>
                  <code className="text-xs font-mono">{selectedContract.blockchainHash.substring(0, 20)}...</code>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">区块高度:</span>
                  <span>1,234,567</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">存证时间:</span>
                  <span>{selectedContract.filingDate}</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">存证验证通过</span>
                </div>
                <p className="text-xs text-green-700">
                  该合约已成功存证到区块链，所有信息不可篡改，具有法律效力
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBlockchainVerifyOpen(false)}>关闭</Button>
            {selectedContract && selectedContract.blockchainHash && (
              <Button onClick={handleVerifyBlockchain}>
                <Shield className="mr-2 h-4 w-4" />
                重新验证
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filing History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>备案历史</DialogTitle>
            <DialogDescription>查看所有合约的备案历史记录</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {contractsList.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{contract.name}</h4>
                        {getStatusBadge(contract.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>编号: {contract.contractNumber}</span>
                        <span>备案日期: {contract.filingDate}</span>
                        <Badge variant="outline">{contract.industry}</Badge>
                      </div>
                    </div>
                    {getAccessLevelBadge(contract.accessLevel)}
                  </div>
                  {contract.blockchainHash && (
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg mt-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-muted-foreground">已存证</span>
                      <code className="text-xs font-mono">
                        {contract.blockchainHash.substring(0, 16)}...
                      </code>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsHistoryDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Filter Dialog */}
      <Dialog open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>高级筛选</DialogTitle>
            <DialogDescription>使用多个条件筛选备案合约</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>备案日期范围</Label>
              <div className="flex items-center space-x-2">
                <Input type="date" />
                <span>-</span>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>到期日期范围</Label>
              <div className="flex items-center space-x-2">
                <Input type="date" />
                <span>-</span>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>合约版本</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择版本" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部版本</SelectItem>
                  <SelectItem value="1.0">v1.0</SelectItem>
                  <SelectItem value="1.1">v1.1</SelectItem>
                  <SelectItem value="1.2">v1.2</SelectItem>
                  <SelectItem value="2.0">v2.0</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>是否已存证</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择选项" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="yes">已存证</SelectItem>
                  <SelectItem value="no">未存证</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdvancedFilterOpen(false)}>取消</Button>
            <Button onClick={() => {
              setIsAdvancedFilterOpen(false)
              toast({
                title: "筛选已应用",
                description: "高级筛选条件已应用",
              })
            }}>应用筛选</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
