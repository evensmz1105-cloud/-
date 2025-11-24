"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Monitor,
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"

const systemMetrics = {
  totalContracts: 156,
  activeContracts: 45,
  completedToday: 12,
  failedContracts: 3,
  averageExecutionTime: "4.2小时",
  systemUptime: "99.8%",
  throughput: "2.3GB/小时",
  errorRate: "0.2%",
}

const performanceData = [
  { name: "合约执行成功率", value: 98.5, trend: "up", change: "+0.3%" },
  { name: "平均执行时间", value: 4.2, trend: "down", change: "-0.5小时" },
  { name: "系统响应时间", value: 120, trend: "up", change: "+15ms" },
  { name: "数据传输速率", value: 2.3, trend: "up", change: "+0.2GB/h" },
]

const recentEvents = [
  {
    id: 1,
    type: "success",
    title: "合约执行完成",
    description: "教育资源共享协议-在线平台 执行成功",
    timestamp: "2024-01-16 16:30",
    contractId: "DC2024003",
  },
  {
    id: 2,
    type: "warning",
    title: "执行延迟警告",
    description: "银行间数据共享协议 执行时间超过预期30分钟",
    timestamp: "2024-01-16 15:45",
    contractId: "DC2024001",
  },
  {
    id: 3,
    type: "error",
    title: "执行失败",
    description: "API服务协议 因网络超时执行失败，已自动重试",
    timestamp: "2024-01-16 14:20",
    contractId: "DC2024005",
  },
  {
    id: 4,
    type: "info",
    title: "系统维护完成",
    description: "执行引擎维护完成，所有服务已恢复正常",
    timestamp: "2024-01-16 13:00",
    contractId: "",
  },
]

const resourceUsage = {
  cpu: 65,
  memory: 78,
  storage: 45,
  network: 32,
}

const contractsByStatus = [
  { status: "执行中", count: 45, color: "bg-blue-500" },
  { status: "已完成", count: 98, color: "bg-green-500" },
  { status: "已暂停", count: 8, color: "bg-yellow-500" },
  { status: "执行失败", count: 5, color: "bg-red-500" },
]

const executionTrends = [
  { date: "01-10", success: 15, failed: 1 },
  { date: "01-11", success: 18, failed: 0 },
  { date: "01-12", success: 22, failed: 2 },
  { date: "01-13", success: 19, failed: 1 },
  { date: "01-14", success: 25, failed: 1 },
  { date: "01-15", success: 21, failed: 0 },
  { date: "01-16", success: 12, failed: 1 },
]

function getEventIcon(type: string) {
  switch (type) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "error":
      return <XCircle className="h-4 w-4 text-red-600" />
    case "info":
      return <Activity className="h-4 w-4 text-blue-600" />
    default:
      return <Activity className="h-4 w-4 text-gray-400" />
  }
}

function getTrendIcon(trend: string) {
  return trend === "up" ? (
    <TrendingUp className="h-4 w-4 text-green-600" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-600" />
  )
}

export function ExecutionMonitoring() {
  const [timeRange, setTimeRange] = useState("24h")

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">执行监控</h1>
            <p className="text-sm text-muted-foreground mt-1">实时监控系统性能和合约执行状态</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">最近1小时</SelectItem>
                <SelectItem value="24h">最近24小时</SelectItem>
                <SelectItem value="7d">最近7天</SelectItem>
                <SelectItem value="30d">最近30天</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Monitor className="mr-2 h-4 w-4" />
              实时监控
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">总合约数</p>
                  <p className="text-2xl font-bold text-foreground">{systemMetrics.totalContracts}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">执行中</p>
                  <p className="text-2xl font-bold text-foreground">{systemMetrics.activeContracts}</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">今日完成</p>
                  <p className="text-2xl font-bold text-foreground">{systemMetrics.completedToday}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">系统正常运行时间</p>
                  <p className="text-2xl font-bold text-foreground">{systemMetrics.systemUptime}</p>
                </div>
                <Monitor className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">性能指标</TabsTrigger>
            <TabsTrigger value="resources">资源使用</TabsTrigger>
            <TabsTrigger value="trends">执行趋势</TabsTrigger>
            <TabsTrigger value="events">系统事件</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    关键性能指标
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceData.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{metric.name}</p>
                        <p className="text-lg font-bold">{metric.value}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    合约状态分布
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {contractsByStatus.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm">{item.status}</span>
                      </div>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CPU使用率</span>
                      <span className="text-sm">{resourceUsage.cpu}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${resourceUsage.cpu}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">内存使用率</span>
                      <span className="text-sm">{resourceUsage.memory}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${resourceUsage.memory}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">存储使用率</span>
                      <span className="text-sm">{resourceUsage.storage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all"
                        style={{ width: `${resourceUsage.storage}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">网络使用率</span>
                      <span className="text-sm">{resourceUsage.network}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${resourceUsage.network}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  执行趋势分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {executionTrends.map((day, index) => (
                      <div key={index} className="space-y-2">
                        <div className="text-xs text-muted-foreground">{day.date}</div>
                        <div className="space-y-1">
                          <div
                            className="bg-green-500 rounded-sm"
                            style={{ height: `${(day.success / 25) * 60}px`, minHeight: "4px" }}
                          ></div>
                          <div
                            className="bg-red-500 rounded-sm"
                            style={{ height: `${(day.failed / 5) * 20}px`, minHeight: "2px" }}
                          ></div>
                        </div>
                        <div className="text-xs">
                          <div className="text-green-600">{day.success}</div>
                          <div className="text-red-600">{day.failed}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                      <span>成功执行</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                      <span>执行失败</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  最近系统事件
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                      <div className="flex-shrink-0 mt-0.5">{getEventIcon(event.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{event.title}</p>
                          <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        {event.contractId && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {event.contractId}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
