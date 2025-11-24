"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  BookTemplate,
  FileSignature,
  Play,
  Monitor,
  Plus,
} from "lucide-react"
import { BarChart3 } from "lucide-react" // Import BarChart3

const systemStats = [
  { name: "活跃策略", value: "24", change: "+3", icon: Shield, color: "text-blue-600" },
  { name: "待签署合约", value: "8", change: "+2", icon: FileSignature, color: "text-orange-600" },
  { name: "执行中合约", value: "156", change: "+12", icon: Play, color: "text-green-600" },
  { name: "系统合规率", value: "99.2%", change: "+0.3%", icon: CheckCircle, color: "text-green-600" },
]

const recentActivities = [
  {
    id: 1,
    type: "policy",
    title: "数据访问控制策略已更新",
    description: "新增了对敏感数据的分级访问控制规则",
    time: "2小时前",
    status: "completed",
    icon: Shield,
  },
  {
    id: 2,
    type: "contract",
    title: "医疗数据共享合约待签署",
    description: "三方医疗机构数据共享协议等待最终签署",
    time: "4小时前",
    status: "pending",
    icon: FileSignature,
  },
  {
    id: 3,
    type: "execution",
    title: "金融数据交易合约执行完成",
    description: "银行间数据交易合约成功执行，交付完成",
    time: "6小时前",
    status: "completed",
    icon: Play,
  },
  {
    id: 4,
    type: "compliance",
    title: "合规检查发现潜在风险",
    description: "教育数据使用合约存在隐私保护条款不完整",
    time: "8小时前",
    status: "warning",
    icon: AlertTriangle,
  },
]

const quickActions = [
  { name: "创建新策略", icon: Shield, href: "#policy", color: "bg-blue-500" },
  { name: "选择模板", icon: BookTemplate, href: "#template", color: "bg-purple-500" },
  { name: "创建合约", icon: FileText, href: "#create", color: "bg-green-500" },
  { name: "查看监控", icon: Monitor, href: "#monitoring", color: "bg-orange-500" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已完成</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">待处理</Badge>
    case "warning":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">需关注</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

interface MainDashboardProps {
  onNavigate?: (page: string) => void
}

export function MainDashboard({ onNavigate }: MainDashboardProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">系统仪表板</h1>
            <p className="text-sm text-muted-foreground mt-1">数字合约管理系统总览</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => onNavigate?.("analytics")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              详细分析
            </Button>
            <Button
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => onNavigate?.("create")}
            >
              <Plus className="mr-2 h-4 w-4" />
              快速创建
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name} className="hover:shadow-md transition-shadow">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
              <CardDescription>常用功能快速入口</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.name}
                    variant="ghost"
                    className="w-full justify-start h-12"
                    onClick={() => onNavigate?.(action.href.replace("#", ""))}
                  >
                    <div className={`p-2 rounded-md mr-3 ${action.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    {action.name}
                  </Button>
                )
              })}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>最近活动</CardTitle>
              <CardDescription>系统最新动态和待处理事项</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                          {getStatusBadge(activity.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
