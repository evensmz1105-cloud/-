"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Shield,
  DollarSign,
  Lock,
  AlertTriangle,
  FileCheck,
  Settings,
  MapPin,
  Database,
  Zap,
  XCircle,
  Calendar,
  User,
  Globe,
  Key,
  Activity,
  BarChart3,
  X,
  Download,
} from "lucide-react"

const policies = [
  {
    id: 1,
    name: "数据访问控制策略",
    description: "规定用户对敏感数据的访问权限和使用限制",
    status: "active",
    type: "访问控制",
    lastModified: "2025-03-15",
    conflicts: 0,
    complianceScore: 98,
    rules: ["用户身份验证", "角色权限控制", "数据分级访问"],
  },
  {
    id: 2,
    name: "计费规则策略",
    description: "定义基于使用量的计费标准和计算方式",
    status: "pending",
    type: "计量计费",
    lastModified: "2025-03-14",
    conflicts: 1,
    complianceScore: 85,
    rules: ["按量计费", "阶梯定价", "超额收费"],
  },
  {
    id: 3,
    name: "合规审核策略",
    description: "确保所有合约条款符合相关法律法规要求",
    status: "active",
    type: "合规要求",
    lastModified: "2025-03-13",
    conflicts: 0,
    complianceScore: 100,
    rules: ["GDPR合规", "数据本地化", "审计日志"],
    complianceDetails: {
      auditHistory: [
        {
          date: "2025-03-13",
          auditor: "系统自动审核",
          result: "通过",
          score: 100,
          issues: [],
          recommendations: ["继续保持当前合规标准"],
        },
        {
          date: "2025-03-10",
          auditor: "张法务",
          result: "通过",
          score: 98,
          issues: ["数据保留期设置建议优化"],
          recommendations: ["建议将数据保留期从365天调整为180天"],
        },
        {
          date: "2025-03-05",
          auditor: "李合规专员",
          result: "通过",
          score: 95,
          issues: ["加密算法版本需要更新"],
          recommendations: ["升级到AES-256加密标准"],
        },
      ],
      complianceChecks: [
        { name: "GDPR合规性", status: "通过", score: 100, details: "完全符合欧盟数据保护法规要求" },
        { name: "数据本地化", status: "通过", score: 100, details: "数据存储在指定的中国大陆地区" },
        { name: "审计日志", status: "通过", score: 100, details: "完整记录所有数据访问和操作日志" },
        { name: "数据加密", status: "通过", score: 98, details: "使用AES-256加密，建议定期更新密钥" },
        { name: "访问控制", status: "通过", score: 100, details: "实施严格的基于角色的访问控制" },
        { name: "数据备份", status: "通过", score: 95, details: "定期备份，建议增加异地备份" },
      ],
      riskAssessment: {
        overallRisk: "低",
        riskFactors: [
          { category: "数据泄露风险", level: "低", score: 15, mitigation: "强加密和访问控制" },
          { category: "合规违规风险", level: "极低", score: 5, mitigation: "定期合规审核和更新" },
          { category: "系统可用性风险", level: "低", score: 20, mitigation: "多重备份和容灾机制" },
          { category: "第三方依赖风险", level: "中", score: 35, mitigation: "供应商合规认证和监控" },
        ],
      },
      regulatoryFrameworks: [
        { name: "GDPR", compliance: "完全合规", lastCheck: "2025-03-13", nextReview: "2025-06-13" },
        { name: "网络安全法", compliance: "完全合规", lastCheck: "2025-03-10", nextReview: "2025-06-10" },
        { name: "数据安全法", compliance: "完全合规", lastCheck: "2025-03-08", nextReview: "2025-06-08" },
        { name: "个人信息保护法", compliance: "完全合规", lastCheck: "2025-03-05", nextReview: "2025-06-05" },
      ],
      technicalControls: [
        { control: "数据加密", implementation: "AES-256", status: "已实施", effectiveness: "高" },
        { control: "访问日志", implementation: "实时记录", status: "已实施", effectiveness: "高" },
        { control: "身份认证", implementation: "多因子认证", status: "已实施", effectiveness: "高" },
        { control: "数据备份", implementation: "每日备份", status: "已实施", effectiveness: "中" },
        { control: "入侵检测", implementation: "AI驱动", status: "已实施", effectiveness: "高" },
      ],
    },
  },
  {
    id: 4,
    name: "使用限制策略",
    description: "设定服务使用的时间、频率和范围限制",
    status: "draft",
    type: "使用限制",
    lastModified: "2025-03-12",
    conflicts: 2,
    complianceScore: 75,
    rules: ["时间窗口限制", "频率控制", "地域限制"],
  },
]

const stats = [
  { name: "活跃策略", value: "12", change: "+2", icon: CheckCircle, color: "text-green-600" },
  { name: "待审核策略", value: "3", change: "+1", icon: Clock, color: "text-yellow-600" },
  { name: "冲突检测", value: "1", change: "-2", icon: AlertCircle, color: "text-red-600" },
  { name: "合规率", value: "98.5%", change: "+0.5%", icon: FileCheck, color: "text-green-600" },
]

const policyTypes = [
  { value: "access", label: "访问控制", icon: Lock },
  { value: "billing", label: "计量计费", icon: DollarSign },
  { value: "compliance", label: "合规要求", icon: FileCheck },
  { value: "usage", label: "使用限制", icon: Shield },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">活跃</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">待审核</Badge>
    case "draft":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">草稿</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getComplianceColor(score: number) {
  if (score >= 95) return "text-green-600"
  if (score >= 80) return "text-yellow-600"
  return "text-red-600"
}

export function PolicyDashboard() {
  const { toast } = useToast()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isComplianceDetailsOpen, setIsComplianceDetailsOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [selectedCompliancePolicy, setSelectedCompliancePolicy] = useState<any>(null)
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null)
  const [policyToDelete, setPolicyToDelete] = useState<any>(null)
  const [policiesList, setPoliciesList] = useState(policies)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const [policyForm, setPolicyForm] = useState({
    // Basic Information
    name: "",
    type: "",
    description: "",
    priority: "medium",
    effectiveDate: "",
    expiryDate: "",

    // Access Control
    authRequired: true,
    roleBasedAccess: true,
    allowedRoles: [],
    ipWhitelist: "",
    timeRestrictions: false,
    allowedHours: [9, 17],

    // Usage Limitations
    maxRequests: 1000,
    rateLimitEnabled: true,
    rateLimitWindow: "hour",
    dataVolumeLimit: 100,
    concurrentUsers: 50,
    geographicRestrictions: false,
    allowedRegions: [],

    // Billing Rules
    billingEnabled: false,
    billingModel: "usage",
    basePrice: 0,
    unitPrice: 0.01,
    freeQuota: 100,
    tieredPricing: false,

    // Compliance Requirements
    gdprCompliant: true,
    dataLocalization: false,
    auditLogging: true,
    encryptionRequired: true,
    retentionPeriod: 365,

    // Technical Rules
    apiEndpoints: [],
    dataFormats: [],
    securityLevel: "high",
    cacheEnabled: true,
    cacheTtl: 3600,
  })

  const filteredPolicies = policiesList.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || policy.type === filterType
    return matchesSearch && matchesFilter
  })

  const updateFormField = (field: string, value: any) => {
    setPolicyForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCompliancePolicyClick = (policy: any) => {
    if (policy.name === "合规审核策略") {
      setSelectedCompliancePolicy(policy)
      setIsComplianceDetailsOpen(true)
    } else {
      setSelectedPolicy(policy)
      setIsEditDialogOpen(true)
    }
  }
  
  const handleEditPolicy = (policy: any) => {
    setSelectedPolicy(policy)
    // 填充表单数据
    setPolicyForm({
      name: policy.name,
      type: policy.type,
      description: policy.description,
      priority: "medium",
      effectiveDate: "",
      expiryDate: "",
      authRequired: true,
      roleBasedAccess: true,
      allowedRoles: [],
      ipWhitelist: "",
      timeRestrictions: false,
      allowedHours: [9, 17],
      maxRequests: 1000,
      rateLimitEnabled: true,
      rateLimitWindow: "hour",
      dataVolumeLimit: 100,
      concurrentUsers: 50,
      geographicRestrictions: false,
      allowedRegions: [],
      billingEnabled: false,
      billingModel: "usage",
      basePrice: 0,
      unitPrice: 0.01,
      freeQuota: 100,
      tieredPricing: false,
      gdprCompliant: true,
      dataLocalization: false,
      auditLogging: true,
      encryptionRequired: true,
      retentionPeriod: 365,
      apiEndpoints: [],
      dataFormats: [],
      securityLevel: "high",
      cacheEnabled: true,
      cacheTtl: 3600,
    })
    setIsEditDialogOpen(true)
  }
  
  const handleDeletePolicy = (policy: any) => {
    setPolicyToDelete(policy)
    setIsDeleteDialogOpen(true)
  }
  
  const confirmDeletePolicy = () => {
    if (policyToDelete) {
      setPoliciesList(prev => prev.filter(p => p.id !== policyToDelete.id))
      setIsDeleteDialogOpen(false)
      setPolicyToDelete(null)
      toast({
        title: "策略已删除",
        description: `策略"${policyToDelete.name}"已成功删除`,
      })
    }
  }
  
  const handleSaveDraft = () => {
    const draft = {
      ...policyForm,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem("policy-draft", JSON.stringify(draft))
    toast({
      title: "草稿已保存",
      description: "策略草稿已成功保存到本地",
    })
  }
  
  const handleCreatePolicy = () => {
    if (!policyForm.name || !policyForm.type || !policyForm.description) {
      toast({
        title: "信息不完整",
        description: "请填写策略名称、类型和描述",
        variant: "destructive",
      })
      return
    }
    
    const newPolicy = {
      id: Math.max(...policiesList.map(p => p.id), 0) + 1,
      name: policyForm.name,
      description: policyForm.description,
      status: "draft",
      type: policyForm.type,
      lastModified: new Date().toISOString().split('T')[0],
      conflicts: 0,
      complianceScore: 85,
      rules: policyForm.allowedRoles.length > 0 ? policyForm.allowedRoles : ["默认规则"],
    }
    
    setPoliciesList(prev => [...prev, newPolicy])
    setIsCreateDialogOpen(false)
    
    // 重置表单
    setPolicyForm({
      name: "",
      type: "",
      description: "",
      priority: "medium",
      effectiveDate: "",
      expiryDate: "",
      authRequired: true,
      roleBasedAccess: true,
      allowedRoles: [],
      ipWhitelist: "",
      timeRestrictions: false,
      allowedHours: [9, 17],
      maxRequests: 1000,
      rateLimitEnabled: true,
      rateLimitWindow: "hour",
      dataVolumeLimit: 100,
      concurrentUsers: 50,
      geographicRestrictions: false,
      allowedRegions: [],
      billingEnabled: false,
      billingModel: "usage",
      basePrice: 0,
      unitPrice: 0.01,
      freeQuota: 100,
      tieredPricing: false,
      gdprCompliant: true,
      dataLocalization: false,
      auditLogging: true,
      encryptionRequired: true,
      retentionPeriod: 365,
      apiEndpoints: [],
      dataFormats: [],
      securityLevel: "high",
      cacheEnabled: true,
      cacheTtl: 3600,
    })
    
    toast({
      title: "策略已创建",
      description: `策略"${newPolicy.name}"已成功创建`,
    })
  }
  
  const handleUpdatePolicy = () => {
    if (!selectedPolicy) return
    
    if (!policyForm.name || !policyForm.type || !policyForm.description) {
      toast({
        title: "信息不完整",
        description: "请填写策略名称、类型和描述",
        variant: "destructive",
      })
      return
    }
    
    setPoliciesList(prev => prev.map(p => 
      p.id === selectedPolicy.id 
        ? {
            ...p,
            name: policyForm.name,
            description: policyForm.description,
            type: policyForm.type,
            lastModified: new Date().toISOString().split('T')[0],
          }
        : p
    ))
    
    setIsEditDialogOpen(false)
    setSelectedPolicy(null)
    
    toast({
      title: "策略已更新",
      description: `策略"${policyForm.name}"已成功更新`,
    })
  }
  
  const handleAddApiEndpoint = () => {
    const endpoint = prompt("请输入API端点（例如：/api/v1/data）")
    if (endpoint) {
      setPolicyForm(prev => ({
        ...prev,
        apiEndpoints: [...prev.apiEndpoints, endpoint],
      }))
      toast({
        title: "API端点已添加",
        description: `已添加端点：${endpoint}`,
      })
    }
  }
  
  const handleRemoveApiEndpoint = (index: number) => {
    setPolicyForm(prev => ({
      ...prev,
      apiEndpoints: prev.apiEndpoints.filter((_, i) => i !== index),
    }))
    toast({
      title: "API端点已移除",
      description: "端点已从列表中移除",
    })
  }
  
  const handleAddDataFormat = () => {
    const format = prompt("请输入数据格式（例如：JSON, XML）")
    if (format) {
      setPolicyForm(prev => ({
        ...prev,
        dataFormats: [...prev.dataFormats, format],
      }))
      toast({
        title: "数据格式已添加",
        description: `已添加格式：${format}`,
      })
    }
  }
  
  const handleRemoveDataFormat = (index: number) => {
    setPolicyForm(prev => ({
      ...prev,
      dataFormats: prev.dataFormats.filter((_, i) => i !== index),
    }))
    toast({
      title: "数据格式已移除",
      description: "格式已从列表中移除",
    })
  }
  
  const handleExportComplianceReport = () => {
    toast({
      title: "报告导出中",
      description: "合规审核报告正在生成，请稍候...",
    })
    // 模拟导出
    setTimeout(() => {
      toast({
        title: "报告已导出",
        description: "合规审核报告已成功导出为PDF文件",
      })
    }, 1500)
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "极低":
        return "text-green-600 bg-green-50"
      case "低":
        return "text-green-600 bg-green-50"
      case "中":
        return "text-yellow-600 bg-yellow-50"
      case "高":
        return "text-red-600 bg-red-50"
      case "极高":
        return "text-red-700 bg-red-100"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">策略管理</h1>
            <p className="text-sm text-muted-foreground mt-1">管理合约策略，确保合规性和一致性</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Plus className="mr-2 h-4 w-4" />
                创建策略
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>创建新策略</DialogTitle>
                <DialogDescription>将合同法律条款或业务需求转化为技术规则</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">基本信息</TabsTrigger>
                  <TabsTrigger value="access">访问控制</TabsTrigger>
                  <TabsTrigger value="usage">使用限制</TabsTrigger>
                  <TabsTrigger value="billing">计费规则</TabsTrigger>
                  <TabsTrigger value="compliance">合规检查</TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">策略名称 *</Label>
                      <Input
                        id="name"
                        placeholder="输入策略名称"
                        value={policyForm.name}
                        onChange={(e) => updateFormField("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">策略类型 *</Label>
                      <Select value={policyForm.type} onValueChange={(value) => updateFormField("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择策略类型" />
                        </SelectTrigger>
                        <SelectContent>
                          {policyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                <type.icon className="h-4 w-4" />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">策略描述 *</Label>
                    <Textarea
                      id="description"
                      placeholder="详细描述策略的用途和适用场景"
                      value={policyForm.description}
                      onChange={(e) => updateFormField("description", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">优先级</Label>
                      <Select value={policyForm.priority} onValueChange={(value) => updateFormField("priority", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">低</SelectItem>
                          <SelectItem value="medium">中</SelectItem>
                          <SelectItem value="high">高</SelectItem>
                          <SelectItem value="critical">紧急</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="effectiveDate">生效日期</Label>
                      <Input
                        id="effectiveDate"
                        type="date"
                        value={policyForm.effectiveDate}
                        onChange={(e) => updateFormField("effectiveDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">到期日期</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={policyForm.expiryDate}
                        onChange={(e) => updateFormField("expiryDate", e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Access Control Tab */}
                <TabsContent value="access" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lock className="h-5 w-5" />
                        <span>身份验证与授权</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="authRequired">要求身份验证</Label>
                          <p className="text-sm text-muted-foreground">用户必须通过身份验证才能访问</p>
                        </div>
                        <Switch
                          id="authRequired"
                          checked={policyForm.authRequired}
                          onCheckedChange={(checked) => updateFormField("authRequired", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="roleBasedAccess">基于角色的访问控制</Label>
                          <p className="text-sm text-muted-foreground">根据用户角色限制访问权限</p>
                        </div>
                        <Switch
                          id="roleBasedAccess"
                          checked={policyForm.roleBasedAccess}
                          onCheckedChange={(checked) => updateFormField("roleBasedAccess", checked)}
                        />
                      </div>

                      {policyForm.roleBasedAccess && (
                        <div className="space-y-2">
                          <Label>允许的角色</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {["管理员", "数据分析师", "业务用户", "外部合作伙伴"].map((role) => (
                              <div key={role} className="flex items-center space-x-2">
                                <Checkbox id={role} />
                                <Label htmlFor={role} className="text-sm">
                                  {role}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />
                        <span>网络与地理限制</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ipWhitelist">IP白名单</Label>
                        <Textarea
                          id="ipWhitelist"
                          placeholder="输入允许的IP地址或CIDR范围，每行一个"
                          value={policyForm.ipWhitelist}
                          onChange={(e) => updateFormField("ipWhitelist", e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="timeRestrictions">时间访问限制</Label>
                          <p className="text-sm text-muted-foreground">限制访问的时间窗口</p>
                        </div>
                        <Switch
                          id="timeRestrictions"
                          checked={policyForm.timeRestrictions}
                          onCheckedChange={(checked) => updateFormField("timeRestrictions", checked)}
                        />
                      </div>

                      {policyForm.timeRestrictions && (
                        <div className="space-y-2">
                          <Label>允许访问时间 (24小时制)</Label>
                          <div className="px-3">
                            <Slider
                              value={policyForm.allowedHours}
                              onValueChange={(value) => updateFormField("allowedHours", value)}
                              max={24}
                              min={0}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground mt-1">
                              <span>{policyForm.allowedHours[0]}:00</span>
                              <span>{policyForm.allowedHours[1]}:00</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Usage Limitations Tab */}
                <TabsContent value="usage" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>请求频率限制</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="rateLimitEnabled">启用频率限制</Label>
                          <p className="text-sm text-muted-foreground">限制单位时间内的请求次数</p>
                        </div>
                        <Switch
                          id="rateLimitEnabled"
                          checked={policyForm.rateLimitEnabled}
                          onCheckedChange={(checked) => updateFormField("rateLimitEnabled", checked)}
                        />
                      </div>

                      {policyForm.rateLimitEnabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="maxRequests">最大请求数</Label>
                            <Input
                              id="maxRequests"
                              type="number"
                              value={policyForm.maxRequests}
                              onChange={(e) => updateFormField("maxRequests", Number.parseInt(e.target.value))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rateLimitWindow">时间窗口</Label>
                            <Select
                              value={policyForm.rateLimitWindow}
                              onValueChange={(value) => updateFormField("rateLimitWindow", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="minute">每分钟</SelectItem>
                                <SelectItem value="hour">每小时</SelectItem>
                                <SelectItem value="day">每天</SelectItem>
                                <SelectItem value="month">每月</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Database className="h-5 w-5" />
                        <span>数据量限制</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dataVolumeLimit">数据量限制 (GB)</Label>
                          <Input
                            id="dataVolumeLimit"
                            type="number"
                            value={policyForm.dataVolumeLimit}
                            onChange={(e) => updateFormField("dataVolumeLimit", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="concurrentUsers">并发用户数</Label>
                          <Input
                            id="concurrentUsers"
                            type="number"
                            value={policyForm.concurrentUsers}
                            onChange={(e) => updateFormField("concurrentUsers", Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="geographicRestrictions">地理位置限制</Label>
                          <p className="text-sm text-muted-foreground">限制特定地区的访问</p>
                        </div>
                        <Switch
                          id="geographicRestrictions"
                          checked={policyForm.geographicRestrictions}
                          onCheckedChange={(checked) => updateFormField("geographicRestrictions", checked)}
                        />
                      </div>

                      {policyForm.geographicRestrictions && (
                        <div className="space-y-2">
                          <Label>允许的地区</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {["中国大陆", "香港", "台湾", "美国", "欧盟", "日本", "韩国", "新加坡", "澳大利亚"].map(
                              (region) => (
                                <div key={region} className="flex items-center space-x-2">
                                  <Checkbox id={region} />
                                  <Label htmlFor={region} className="text-sm">
                                    {region}
                                  </Label>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Billing Rules Tab */}
                <TabsContent value="billing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5" />
                        <span>计费配置</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="billingEnabled">启用计费</Label>
                          <p className="text-sm text-muted-foreground">对数据使用进行计费</p>
                        </div>
                        <Switch
                          id="billingEnabled"
                          checked={policyForm.billingEnabled}
                          onCheckedChange={(checked) => updateFormField("billingEnabled", checked)}
                        />
                      </div>

                      {policyForm.billingEnabled && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="billingModel">计费模式</Label>
                            <Select
                              value={policyForm.billingModel}
                              onValueChange={(value) => updateFormField("billingModel", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="usage">按使用量计费</SelectItem>
                                <SelectItem value="subscription">订阅制</SelectItem>
                                <SelectItem value="tiered">阶梯定价</SelectItem>
                                <SelectItem value="hybrid">混合模式</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="basePrice">基础价格 (¥)</Label>
                              <Input
                                id="basePrice"
                                type="number"
                                step="0.01"
                                value={policyForm.basePrice}
                                onChange={(e) => updateFormField("basePrice", Number.parseFloat(e.target.value))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="unitPrice">单位价格 (¥/GB)</Label>
                              <Input
                                id="unitPrice"
                                type="number"
                                step="0.001"
                                value={policyForm.unitPrice}
                                onChange={(e) => updateFormField("unitPrice", Number.parseFloat(e.target.value))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="freeQuota">免费额度 (GB)</Label>
                              <Input
                                id="freeQuota"
                                type="number"
                                value={policyForm.freeQuota}
                                onChange={(e) => updateFormField("freeQuota", Number.parseInt(e.target.value))}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="tieredPricing">阶梯定价</Label>
                              <p className="text-sm text-muted-foreground">根据使用量设置不同价格</p>
                            </div>
                            <Switch
                              id="tieredPricing"
                              checked={policyForm.tieredPricing}
                              onCheckedChange={(checked) => updateFormField("tieredPricing", checked)}
                            />
                          </div>

                          {policyForm.tieredPricing && (
                            <div className="space-y-2">
                              <Label>价格阶梯</Label>
                              <div className="space-y-2">
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                  <span className="font-medium">使用量范围</span>
                                  <span className="font-medium">单价 (¥/GB)</span>
                                  <span className="font-medium">操作</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <Input placeholder="0-100 GB" />
                                  <Input placeholder="0.01" />
                                  <Button variant="outline" size="sm">
                                    删除
                                  </Button>
                                </div>
                                <Button variant="outline" size="sm" className="w-full bg-transparent">
                                  <Plus className="mr-2 h-4 w-4" />
                                  添加价格阶梯
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Compliance Tab */}
                <TabsContent value="compliance" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileCheck className="h-5 w-5" />
                        <span>合规要求</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="gdprCompliant">GDPR合规</Label>
                            <p className="text-sm text-muted-foreground">符合欧盟数据保护法规</p>
                          </div>
                          <Switch
                            id="gdprCompliant"
                            checked={policyForm.gdprCompliant}
                            onCheckedChange={(checked) => updateFormField("gdprCompliant", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="dataLocalization">数据本地化</Label>
                            <p className="text-sm text-muted-foreground">数据存储在指定地区</p>
                          </div>
                          <Switch
                            id="dataLocalization"
                            checked={policyForm.dataLocalization}
                            onCheckedChange={(checked) => updateFormField("dataLocalization", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="auditLogging">审计日志</Label>
                            <p className="text-sm text-muted-foreground">记录所有访问和操作</p>
                          </div>
                          <Switch
                            id="auditLogging"
                            checked={policyForm.auditLogging}
                            onCheckedChange={(checked) => updateFormField("auditLogging", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="encryptionRequired">数据加密</Label>
                            <p className="text-sm text-muted-foreground">传输和存储加密</p>
                          </div>
                          <Switch
                            id="encryptionRequired"
                            checked={policyForm.encryptionRequired}
                            onCheckedChange={(checked) => updateFormField("encryptionRequired", checked)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="retentionPeriod">数据保留期 (天)</Label>
                          <Input
                            id="retentionPeriod"
                            type="number"
                            value={policyForm.retentionPeriod}
                            onChange={(e) => updateFormField("retentionPeriod", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="securityLevel">安全等级</Label>
                          <Select
                            value={policyForm.securityLevel}
                            onValueChange={(value) => updateFormField("securityLevel", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">低</SelectItem>
                              <SelectItem value="medium">中</SelectItem>
                              <SelectItem value="high">高</SelectItem>
                              <SelectItem value="critical">关键</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>技术配置</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="cacheEnabled">启用缓存</Label>
                          <p className="text-sm text-muted-foreground">提高响应速度</p>
                        </div>
                        <Switch
                          id="cacheEnabled"
                          checked={policyForm.cacheEnabled}
                          onCheckedChange={(checked) => updateFormField("cacheEnabled", checked)}
                        />
                      </div>

                      {policyForm.cacheEnabled && (
                        <div className="space-y-2">
                          <Label htmlFor="cacheTtl">缓存过期时间 (秒)</Label>
                          <Input
                            id="cacheTtl"
                            type="number"
                            value={policyForm.cacheTtl}
                            onChange={(e) => updateFormField("cacheTtl", Number.parseInt(e.target.value))}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>支持的数据格式</Label>
                        <div className="space-y-2">
                          {policyForm.dataFormats.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {policyForm.dataFormats.map((format, index) => (
                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                {format}
                                  <button
                                    onClick={() => handleRemoveDataFormat(index)}
                                    className="ml-1 hover:bg-secondary/80 rounded-full p-0.5"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full bg-transparent"
                            onClick={handleAddDataFormat}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            添加数据格式
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>API端点配置</Label>
                        <div className="space-y-2">
                          {policyForm.apiEndpoints.length > 0 && (
                            <div className="space-y-2">
                              {policyForm.apiEndpoints.map((endpoint, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                                  <span className="flex-1 text-sm">{endpoint}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleRemoveApiEndpoint(index)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <X className="h-4 w-4" />
                            </Button>
                          </div>
                              ))}
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full bg-transparent"
                            onClick={handleAddApiEndpoint}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            添加API端点
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>合规性验证结果</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">GDPR合规性检查通过</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">数据本地化要求满足</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">安全加密配置正确</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="text-sm">建议设置更短的数据保留期</span>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium">冲突检测结果</p>
                        <p className="text-sm text-muted-foreground mt-1">未发现与现有策略的冲突</p>
                        <p className="text-sm text-green-600 mt-1">✓ 策略配置完整且合规</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </Button>
                <Button variant="outline" onClick={handleSaveDraft}>保存草稿</Button>
                <Button onClick={handleCreatePolicy}>创建策略</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                        <span className={stat.color}>{stat.change}</span> 较上周
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

      {/* Search and Filter */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索策略名称或描述..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="筛选类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="访问控制">访问控制</SelectItem>
              <SelectItem value="计量计费">计量计费</SelectItem>
              <SelectItem value="合规要求">合规要求</SelectItem>
              <SelectItem value="使用限制">使用限制</SelectItem>
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
      </div>

      {/* Policy List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{policy.name}</CardTitle>
                    <CardDescription className="text-sm">{policy.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(policy.status)}
                    {policy.conflicts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {policy.conflicts} 冲突
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <span>类型: {policy.type}</span>
                      <span>最后修改: {policy.lastModified}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">合规评分:</span>
                      <span className={`text-sm font-medium ${getComplianceColor(policy.complianceScore)}`}>
                        {policy.complianceScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {policy.rules.slice(0, 3).map((rule, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {rule}
                        </Badge>
                      ))}
                      {policy.rules.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{policy.rules.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCompliancePolicyClick(policy)}
                        title="查看详情"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditPolicy(policy)}
                        title="编辑策略"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeletePolicy(policy)}
                        title="删除策略"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Compliance Details Dialog */}
      <Dialog open={isComplianceDetailsOpen} onOpenChange={setIsComplianceDetailsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileCheck className="h-6 w-6 text-green-600" />
              <span>合规审核策略详情</span>
            </DialogTitle>
            <DialogDescription>查看详细的合规审核信息、风险评估和技术控制措施</DialogDescription>
          </DialogHeader>

          {selectedCompliancePolicy && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="audit">审核历史</TabsTrigger>
                <TabsTrigger value="compliance">合规检查</TabsTrigger>
                <TabsTrigger value="risk">风险评估</TabsTrigger>
                <TabsTrigger value="controls">技术控制</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">合规评分</p>
                          <p className="text-3xl font-bold text-green-600">100%</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">风险等级</p>
                          <p className="text-3xl font-bold text-green-600">低</p>
                        </div>
                        <Shield className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">最后审核</p>
                          <p className="text-lg font-semibold">2025-03-13</p>
                        </div>
                        <Calendar className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>策略基本信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">策略名称</Label>
                        <p className="text-sm text-muted-foreground mt-1">{selectedCompliancePolicy.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">策略类型</Label>
                        <p className="text-sm text-muted-foreground mt-1">{selectedCompliancePolicy.type}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">创建时间</Label>
                        <p className="text-sm text-muted-foreground mt-1">2025-02-15</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">最后修改</Label>
                        <p className="text-sm text-muted-foreground mt-1">{selectedCompliancePolicy.lastModified}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">策略描述</Label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedCompliancePolicy.description}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">适用规则</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedCompliancePolicy.rules.map((rule: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {rule}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Audit History Tab */}
              <TabsContent value="audit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>审核历史记录</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCompliancePolicy.complianceDetails?.auditHistory.map((audit: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{audit.date}</span>
                                <Badge variant={audit.result === "通过" ? "default" : "destructive"}>
                                  {audit.result}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">审核人: {audit.auditor}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">{audit.score}%</p>
                              <p className="text-xs text-muted-foreground">合规评分</p>
                            </div>
                          </div>

                          {audit.issues.length > 0 && (
                            <div className="mb-3">
                              <Label className="text-sm font-medium text-red-600">发现问题</Label>
                              <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                                {audit.issues.map((issue: string, i: number) => (
                                  <li key={i}>{issue}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <Label className="text-sm font-medium text-blue-600">改进建议</Label>
                            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                              {audit.recommendations.map((rec: string, i: number) => (
                                <li key={i}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compliance Checks Tab */}
              <TabsContent value="compliance" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCompliancePolicy.complianceDetails?.complianceChecks.map((check: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{check.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              {check.status === "通过" ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span
                                className={`text-sm ${check.status === "通过" ? "text-green-600" : "text-red-600"}`}
                              >
                                {check.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-xl font-bold ${getComplianceColor(check.score)}`}>{check.score}%</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{check.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>法规框架合规状态</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCompliancePolicy.complianceDetails?.regulatoryFrameworks.map(
                        (framework: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{framework.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                最后检查: {framework.lastCheck} | 下次审查: {framework.nextReview}
                              </p>
                            </div>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              {framework.compliance}
                            </Badge>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Risk Assessment Tab */}
              <TabsContent value="risk" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>整体风险评估</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <p className="text-4xl font-bold text-green-600 mb-2">
                        {selectedCompliancePolicy.complianceDetails?.riskAssessment.overallRisk}
                      </p>
                      <p className="text-muted-foreground">整体风险等级</p>
                    </div>

                    <div className="space-y-4">
                      {selectedCompliancePolicy.complianceDetails?.riskAssessment.riskFactors.map(
                        (factor: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{factor.category}</h4>
                              <Badge className={getRiskLevelColor(factor.level)}>{factor.level}</Badge>
                            </div>
                            <div className="mb-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>风险评分</span>
                                <span>{factor.score}/100</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    factor.score <= 20
                                      ? "bg-green-500"
                                      : factor.score <= 40
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${factor.score}%` }}
                                ></div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <strong>缓解措施:</strong> {factor.mitigation}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Technical Controls Tab */}
              <TabsContent value="controls" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="h-5 w-5" />
                      <span>技术控制措施</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCompliancePolicy.complianceDetails?.technicalControls.map(
                        (control: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-medium">{control.control}</h4>
                                <p className="text-sm text-muted-foreground">实施方式: {control.implementation}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={control.status === "已实施" ? "default" : "secondary"}>
                                  {control.status}
                                </Badge>
                                <Badge
                                  className={
                                    control.effectiveness === "高"
                                      ? "bg-green-100 text-green-800"
                                      : control.effectiveness === "中"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {control.effectiveness}效
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsComplianceDetailsOpen(false)}>
              关闭
            </Button>
            <Button onClick={handleExportComplianceReport}>
              <Download className="mr-2 h-4 w-4" />
              导出报告
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除策略"{policyToDelete?.name}"吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDeletePolicy}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Policy Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑策略</DialogTitle>
            <DialogDescription>修改策略的配置信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>策略名称</Label>
              <Input
                value={policyForm.name}
                onChange={(e) => updateFormField("name", e.target.value)}
                placeholder="输入策略名称"
              />
            </div>
            <div className="space-y-2">
              <Label>策略类型</Label>
              <Select value={policyForm.type} onValueChange={(value) => updateFormField("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择策略类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="访问控制">访问控制</SelectItem>
                  <SelectItem value="计量计费">计量计费</SelectItem>
                  <SelectItem value="合规要求">合规要求</SelectItem>
                  <SelectItem value="使用限制">使用限制</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>描述</Label>
              <Textarea
                value={policyForm.description}
                onChange={(e) => updateFormField("description", e.target.value)}
                placeholder="详细描述策略的用途和适用场景"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleUpdatePolicy}>保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Filter Dialog */}
      <Dialog open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>高级筛选</DialogTitle>
            <DialogDescription>使用多个条件筛选策略</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>状态</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                  <SelectItem value="draft">草稿</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>合规评分范围</Label>
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="最低" />
                <span>-</span>
                <Input type="number" placeholder="最高" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>最后修改时间</Label>
              <div className="flex items-center space-x-2">
                <Input type="date" />
                <span>-</span>
                <Input type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdvancedFilterOpen(false)}>
              取消
            </Button>
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
