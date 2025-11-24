"use client"

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  BookTemplate,
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Edit,
  Copy,
  Plus,
  Building2,
  Heart,
  GraduationCap,
  Banknote,
  Users,
  Upload,
  X,
  Trash2,
} from "lucide-react"

const industries = [
  { value: "finance", label: "金融", icon: Banknote, color: "bg-green-500" },
  { value: "healthcare", label: "医疗", icon: Heart, color: "bg-red-500" },
  { value: "education", label: "教育", icon: GraduationCap, color: "bg-blue-500" },
  { value: "government", label: "政府", icon: Building2, color: "bg-purple-500" },
  { value: "enterprise", label: "企业", icon: Users, color: "bg-orange-500" },
]

const templates = [
  {
    id: 1,
    name: "银行间数据共享协议",
    description: "适用于银行间客户信息和交易数据的安全共享",
    industry: "finance",
    type: "standard",
    scenario: "订阅式共享",
    rating: 4.8,
    downloads: 1250,
    lastUpdated: "2024-01-15",
    compliance: ["GDPR", "PCI DSS", "SOX"],
    features: ["数据加密", "访问控制", "审计日志", "自动计费"],
    preview: "包含完整的数据分类、访问权限控制和合规审计条款",
  },
  {
    id: 2,
    name: "医疗数据研究授权",
    description: "医疗机构向研究机构提供匿名化数据的授权模板",
    industry: "healthcare",
    type: "standard",
    scenario: "限时访问",
    rating: 4.9,
    downloads: 890,
    lastUpdated: "2024-01-14",
    compliance: ["HIPAA", "GDPR", "FDA"],
    features: ["数据匿名化", "时间限制", "用途限制", "伦理审查"],
    preview: "严格的医疗数据保护和研究用途限制条款",
  },
  {
    id: 3,
    name: "教育资源按次计费",
    description: "在线教育平台按课程访问次数计费的标准模板",
    industry: "education",
    type: "standard",
    scenario: "按次计费",
    rating: 4.6,
    downloads: 650,
    lastUpdated: "2024-01-13",
    compliance: ["COPPA", "FERPA"],
    features: ["按次计费", "学习进度跟踪", "内容保护", "退费机制"],
    preview: "灵活的教育资源访问和计费管理条款",
  },
  {
    id: 4,
    name: "政府数据开放协议",
    description: "政府部门向公众开放非敏感数据的标准协议",
    industry: "government",
    type: "standard",
    scenario: "公开访问",
    rating: 4.7,
    downloads: 420,
    lastUpdated: "2024-01-12",
    compliance: ["信息公开法", "数据安全法"],
    features: ["分级开放", "使用追踪", "版权声明", "责任免除"],
    preview: "规范的政府数据开放和使用条款",
  },
  {
    id: 5,
    name: "企业API服务协议",
    description: "企业间API服务调用的标准化合约模板",
    industry: "enterprise",
    type: "custom",
    scenario: "订阅式共享",
    rating: 4.5,
    downloads: 980,
    lastUpdated: "2024-01-11",
    compliance: ["ISO 27001", "SOC 2"],
    features: ["SLA保障", "流量控制", "故障处理", "弹性计费"],
    preview: "完整的API服务等级和计费条款",
  },
]

const scenarios = [
  { value: "subscription", label: "订阅式共享", description: "长期稳定的数据访问服务" },
  { value: "limited", label: "限时访问", description: "在特定时间窗口内的数据访问" },
  { value: "payper", label: "按次计费", description: "根据实际使用次数进行计费" },
  { value: "public", label: "公开访问", description: "面向公众的开放数据服务" },
]

const stats = [
  { name: "标准模板", value: "45", change: "+3", icon: BookTemplate, color: "text-blue-600" },
  { name: "自定义模板", value: "28", change: "+5", icon: Edit, color: "text-purple-600" },
  { name: "总下载量", value: "12.5K", change: "+1.2K", icon: Download, color: "text-green-600" },
  { name: "平均评分", value: "4.7", change: "+0.1", icon: Star, color: "text-yellow-600" },
]

function getIndustryBadge(industry: string) {
  const industryInfo = industries.find((i) => i.value === industry)
  if (!industryInfo) return null

  const Icon = industryInfo.icon
  return (
    <Badge variant="outline" className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {industryInfo.label}
    </Badge>
  )
}

function getTypeBadge(type: string) {
  return type === "standard" ? (
    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">标准模板</Badge>
  ) : (
    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">自定义模板</Badge>
  )
}

export function TemplateCenter() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterIndustry, setFilterIndustry] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [templatesList, setTemplatesList] = useState(templates)
  const [activeTab, setActiveTab] = useState("all")
  
  // 创建模板表单状态
  const [templateForm, setTemplateForm] = useState({
    name: "",
    industry: "",
    scenario: "",
    description: "",
  })

  const filteredTemplates = templatesList.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = (filterIndustry === "all" || template.industry === filterIndustry) &&
                           (activeTab === "all" || template.industry === activeTab)
    const matchesType = filterType === "all" || template.type === filterType
    return matchesSearch && matchesIndustry && matchesType
  })
  
  // 处理行业标签页切换
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value !== "all") {
      setFilterIndustry(value)
    } else {
      setFilterIndustry("all")
    }
  }
  
  // 处理批量导入
  const handleBatchImport = () => {
    setIsImportDialogOpen(true)
  }
  
  // 处理创建模板
  const handleCreateTemplate = () => {
    if (!templateForm.name || !templateForm.industry || !templateForm.scenario || !templateForm.description) {
      toast({
        title: "信息不完整",
        description: "请填写所有必填项",
        variant: "destructive",
      })
      return
    }
    
    const newTemplate = {
      id: Math.max(...templatesList.map(t => t.id), 0) + 1,
      name: templateForm.name,
      description: templateForm.description,
      industry: templateForm.industry,
      type: "custom",
      scenario: scenarios.find(s => s.value === templateForm.scenario)?.label || templateForm.scenario,
      rating: 0,
      downloads: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      compliance: [],
      features: [],
      preview: templateForm.description,
    }
    
    setTemplatesList(prev => [...prev, newTemplate])
    setIsCreateDialogOpen(false)
    
    // 重置表单
    setTemplateForm({
      name: "",
      industry: "",
      scenario: "",
      description: "",
    })
    
    toast({
      title: "模板已创建",
      description: `模板"${newTemplate.name}"已成功创建`,
    })
  }
  
  // 处理查看模板
  const handleViewTemplate = (template: any) => {
    setSelectedTemplate(template)
    setIsPreviewDialogOpen(true)
  }
  
  // 处理复制模板
  const handleCopyTemplate = (template: any) => {
    const copiedTemplate = {
      ...template,
      id: Math.max(...templatesList.map(t => t.id), 0) + 1,
      name: `${template.name} (副本)`,
      downloads: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    }
    
    setTemplatesList(prev => [...prev, copiedTemplate])
    toast({
      title: "模板已复制",
      description: `模板"${template.name}"已成功复制`,
    })
  }
  
  // 处理使用模板
  const handleUseTemplate = (template: any) => {
    toast({
      title: "模板已应用",
      description: `模板"${template.name}"已应用到合约创建页面`,
    })
    // 这里可以导航到合约创建页面并预填充模板
  }
  
  // 处理文件导入
  const handleFileImport = () => {
    toast({
      title: "文件导入中",
      description: "正在处理导入文件，请稍候...",
    })
    // 模拟导入
    setTimeout(() => {
      toast({
        title: "导入成功",
        description: "模板文件已成功导入",
      })
      setIsImportDialogOpen(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">策略模板中心</h1>
            <p className="text-sm text-muted-foreground mt-1">标准化与自定义模板，快速构建合约策略</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleBatchImport}>
              <Download className="mr-2 h-4 w-4" />
              批量导入
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  创建模板
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>创建自定义模板</DialogTitle>
                  <DialogDescription>基于业务需求创建专属的合约模板</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">模板名称</Label>
                      <Input 
                        id="template-name" 
                        placeholder="输入模板名称"
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-industry">适用行业</Label>
                      <Select 
                        value={templateForm.industry}
                        onValueChange={(value) => setTemplateForm(prev => ({ ...prev, industry: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择行业" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry.value} value={industry.value}>
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-scenario">交易场景</Label>
                    <Select 
                      value={templateForm.scenario}
                      onValueChange={(value) => setTemplateForm(prev => ({ ...prev, scenario: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择交易场景" />
                      </SelectTrigger>
                      <SelectContent>
                        {scenarios.map((scenario) => (
                          <SelectItem key={scenario.value} value={scenario.value}>
                            <div>
                              <div className="font-medium">{scenario.label}</div>
                              <div className="text-sm text-muted-foreground">{scenario.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-description">模板描述</Label>
                    <Textarea 
                      id="template-description" 
                      placeholder="详细描述模板的用途和特点"
                      value={templateForm.description}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsCreateDialogOpen(false)
                      setTemplateForm({
                        name: "",
                        industry: "",
                        scenario: "",
                        description: "",
                      })
                    }}
                  >
                    取消
                  </Button>
                  <Button onClick={handleCreateTemplate}>创建模板</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                        <span className={stat.color}>{stat.change}</span> 较上月
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

      {/* Industry Tabs */}
      <div className="border-b border-border">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="px-6 py-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">全部行业</TabsTrigger>
              {industries.map((industry) => {
                const Icon = industry.icon
                return (
                  <TabsTrigger key={industry.value} value={industry.value} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {industry.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Search and Filter */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索模板名称或描述..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="模板类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="standard">标准模板</SelectItem>
              <SelectItem value="custom">自定义模板</SelectItem>
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

      {/* Template Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleViewTemplate(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getTypeBadge(template.type)}
                      {getIndustryBadge(template.industry)}
                    </div>
                    <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {template.scenario}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {template.compliance.slice(0, 2).map((comp, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                    {template.compliance.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.compliance.length - 2}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{template.preview}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">更新: {template.lastUpdated}</span>
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewTemplate(template)}
                      title="查看详情"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCopyTemplate(template)}
                      title="复制模板"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="text-xs"
                      onClick={() => handleUseTemplate(template)}
                    >
                      使用模板
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Template Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookTemplate className="h-5 w-5" />
              {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription>查看模板的详细信息</DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold">模板描述</h3>
                <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">基本信息</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">行业:</span>
                      <span>{getIndustryBadge(selectedTemplate.industry)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">类型:</span>
                      <span>{getTypeBadge(selectedTemplate.type)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">场景:</span>
                      <span>{selectedTemplate.scenario}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">评分:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedTemplate.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">下载量:</span>
                      <span>{selectedTemplate.downloads}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">最后更新:</span>
                      <span>{selectedTemplate.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">合规标准</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedTemplate.compliance.map((comp: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">功能特性</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedTemplate.features.map((feature: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">预览内容</h3>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{selectedTemplate.preview}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              关闭
            </Button>
            <Button onClick={() => {
              if (selectedTemplate) {
                handleUseTemplate(selectedTemplate)
                setIsPreviewDialogOpen(false)
              }
            }}>
              使用此模板
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>批量导入模板</DialogTitle>
            <DialogDescription>从文件批量导入模板到模板库</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">拖拽文件到此处或点击上传</p>
              <p className="text-xs text-muted-foreground mb-4">支持 JSON, CSV, Excel 格式</p>
              <Button variant="outline" size="sm">
                选择文件
              </Button>
            </div>
            <div className="space-y-2">
              <Label>导入选项</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="overwrite" className="rounded" />
                  <Label htmlFor="overwrite" className="text-sm font-normal">
                    覆盖同名模板
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="validate" className="rounded" defaultChecked />
                  <Label htmlFor="validate" className="text-sm font-normal">
                    导入前验证数据格式
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleFileImport}>
              <Upload className="mr-2 h-4 w-4" />
              开始导入
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Filter Dialog */}
      <Dialog open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>高级筛选</DialogTitle>
            <DialogDescription>使用多个条件筛选模板</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>评分范围</Label>
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="最低" min="0" max="5" step="0.1" />
                <span>-</span>
                <Input type="number" placeholder="最高" min="0" max="5" step="0.1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>下载量范围</Label>
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="最少" min="0" />
                <span>-</span>
                <Input type="number" placeholder="最多" min="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>最后更新</Label>
              <div className="flex items-center space-x-2">
                <Input type="date" />
                <span>-</span>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>合规标准</Label>
              <div className="grid grid-cols-2 gap-2">
                {["GDPR", "HIPAA", "PCI DSS", "SOX", "ISO 27001", "SOC 2"].map((comp) => (
                  <div key={comp} className="flex items-center space-x-2">
                    <input type="checkbox" id={comp} className="rounded" />
                    <Label htmlFor={comp} className="text-sm font-normal">
                      {comp}
                    </Label>
                  </div>
                ))}
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
