"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  FileText,
  Plus,
  Users,
  DollarSign,
  Shield,
  CheckCircle,
  AlertTriangle,
  Eye,
  Save,
  Send,
  BookTemplate,
  Workflow,
  Settings,
  X,
  Trash2,
  Edit,
  Upload,
} from "lucide-react"

const contractTemplates = [
  {
    id: 1,
    name: "银行间数据共享协议",
    industry: "金融",
    scenario: "订阅式共享",
    description: "适用于银行间客户信息和交易数据的安全共享",
  },
  {
    id: 2,
    name: "医疗数据研究授权",
    industry: "医疗",
    scenario: "限时访问",
    description: "医疗机构向研究机构提供匿名化数据的授权模板",
  },
  {
    id: 3,
    name: "教育资源按次计费",
    industry: "教育",
    scenario: "按次计费",
    description: "在线教育平台按课程访问次数计费的标准模板",
  },
]

const participants = [
  { id: 1, name: "数据提供方", role: "provider", required: true },
  { id: 2, name: "数据使用方", role: "consumer", required: true },
  { id: 3, name: "监管机构", role: "regulator", required: false },
]

const deliveryNodes = [
  {
    id: 1,
    name: "数据准备",
    description: "数据提供方准备和验证数据",
    duration: "2天",
    responsible: "数据提供方",
    conditions: ["数据质量检查", "隐私脱敏处理"],
  },
  {
    id: 2,
    name: "数据交付",
    description: "通过安全通道传输数据",
    duration: "1天",
    responsible: "系统自动",
    conditions: ["网络连接正常", "传输加密验证"],
  },
  {
    id: 3,
    name: "数据验收",
    description: "数据使用方验收数据完整性",
    duration: "3天",
    responsible: "数据使用方",
    conditions: ["数据完整性检查", "格式规范验证"],
  },
]

const paymentConditions = [
  {
    id: 1,
    name: "预付款",
    amount: "30%",
    trigger: "合约签署后",
    description: "合约生效后3个工作日内支付",
  },
  {
    id: 2,
    name: "交付款",
    amount: "60%",
    trigger: "数据交付完成",
    description: "数据交付验收通过后支付",
  },
  {
    id: 3,
    name: "尾款",
    amount: "10%",
    trigger: "服务期满",
    description: "服务期结束后支付剩余款项",
  },
]

const accessRules = [
  { id: 1, rule: "仅限工作时间访问", enabled: true },
  { id: 2, rule: "IP地址白名单限制", enabled: true },
  { id: 3, rule: "单次访问时长限制", enabled: false },
  { id: 4, rule: "并发用户数限制", enabled: true },
]

export function ContractCreation() {
  const { toast } = useToast()
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [contractName, setContractName] = useState("")
  const [contractDescription, setContractDescription] = useState("")
  const [contractType, setContractType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [participantsList, setParticipantsList] = useState(participants)
  const [paymentConditionsList, setPaymentConditionsList] = useState(paymentConditions)
  const [accessRulesList, setAccessRulesList] = useState(accessRules)
  const [maxConcurrentUsers, setMaxConcurrentUsers] = useState("10")
  const [maxAccessDuration, setMaxAccessDuration] = useState("60")
  
  // Dialog states
  const [previewOpen, setPreviewOpen] = useState(false)
  const [participantConfigOpen, setParticipantConfigOpen] = useState(false)
  const [addParticipantOpen, setAddParticipantOpen] = useState(false)
  const [editParticipantId, setEditParticipantId] = useState<number | null>(null)
  const [paymentEditOpen, setPaymentEditOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [editPaymentId, setEditPaymentId] = useState<number | null>(null)
  const [reportOpen, setReportOpen] = useState(false)
  const [changeTemplateOpen, setChangeTemplateOpen] = useState(false)
  const [importClauseOpen, setImportClauseOpen] = useState(false)
  const [complianceCheckOpen, setComplianceCheckOpen] = useState(false)
  
  // Form states for dialogs
  const [newParticipantName, setNewParticipantName] = useState("")
  const [newParticipantRole, setNewParticipantRole] = useState("")
  const [newPaymentName, setNewPaymentName] = useState("")
  const [newPaymentAmount, setNewPaymentAmount] = useState("")
  const [newPaymentTrigger, setNewPaymentTrigger] = useState("")
  const [newPaymentDescription, setNewPaymentDescription] = useState("")
  
  const [validationResults, setValidationResults] = useState({
    completeness: 85,
    legality: 92,
    conflicts: 0,
    suggestions: 2,
  })
  
  // Update validation when form changes
  const updateValidation = () => {
    let completeness = 0
    let total = 0
    
    total += 2
    if (selectedTemplate) completeness += 1
    if (contractName) completeness += 1
    
    total += 1
    if (contractType) completeness += 1
    
    total += 1
    if (contractDescription) completeness += 1
    
    total += 2
    if (startDate) completeness += 1
    if (endDate) completeness += 1
    
    const percentage = Math.round((completeness / total) * 100)
    setValidationResults(prev => ({
      ...prev,
      completeness: percentage
    }))
  }
  
  // Handle template selection
  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template)
    if (!contractName) {
      setContractName(template.name)
    }
    updateValidation()
    toast({
      title: "模板已选择",
      description: `已选择模板：${template.name}`,
    })
  }
  
  // Handle save draft
  const handleSaveDraft = () => {
    const draft = {
      template: selectedTemplate,
      name: contractName,
      description: contractDescription,
      type: contractType,
      startDate,
      endDate,
      participants: participantsList,
      payments: paymentConditionsList,
      rules: accessRulesList,
    }
    localStorage.setItem("contract-draft", JSON.stringify(draft))
    toast({
      title: "草稿已保存",
      description: "合约草稿已成功保存到本地",
    })
  }
  
  // Handle submit for review
  const handleSubmitReview = () => {
    if (!contractName || !contractType || !selectedTemplate) {
      toast({
        title: "信息不完整",
        description: "请填写合约名称、类型并选择模板",
        variant: "destructive",
      })
      return
    }
    
    toast({
      title: "已提交审核",
      description: "合约已成功提交，等待审核中...",
    })
  }
  
  // Handle preview
  const handlePreview = () => {
    setPreviewOpen(true)
  }
  
  // Handle participant config
  const handleParticipantConfig = (id: number) => {
    setEditParticipantId(id)
    const participant = participantsList.find(p => p.id === id)
    if (participant) {
      setNewParticipantName(participant.name)
      setNewParticipantRole(participant.role)
    }
    setParticipantConfigOpen(true)
  }
  
  // Handle remove participant
  const handleRemoveParticipant = (id: number) => {
    setParticipantsList(prev => prev.filter(p => p.id !== id))
    toast({
      title: "参与方已移除",
      description: "参与方已从合约中移除",
    })
  }
  
  // Handle add participant
  const handleAddParticipant = () => {
    if (!newParticipantName || !newParticipantRole) {
      toast({
        title: "信息不完整",
        description: "请填写参与方名称和角色",
        variant: "destructive",
      })
      return
    }
    
    const newId = Math.max(...participantsList.map(p => p.id), 0) + 1
    setParticipantsList(prev => [...prev, {
      id: newId,
      name: newParticipantName,
      role: newParticipantRole,
      required: false,
    }])
    
    setNewParticipantName("")
    setNewParticipantRole("")
    setAddParticipantOpen(false)
    toast({
      title: "参与方已添加",
      description: `已添加参与方：${newParticipantName}`,
    })
  }
  
  // Handle save participant config
  const handleSaveParticipantConfig = () => {
    if (!editParticipantId) return
    
    setParticipantsList(prev => prev.map(p => 
      p.id === editParticipantId 
        ? { ...p, name: newParticipantName, role: newParticipantRole }
        : p
    ))
    
    setParticipantConfigOpen(false)
    setEditParticipantId(null)
    toast({
      title: "配置已保存",
      description: "参与方配置已更新",
    })
  }
  
  // Handle edit payment
  const handleEditPayment = (id: number) => {
    setEditPaymentId(id)
    const payment = paymentConditionsList.find(p => p.id === id)
    if (payment) {
      setNewPaymentName(payment.name)
      setNewPaymentAmount(payment.amount)
      setNewPaymentTrigger(payment.trigger)
      setNewPaymentDescription(payment.description)
    }
    setPaymentEditOpen(true)
  }
  
  // Handle save payment edit
  const handleSavePaymentEdit = () => {
    if (!editPaymentId) return
    
    setPaymentConditionsList(prev => prev.map(p => 
      p.id === editPaymentId 
        ? { 
            ...p, 
            name: newPaymentName,
            amount: newPaymentAmount,
            trigger: newPaymentTrigger,
            description: newPaymentDescription,
          }
        : p
    ))
    
    setPaymentEditOpen(false)
    setEditPaymentId(null)
    toast({
      title: "付款条件已更新",
      description: "付款条件配置已保存",
    })
  }
  
  // Handle add payment
  const handleAddPayment = () => {
    if (!newPaymentName || !newPaymentAmount || !newPaymentTrigger) {
      toast({
        title: "信息不完整",
        description: "请填写付款条件的所有必填项",
        variant: "destructive",
      })
      return
    }
    
    const newId = Math.max(...paymentConditionsList.map(p => p.id), 0) + 1
    setPaymentConditionsList(prev => [...prev, {
      id: newId,
      name: newPaymentName,
      amount: newPaymentAmount,
      trigger: newPaymentTrigger,
      description: newPaymentDescription || "",
    }])
    
    setNewPaymentName("")
    setNewPaymentAmount("")
    setNewPaymentTrigger("")
    setNewPaymentDescription("")
    setAddPaymentOpen(false)
    toast({
      title: "付款条件已添加",
      description: `已添加付款条件：${newPaymentName}`,
    })
  }
  
  // Handle access rule toggle
  const handleToggleRule = (id: number) => {
    setAccessRulesList(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ))
  }
  
  // Handle quick actions
  const handleChangeTemplate = () => {
    setChangeTemplateOpen(true)
  }
  
  const handleImportClause = () => {
    setImportClauseOpen(true)
    toast({
      title: "导入条款",
      description: "请选择要导入的条款文件",
    })
  }
  
  const handleComplianceCheck = () => {
    setComplianceCheckOpen(true)
    // Simulate compliance check
    setTimeout(() => {
      toast({
        title: "合规检查完成",
        description: "合约已通过合规性检查",
      })
      setComplianceCheckOpen(false)
    }, 2000)
  }
  
  // Update validation on form changes
  useEffect(() => {
    updateValidation()
  }, [selectedTemplate, contractName, contractType, contractDescription, startDate, endDate])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">合约创建</h1>
            <p className="text-sm text-muted-foreground mt-1">基于策略模板灵活组合生成数字合约</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="mr-2 h-4 w-4" />
              预览合约
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              保存草稿
            </Button>
            <Button 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={handleSubmitReview}
            >
              <Send className="mr-2 h-4 w-4" />
              发送审核
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">基本信息</TabsTrigger>
                <TabsTrigger value="participants">参与方</TabsTrigger>
                <TabsTrigger value="delivery">交付节点</TabsTrigger>
                <TabsTrigger value="payment">付款条件</TabsTrigger>
                <TabsTrigger value="permissions">权限规则</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookTemplate className="h-5 w-5" />
                      选择模板
                    </CardTitle>
                    <CardDescription>从模板库中选择合适的合约模板作为基础</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {contractTemplates.map((template) => (
                        <Card
                          key={template.id}
                          className={`cursor-pointer transition-all ${
                            selectedTemplate?.id === template.id
                              ? "ring-2 ring-secondary bg-secondary/5"
                              : "hover:shadow-md"
                          }`}
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">{template.industry}</Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {template.scenario}
                                </Badge>
                              </div>
                              <h4 className="font-medium text-sm">{template.name}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      合约基本信息
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contract-name">合约名称</Label>
                        <Input
                          id="contract-name"
                          placeholder="输入合约名称"
                          value={contractName}
                          onChange={(e) => setContractName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contract-type">合约类型</Label>
                        <Select value={contractType} onValueChange={setContractType}>
                          <SelectTrigger>
                            <SelectValue placeholder="选择合约类型" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="data-sharing">数据共享</SelectItem>
                            <SelectItem value="api-service">API服务</SelectItem>
                            <SelectItem value="content-license">内容授权</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contract-description">合约描述</Label>
                      <Textarea
                        id="contract-description"
                        placeholder="详细描述合约的目的和范围"
                        value={contractDescription}
                        onChange={(e) => setContractDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">生效日期</Label>
                        <Input 
                          id="start-date" 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date">到期日期</Label>
                        <Input 
                          id="end-date" 
                          type="date" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="participants" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      合约参与方
                    </CardTitle>
                    <CardDescription>定义合约的各方参与者及其角色</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {participantsList.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{participant.name}</span>
                            {participant.required && <Badge variant="destructive">必需</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">角色: {participant.role}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleParticipantConfig(participant.id)}
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            配置
                          </Button>
                          {!participant.required && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleRemoveParticipant(participant.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              移除
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent"
                      onClick={() => setAddParticipantOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      添加参与方
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="delivery" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Workflow className="h-5 w-5" />
                      交付节点流程
                    </CardTitle>
                    <CardDescription>定义合约执行的关键节点和条件</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deliveryNodes.map((node, index) => (
                      <div key={node.id} className="relative">
                        <div className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{node.name}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{node.duration}</Badge>
                                <Badge variant="secondary">{node.responsible}</Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{node.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {node.conditions.map((condition, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        {index < deliveryNodes.length - 1 && (
                          <div className="absolute left-8 top-16 w-0.5 h-6 bg-border"></div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      付款条件
                    </CardTitle>
                    <CardDescription>设置合约的付款节点和条件</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {paymentConditionsList.map((condition) => (
                      <div key={condition.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{condition.name}</span>
                            <Badge variant="secondary">{condition.amount}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">触发条件: {condition.trigger}</p>
                          <p className="text-xs text-muted-foreground">{condition.description}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditPayment(condition.id)}
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          编辑
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent"
                      onClick={() => setAddPaymentOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      添加付款条件
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      权限规则配置
                    </CardTitle>
                    <CardDescription>设置数据访问和使用的权限控制规则</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {accessRulesList.map((rule) => (
                      <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <span className="font-medium">{rule.rule}</span>
                        </div>
                        <Switch 
                          checked={rule.enabled} 
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">高级权限设置</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>最大并发用户数</Label>
                          <Input 
                            type="number" 
                            placeholder="10" 
                            value={maxConcurrentUsers}
                            onChange={(e) => setMaxConcurrentUsers(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>单次访问时长(分钟)</Label>
                          <Input 
                            type="number" 
                            placeholder="60" 
                            value={maxAccessDuration}
                            onChange={(e) => setMaxAccessDuration(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Validation Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Settings className="h-4 w-4" />
                  合约校验
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">完整性检查</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{validationResults.completeness}%</span>
                      {validationResults.completeness >= 90 ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">合法性检查</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{validationResults.legality}%</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">冲突检测</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{validationResults.conflicts} 个</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">优化建议</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{validationResults.suggestions} 条</span>
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent" 
                  size="sm"
                  onClick={() => setReportOpen(true)}
                >
                  查看详细报告
                </Button>
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
                  onClick={handleChangeTemplate}
                >
                  <BookTemplate className="mr-2 h-4 w-4" />
                  更换模板
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm"
                  onClick={handleImportClause}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  导入条款
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm"
                  onClick={handleComplianceCheck}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  合规检查
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>合约预览</DialogTitle>
            <DialogDescription>预览合约的完整信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">基本信息</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">合约名称：</span>{contractName || "未填写"}</p>
                <p><span className="font-medium">合约类型：</span>{contractType || "未选择"}</p>
                <p><span className="font-medium">模板：</span>{selectedTemplate?.name || "未选择"}</p>
                <p><span className="font-medium">描述：</span>{contractDescription || "未填写"}</p>
                <p><span className="font-medium">生效日期：</span>{startDate || "未设置"}</p>
                <p><span className="font-medium">到期日期：</span>{endDate || "未设置"}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">参与方 ({participantsList.length})</h3>
              <div className="space-y-1 text-sm">
                {participantsList.map(p => (
                  <p key={p.id}>• {p.name} ({p.role})</p>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">付款条件 ({paymentConditionsList.length})</h3>
              <div className="space-y-1 text-sm">
                {paymentConditionsList.map(p => (
                  <p key={p.id}>• {p.name}: {p.amount} - {p.trigger}</p>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>关闭</Button>
            <Button onClick={handleSubmitReview}>提交审核</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Participant Config Dialog */}
      <Dialog open={participantConfigOpen} onOpenChange={setParticipantConfigOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>配置参与方</DialogTitle>
            <DialogDescription>编辑参与方的信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>参与方名称</Label>
              <Input 
                value={newParticipantName}
                onChange={(e) => setNewParticipantName(e.target.value)}
                placeholder="输入参与方名称"
              />
            </div>
            <div className="space-y-2">
              <Label>角色</Label>
              <Select value={newParticipantRole} onValueChange={setNewParticipantRole}>
                <SelectTrigger>
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="provider">数据提供方</SelectItem>
                  <SelectItem value="consumer">数据使用方</SelectItem>
                  <SelectItem value="regulator">监管机构</SelectItem>
                  <SelectItem value="auditor">审计方</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setParticipantConfigOpen(false)}>取消</Button>
            <Button onClick={handleSaveParticipantConfig}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Participant Dialog */}
      <Dialog open={addParticipantOpen} onOpenChange={setAddParticipantOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加参与方</DialogTitle>
            <DialogDescription>添加新的合约参与方</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>参与方名称</Label>
              <Input 
                value={newParticipantName}
                onChange={(e) => setNewParticipantName(e.target.value)}
                placeholder="输入参与方名称"
              />
            </div>
            <div className="space-y-2">
              <Label>角色</Label>
              <Select value={newParticipantRole} onValueChange={setNewParticipantRole}>
                <SelectTrigger>
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="provider">数据提供方</SelectItem>
                  <SelectItem value="consumer">数据使用方</SelectItem>
                  <SelectItem value="regulator">监管机构</SelectItem>
                  <SelectItem value="auditor">审计方</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setAddParticipantOpen(false)
              setNewParticipantName("")
              setNewParticipantRole("")
            }}>取消</Button>
            <Button onClick={handleAddParticipant}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Dialog */}
      <Dialog open={paymentEditOpen} onOpenChange={setPaymentEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑付款条件</DialogTitle>
            <DialogDescription>修改付款条件的详细信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>付款名称</Label>
              <Input 
                value={newPaymentName}
                onChange={(e) => setNewPaymentName(e.target.value)}
                placeholder="例如：预付款"
              />
            </div>
            <div className="space-y-2">
              <Label>付款金额/比例</Label>
              <Input 
                value={newPaymentAmount}
                onChange={(e) => setNewPaymentAmount(e.target.value)}
                placeholder="例如：30%"
              />
            </div>
            <div className="space-y-2">
              <Label>触发条件</Label>
              <Input 
                value={newPaymentTrigger}
                onChange={(e) => setNewPaymentTrigger(e.target.value)}
                placeholder="例如：合约签署后"
              />
            </div>
            <div className="space-y-2">
              <Label>描述</Label>
              <Textarea 
                value={newPaymentDescription}
                onChange={(e) => setNewPaymentDescription(e.target.value)}
                placeholder="详细描述付款条件"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentEditOpen(false)}>取消</Button>
            <Button onClick={handleSavePaymentEdit}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog open={addPaymentOpen} onOpenChange={setAddPaymentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加付款条件</DialogTitle>
            <DialogDescription>添加新的付款条件</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>付款名称</Label>
              <Input 
                value={newPaymentName}
                onChange={(e) => setNewPaymentName(e.target.value)}
                placeholder="例如：预付款"
              />
            </div>
            <div className="space-y-2">
              <Label>付款金额/比例</Label>
              <Input 
                value={newPaymentAmount}
                onChange={(e) => setNewPaymentAmount(e.target.value)}
                placeholder="例如：30%"
              />
            </div>
            <div className="space-y-2">
              <Label>触发条件</Label>
              <Input 
                value={newPaymentTrigger}
                onChange={(e) => setNewPaymentTrigger(e.target.value)}
                placeholder="例如：合约签署后"
              />
            </div>
            <div className="space-y-2">
              <Label>描述</Label>
              <Textarea 
                value={newPaymentDescription}
                onChange={(e) => setNewPaymentDescription(e.target.value)}
                placeholder="详细描述付款条件"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setAddPaymentOpen(false)
              setNewPaymentName("")
              setNewPaymentAmount("")
              setNewPaymentTrigger("")
              setNewPaymentDescription("")
            }}>取消</Button>
            <Button onClick={handleAddPayment}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Validation Report Dialog */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>合约校验详细报告</DialogTitle>
            <DialogDescription>查看合约的完整校验结果和优化建议</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">完整性检查</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{validationResults.completeness}%</span>
                  {validationResults.completeness >= 90 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {validationResults.completeness >= 90 
                  ? "合约信息完整，所有必填项已填写" 
                  : "部分必填项未填写，请完善合约信息"}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">合法性检查</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{validationResults.legality}%</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">合约条款符合法律法规要求</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">冲突检测</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{validationResults.conflicts} 个</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">未发现条款冲突</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">优化建议</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{validationResults.suggestions} 条</span>
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p>• 建议添加更详细的交付节点说明</p>
                <p>• 建议完善权限规则的配置参数</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setReportOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Template Dialog */}
      <Dialog open={changeTemplateOpen} onOpenChange={setChangeTemplateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>更换模板</DialogTitle>
            <DialogDescription>选择新的合约模板，当前填写的信息将被保留</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
            {contractTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate?.id === template.id
                    ? "ring-2 ring-secondary bg-secondary/5"
                    : "hover:shadow-md"
                }`}
                onClick={() => {
                  handleTemplateSelect(template)
                  setChangeTemplateOpen(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.industry}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {template.scenario}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangeTemplateOpen(false)}>取消</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Clause Dialog */}
      <Dialog open={importClauseOpen} onOpenChange={setImportClauseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>导入条款</DialogTitle>
            <DialogDescription>从文件或模板库中导入合约条款</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">拖拽文件到此处或点击上传</p>
              <Button variant="outline" size="sm">
                选择文件
              </Button>
            </div>
            <div className="space-y-2">
              <Label>或从模板库选择</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择条款模板" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">标准条款</SelectItem>
                  <SelectItem value="custom">自定义条款</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportClauseOpen(false)}>取消</Button>
            <Button onClick={() => {
              setImportClauseOpen(false)
              toast({
                title: "条款已导入",
                description: "条款已成功导入到合约中",
              })
            }}>导入</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compliance Check Dialog */}
      <Dialog open={complianceCheckOpen} onOpenChange={setComplianceCheckOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>合规检查</DialogTitle>
            <DialogDescription>正在检查合约的合规性...</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              <p className="text-sm text-muted-foreground">正在分析合约条款...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
