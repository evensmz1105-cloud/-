"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileSignature,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
  Eye,
  Download,
  Shield,
  Fingerprint,
  Link,
  History,
  X,
  Trash2,
  Upload,
} from "lucide-react"

const contracts = [
  {
    id: 1,
    name: "银行间数据共享协议-ABC银行",
    status: "pending_signature",
    participants: [
      { name: "ABC银行", role: "数据提供方", status: "signed", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "XYZ银行", role: "数据使用方", status: "pending", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "央行监管", role: "见证方", status: "pending", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    signingMode: "sequential",
    deadline: "2024-01-20",
    progress: 33,
  },
  {
    id: 2,
    name: "医疗数据研究授权-医学院",
    status: "negotiating",
    participants: [
      { name: "市人民医院", role: "数据提供方", status: "negotiating", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "医学研究院", role: "数据使用方", status: "negotiating", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    signingMode: "parallel",
    deadline: "2024-01-25",
    progress: 0,
  },
  {
    id: 3,
    name: "教育资源共享协议-在线平台",
    status: "completed",
    participants: [
      { name: "教育出版社", role: "内容提供方", status: "signed", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "在线教育平台", role: "平台方", status: "signed", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    signingMode: "parallel",
    deadline: "2024-01-15",
    progress: 100,
  },
]

const negotiations = [
  {
    id: 1,
    contractId: 1,
    participant: "XYZ银行",
    message: "建议将数据访问频率从每日调整为每周，以降低系统负载",
    timestamp: "2024-01-16 14:30",
    type: "suggestion",
  },
  {
    id: 2,
    contractId: 1,
    participant: "ABC银行",
    message: "同意调整访问频率，但需要增加紧急访问条款",
    timestamp: "2024-01-16 15:45",
    type: "response",
  },
  {
    id: 3,
    contractId: 2,
    participant: "医学研究院",
    message: "请确认数据匿名化的具体标准和流程",
    timestamp: "2024-01-16 10:20",
    type: "question",
  },
]

const signingMethods = [
  { value: "digital", label: "数字签名", description: "使用数字证书进行签名" },
  { value: "biometric", label: "生物识别", description: "指纹或面部识别签名" },
  { value: "sms", label: "短信验证", description: "通过短信验证码确认" },
  { value: "hardware", label: "硬件令牌", description: "使用USB Key等硬件设备" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "pending_signature":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">待签署</Badge>
    case "negotiating":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">协商中</Badge>
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已完成</Badge>
    case "expired":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">已过期</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getParticipantStatusBadge(status: string) {
  switch (status) {
    case "signed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "negotiating":
      return <MessageSquare className="h-4 w-4 text-blue-600" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-400" />
  }
}

export function ContractSigning() {
  const { toast } = useToast()
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [isSigningDialogOpen, setIsSigningDialogOpen] = useState(false)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [isBatchSignDialogOpen, setIsBatchSignDialogOpen] = useState(false)
  const [isViewContractOpen, setIsViewContractOpen] = useState(false)
  const [isBlockchainDialogOpen, setIsBlockchainDialogOpen] = useState(false)
  const [negotiationMessage, setNegotiationMessage] = useState("")
  const [signingMethod, setSigningMethod] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [contractsList, setContractsList] = useState(contracts)
  const [negotiationsList, setNegotiationsList] = useState(negotiations)
  const [selectedContractForSigning, setSelectedContractForSigning] = useState<any>(null)
  
  // 筛选合约
  const filteredContracts = contractsList.filter((contract) => {
    if (statusFilter === "all") return true
    if (statusFilter === "pending") return contract.status === "pending_signature"
    if (statusFilter === "negotiating") return contract.status === "negotiating"
    if (statusFilter === "completed") return contract.status === "completed"
    return true
  })
  
  // 处理查看合约
  const handleViewContract = (contract: any) => {
    setSelectedContract(contract)
    setIsViewContractOpen(true)
  }
  
  // 处理协商
  const handleNegotiate = (contract: any) => {
    setSelectedContract(contract)
    toast({
      title: "协商功能",
      description: "已打开协商面板，可以发送消息",
    })
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
  
  // 处理立即签署
  const handleStartSigning = (contract: any) => {
    setSelectedContractForSigning(contract)
    setIsSigningDialogOpen(true)
  }
  
  // 处理确认签署
  const handleConfirmSigning = () => {
    if (!signingMethod) {
      toast({
        title: "请选择签名方式",
        description: "请先选择一种签名方式",
        variant: "destructive",
      })
      return
    }
    
    if (!selectedContractForSigning) return
    
    // 更新合约状态
    setContractsList(prev => prev.map(contract => {
      if (contract.id === selectedContractForSigning.id) {
        // 更新当前用户的签署状态
        const updatedParticipants = contract.participants.map((p: any) => {
          if (p.status === "pending") {
            return { ...p, status: "signed" }
          }
          return p
        })
        
        // 计算进度
        const signedCount = updatedParticipants.filter((p: any) => p.status === "signed").length
        const progress = Math.round((signedCount / updatedParticipants.length) * 100)
        
        // 检查是否全部签署完成
        const allSigned = updatedParticipants.every((p: any) => p.status === "signed")
        
        return {
          ...contract,
          participants: updatedParticipants,
          progress,
          status: allSigned ? "completed" : contract.status,
        }
      }
      return contract
    }))
    
    setIsSigningDialogOpen(false)
    setSigningMethod("")
    setSelectedContractForSigning(null)
    
    toast({
      title: "签署成功",
      description: "合约已成功签署，签名已通过区块链存证",
    })
  }
  
  // 处理发送协商消息
  const handleSendNegotiation = () => {
    if (!negotiationMessage.trim()) {
      toast({
        title: "消息不能为空",
        description: "请输入协商意见或问题",
        variant: "destructive",
      })
      return
    }
    
    if (!selectedContract) {
      toast({
        title: "请选择合约",
        description: "请先选择一个合约",
        variant: "destructive",
      })
      return
    }
    
    const newNegotiation = {
      id: Math.max(...negotiationsList.map(n => n.id), 0) + 1,
      contractId: selectedContract.id,
      participant: "当前用户",
      message: negotiationMessage,
      timestamp: new Date().toLocaleString("zh-CN"),
      type: "message",
    }
    
    setNegotiationsList(prev => [...prev, newNegotiation])
    setNegotiationMessage("")
    
    toast({
      title: "消息已发送",
      description: "协商消息已发送给所有参与方",
    })
  }
  
  // 处理查看合约内容
  const handleViewContractContent = () => {
    if (!selectedContract) return
    setIsViewContractOpen(true)
  }
  
  // 处理区块链存证
  const handleBlockchainProof = () => {
    if (!selectedContract) return
    setIsBlockchainDialogOpen(true)
  }
  
  // 处理签署历史
  const handleSigningHistory = () => {
    setIsHistoryDialogOpen(true)
  }
  
  // 处理批量签署
  const handleBatchSigning = () => {
    const pendingContracts = contractsList.filter(c => c.status === "pending_signature")
    if (pendingContracts.length === 0) {
      toast({
        title: "没有待签署合约",
        description: "当前没有需要批量签署的合约",
        variant: "destructive",
      })
      return
    }
    setIsBatchSignDialogOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">合约签署</h1>
            <p className="text-sm text-muted-foreground mt-1">多方在线协商与数字签名管理</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleSigningHistory}>
              <History className="mr-2 h-4 w-4" />
              签署历史
            </Button>
            <Button 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={handleBatchSigning}
            >
              <FileSignature className="mr-2 h-4 w-4" />
              批量签署
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Contract List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">待处理合约</h2>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending">待签署</SelectItem>
                  <SelectItem value="negotiating">协商中</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                      <CardTitle className="text-lg">{contract.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(contract.status)}
                        <Badge variant="outline" className="text-xs">
                          {contract.signingMode === "sequential" ? "顺序签署" : "并行签署"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">截止日期</p>
                      <p className="text-sm font-medium">{contract.deadline}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>签署进度</span>
                      <span>{contract.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full transition-all"
                        style={{ width: `${contract.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">参与方</p>
                    <div className="space-y-2">
                      {contract.participants.map((participant, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{participant.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {participant.role}
                            </Badge>
                          </div>
                          {getParticipantStatusBadge(participant.status)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewContract(contract)
                        }}
                        title="查看合约"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNegotiate(contract)
                        }}
                        title="协商讨论"
                      >
                        <MessageSquare className="h-4 w-4" />
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
                    </div>
                    {contract.status === "pending_signature" && (
                      <Dialog open={isSigningDialogOpen} onOpenChange={setIsSigningDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleStartSigning(contract)
                            }}
                          >
                            <FileSignature className="mr-2 h-4 w-4" />
                            立即签署
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>数字签名</DialogTitle>
                            <DialogDescription>选择签名方式完成合约签署</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>签名方式</Label>
                              <Select value={signingMethod} onValueChange={setSigningMethod}>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择签名方式" />
                                </SelectTrigger>
                                <SelectContent>
                                  {signingMethods.map((method) => (
                                    <SelectItem key={method.value} value={method.value}>
                                      <div>
                                        <div className="font-medium">{method.label}</div>
                                        <div className="text-sm text-muted-foreground">{method.description}</div>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <Shield className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium">安全验证</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                签名将通过区块链技术进行存证，确保不可篡改性和法律效力
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setIsSigningDialogOpen(false)
                                setSigningMethod("")
                                setSelectedContractForSigning(null)
                              }}
                            >
                              取消
                            </Button>
                            <Button onClick={handleConfirmSigning}>
                              <Fingerprint className="mr-2 h-4 w-4" />
                              确认签署
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contract Details */}
            {selectedContract && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">合约详情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">合约状态</span>
                      {getStatusBadge(selectedContract.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">签署模式</span>
                      <span>{selectedContract.signingMode === "sequential" ? "顺序签署" : "并行签署"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">截止时间</span>
                      <span>{selectedContract.deadline}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent" 
                      size="sm"
                      onClick={handleViewContractContent}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      查看合约内容
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent" 
                      size="sm"
                      onClick={handleBlockchainProof}
                    >
                      <Link className="mr-2 h-4 w-4" />
                      区块链存证
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Negotiation Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">协商讨论</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {negotiationsList
                    .filter((neg) => !selectedContract || neg.contractId === selectedContract.id)
                    .map((negotiation) => (
                      <div key={negotiation.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{negotiation.participant}</span>
                          <span className="text-xs text-muted-foreground">{negotiation.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{negotiation.message}</p>
                      </div>
                    ))}
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="输入协商意见或问题..."
                    value={negotiationMessage}
                    onChange={(e) => setNegotiationMessage(e.target.value)}
                    className="min-h-20"
                  />
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={handleSendNegotiation}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    发送消息
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* View Contract Dialog */}
      <Dialog open={isViewContractOpen} onOpenChange={setIsViewContractOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>合约内容</DialogTitle>
            <DialogDescription>查看完整的合约条款和内容</DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold">{selectedContract.name}</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedContract.status)}
                  <Badge variant="outline">
                    {selectedContract.signingMode === "sequential" ? "顺序签署" : "并行签署"}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">合约条款</h4>
                  <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                    <p>1. 数据共享范围：双方同意在以下范围内共享数据...</p>
                    <p>2. 访问权限：数据使用方仅可在授权范围内访问数据...</p>
                    <p>3. 数据安全：所有数据传输和存储必须符合安全标准...</p>
                    <p>4. 使用限制：数据不得用于未授权的商业用途...</p>
                    <p>5. 违约责任：违反本协议的一方需承担相应法律责任...</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">参与方信息</h4>
                  <div className="space-y-2">
                    {selectedContract.participants.map((participant: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{participant.name}</p>
                            <p className="text-xs text-muted-foreground">{participant.role}</p>
                          </div>
                        </div>
                        {getParticipantStatusBadge(participant.status)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewContractOpen(false)}>关闭</Button>
            <Button onClick={() => {
              if (selectedContract) {
                handleDownloadContract(selectedContract)
              }
            }}>
              <Download className="mr-2 h-4 w-4" />
              下载合约
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Blockchain Proof Dialog */}
      <Dialog open={isBlockchainDialogOpen} onOpenChange={setIsBlockchainDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              区块链存证信息
            </DialogTitle>
            <DialogDescription>查看合约在区块链上的存证记录</DialogDescription>
          </DialogHeader>
          {selectedContract && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">交易哈希:</span>
                  <span className="font-mono text-xs">0x1234...5678abcd</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">区块高度:</span>
                  <span>1,234,567</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">存证时间:</span>
                  <span>{new Date().toLocaleString("zh-CN")}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">存证状态:</span>
                  <Badge className="bg-green-100 text-green-800">已确认</Badge>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">存证验证通过</span>
                </div>
                <p className="text-xs text-green-700">
                  该合约已成功存证到区块链，所有签名记录不可篡改，具有法律效力
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBlockchainDialogOpen(false)}>关闭</Button>
            <Button onClick={() => {
              toast({
                title: "存证证明已复制",
                description: "区块链交易哈希已复制到剪贴板",
              })
            }}>
              <Link className="mr-2 h-4 w-4" />
              复制交易哈希
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Signing History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>签署历史</DialogTitle>
            <DialogDescription>查看所有合约的签署历史记录</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {contractsList.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{contract.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(contract.status)}
                        <span className="text-xs text-muted-foreground">
                          进度: {contract.progress}%
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{contract.deadline}</span>
                  </div>
                  <div className="space-y-2">
                    {contract.participants.map((participant: any, index: number) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{participant.name}</span>
                          <Badge variant="outline" className="text-xs">{participant.role}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getParticipantStatusBadge(participant.status)}
                          {participant.status === "signed" && (
                            <span className="text-xs text-muted-foreground">已签署</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsHistoryDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Signing Dialog */}
      <Dialog open={isBatchSignDialogOpen} onOpenChange={setIsBatchSignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>批量签署</DialogTitle>
            <DialogDescription>选择要批量签署的合约</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {contractsList
                .filter(c => c.status === "pending_signature")
                .map((contract) => (
                  <div key={contract.id} className="flex items-center space-x-2 p-2 border rounded">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{contract.name}</p>
                      <p className="text-xs text-muted-foreground">
                        截止日期: {contract.deadline}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="space-y-2">
              <Label>批量签名方式</Label>
              <Select value={signingMethod} onValueChange={setSigningMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="选择签名方式" />
                </SelectTrigger>
                <SelectContent>
                  {signingMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      <div>
                        <div className="font-medium">{method.label}</div>
                        <div className="text-sm text-muted-foreground">{method.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBatchSignDialogOpen(false)}>取消</Button>
            <Button onClick={() => {
              if (!signingMethod) {
                toast({
                  title: "请选择签名方式",
                  description: "请先选择一种签名方式",
                  variant: "destructive",
                })
                return
              }
              setIsBatchSignDialogOpen(false)
              toast({
                title: "批量签署成功",
                description: "所有选中的合约已成功签署",
              })
            }}>
              <FileSignature className="mr-2 h-4 w-4" />
              确认批量签署
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
