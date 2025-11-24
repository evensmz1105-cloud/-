"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, XCircle, Clock, Bell, Monitor, Activity } from "lucide-react"

export function ContractMonitoring() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")

  const alerts = [
    {
      id: "1",
      type: "payment_overdue",
      severity: "high",
      contractId: "CT-2025-001",
      contractName: "数据共享服务合约",
      message: "付款逾期3天",
      timestamp: "2025-03-15 14:30",
      status: "active",
    },
    {
      id: "2",
      type: "data_delivery_failed",
      severity: "medium",
      contractId: "CT-2025-002",
      contractName: "API访问授权合约",
      message: "数据交付失败",
      timestamp: "2025-03-15 12:15",
      status: "resolved",
    },
    {
      id: "3",
      type: "policy_violation",
      severity: "high",
      contractId: "CT-2025-003",
      contractName: "云存储服务合约",
      message: "策略违规访问检测",
      timestamp: "2025-03-15 09:45",
      status: "investigating",
    },
  ]

  const monitoringData = [
    {
      contractId: "CT-2025-001",
      contractName: "数据共享服务合约",
      status: "warning",
      progress: 75,
      nextDeadline: "2025-03-20",
      issues: 2,
      lastActivity: "2025-03-15 14:30",
    },
    {
      contractId: "CT-2025-002",
      contractName: "API访问授权合约",
      status: "normal",
      progress: 90,
      nextDeadline: "2025-03-25",
      issues: 0,
      lastActivity: "2025-03-15 15:45",
    },
    {
      contractId: "CT-2025-003",
      contractName: "云存储服务合约",
      status: "critical",
      progress: 45,
      nextDeadline: "2025-03-18",
      issues: 3,
      lastActivity: "2025-03-15 10:20",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">合约监控与预警</h2>
          <p className="text-muted-foreground">实时监控合约执行状态，自动触发异常预警</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1小时</SelectItem>
              <SelectItem value="24h">24小时</SelectItem>
              <SelectItem value="7d">7天</SelectItem>
              <SelectItem value="30d">30天</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            预警设置
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">活跃合约</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">正在监控</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">预警数量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">5</div>
            <p className="text-xs text-muted-foreground">需要处理</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">正常执行</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">19</div>
            <p className="text-xs text-muted-foreground">运行良好</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">系统响应</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">监控大屏</TabsTrigger>
          <TabsTrigger value="alerts">预警管理</TabsTrigger>
          <TabsTrigger value="contracts">合约状态</TabsTrigger>
          <TabsTrigger value="settings">监控设置</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>实时监控大屏</CardTitle>
                <CardDescription>合约执行状态可视化展示</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-green-500">85%</div>
                      <div className="text-sm text-muted-foreground">正常执行率</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-yellow-500">12%</div>
                      <div className="text-sm text-muted-foreground">预警比例</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-red-500">3%</div>
                      <div className="text-sm text-muted-foreground">异常比例</div>
                    </div>
                  </div>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Monitor className="mx-auto h-12 w-12 mb-2" />
                      <p>实时监控图表</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>系统性能指标</CardTitle>
                <CardDescription>监控系统运行状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU使用率</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>内存使用率</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>网络带宽</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>存储使用率</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>预警列表</CardTitle>
              <CardDescription>查看和处理系统预警信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            alert.severity === "high"
                              ? "text-red-500"
                              : alert.severity === "medium"
                                ? "text-yellow-500"
                                : "text-blue-500"
                          }`}
                        />
                        <h4 className="font-medium">{alert.message}</h4>
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {alert.severity === "high" ? "高" : alert.severity === "medium" ? "中" : "低"}
                        </Badge>
                        <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>
                          {alert.status === "active" ? "活跃" : alert.status === "resolved" ? "已解决" : "调查中"}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                        {alert.status === "active" && <Button size="sm">处理</Button>}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      合约: {alert.contractName} ({alert.contractId}) • 时间: {alert.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>合约执行状态</CardTitle>
              <CardDescription>查看各合约的详细执行情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monitoringData.map((contract) => (
                  <div key={contract.contractId} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(contract.status)}
                        <h4 className="font-medium">{contract.contractName}</h4>
                        <Badge variant="outline">{contract.contractId}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Activity className="mr-2 h-4 w-4" />
                          查看详情
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>执行进度</span>
                          <span>{contract.progress}%</span>
                        </div>
                        <Progress value={contract.progress} />
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>下次截止日期: {contract.nextDeadline}</div>
                        <div>问题数量: {contract.issues}</div>
                        <div>最后活动: {contract.lastActivity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>监控设置</CardTitle>
              <CardDescription>配置监控参数和预警规则</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="check-interval">检查间隔</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择检查间隔" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">1分钟</SelectItem>
                      <SelectItem value="5m">5分钟</SelectItem>
                      <SelectItem value="15m">15分钟</SelectItem>
                      <SelectItem value="1h">1小时</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-threshold">预警阈值</Label>
                  <Input id="alert-threshold" placeholder="设置预警阈值" />
                </div>
              </div>
              <Button>保存设置</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
