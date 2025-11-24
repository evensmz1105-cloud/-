"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, BarChart3, PieChart, FileText, Download, Calendar } from "lucide-react"

export function DataAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")

  const contractStats = {
    totalContracts: 156,
    activeContracts: 89,
    completedContracts: 67,
    avgExecutionTime: 15.6,
    successRate: 94.2,
    totalValue: "¥2,450,000",
  }

  const policyTemplates = [
    {
      name: "数据共享协议",
      usage: 45,
      successRate: 96,
      avgDuration: 12,
      category: "数据交换",
    },
    {
      name: "API访问授权",
      usage: 38,
      successRate: 98,
      avgDuration: 8,
      category: "接口服务",
    },
    {
      name: "云存储服务",
      usage: 32,
      successRate: 92,
      avgDuration: 18,
      category: "存储服务",
    },
    {
      name: "订阅式服务",
      usage: 28,
      successRate: 89,
      avgDuration: 25,
      category: "订阅服务",
    },
  ]

  const violationReasons = [
    { reason: "付款逾期", count: 12, percentage: 35 },
    { reason: "数据交付延迟", count: 8, percentage: 24 },
    { reason: "服务质量不达标", count: 6, percentage: 18 },
    { reason: "访问权限违规", count: 5, percentage: 15 },
    { reason: "其他", count: 3, percentage: 8 },
  ]

  const industryAnalysis = [
    { industry: "金融服务", contracts: 45, value: "¥980,000", growth: "+12%" },
    { industry: "医疗健康", contracts: 32, value: "¥650,000", growth: "+8%" },
    { industry: "教育科技", contracts: 28, value: "¥420,000", growth: "+15%" },
    { industry: "政府机构", contracts: 25, value: "¥380,000", growth: "+5%" },
    { industry: "企业服务", contracts: 26, value: "¥320,000", growth: "+18%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">数据与合约分析</h2>
          <p className="text-muted-foreground">历史合约统计分析，生成多维度数据报告</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7天</SelectItem>
              <SelectItem value="30d">30天</SelectItem>
              <SelectItem value="90d">90天</SelectItem>
              <SelectItem value="1y">1年</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总合约数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractStats.totalContracts}</div>
            <p className="text-xs text-muted-foreground">+12 本月新增</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">活跃合约</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{contractStats.activeContracts}</div>
            <p className="text-xs text-muted-foreground">正在执行</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已完成</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractStats.completedContracts}</div>
            <p className="text-xs text-muted-foreground">本月完成</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均周期</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractStats.avgExecutionTime}天</div>
            <p className="text-xs text-muted-foreground">履约周期</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{contractStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">履约成功率</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">总价值</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractStats.totalValue}</div>
            <p className="text-xs text-muted-foreground">合约总价值</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">总览分析</TabsTrigger>
          <TabsTrigger value="templates">策略模板</TabsTrigger>
          <TabsTrigger value="violations">违约分析</TabsTrigger>
          <TabsTrigger value="industry">行业分析</TabsTrigger>
          <TabsTrigger value="reports">报告生成</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>合约执行趋势</CardTitle>
                <CardDescription>过去30天的合约执行情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="mx-auto h-12 w-12 mb-2" />
                    <p>合约执行趋势图表</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>合约状态分布</CardTitle>
                <CardDescription>当前合约状态统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>执行中</span>
                      <span>57%</span>
                    </div>
                    <Progress value={57} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>已完成</span>
                      <span>43%</span>
                    </div>
                    <Progress value={43} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>已暂停</span>
                      <span>8%</span>
                    </div>
                    <Progress value={8} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>已终止</span>
                      <span>3%</span>
                    </div>
                    <Progress value={3} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>常用策略模板分析</CardTitle>
              <CardDescription>策略模板使用情况和成功率统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policyTemplates.map((template, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium">使用次数: {template.usage}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">成功率:</span> {template.successRate}%
                      </div>
                      <div>
                        <span className="text-muted-foreground">平均周期:</span> {template.avgDuration}天
                      </div>
                      <div>
                        <span className="text-muted-foreground">使用频率:</span>
                        <Badge variant="secondary" className="ml-1">
                          {template.usage > 40 ? "高" : template.usage > 25 ? "中" : "低"}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>成功率</span>
                        <span>{template.successRate}%</span>
                      </div>
                      <Progress value={template.successRate} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>违约原因分布</CardTitle>
              <CardDescription>分析合约违约的主要原因和趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {violationReasons.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{item.reason}</div>
                        <div className="text-sm text-muted-foreground">{item.count} 次违约</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.percentage}%</div>
                      <div className="w-20">
                        <Progress value={item.percentage} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industry" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>行业分析报告</CardTitle>
              <CardDescription>不同行业的合约使用情况和价值分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryAnalysis.map((industry, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{industry.industry}</h4>
                        <div className="text-sm text-muted-foreground">
                          {industry.contracts} 个合约 • {industry.value}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={industry.growth.startsWith("+") ? "default" : "secondary"}>
                          {industry.growth}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>市场占比</span>
                        <span>{Math.round((industry.contracts / contractStats.totalContracts) * 100)}%</span>
                      </div>
                      <Progress value={(industry.contracts / contractStats.totalContracts) * 100} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>报告生成中心</CardTitle>
              <CardDescription>生成各类数据分析和统计报告</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    合约执行统计报告
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <PieChart className="mr-2 h-4 w-4" />
                    策略模板使用报告
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    行业趋势分析报告
                  </Button>
                </div>
                <div className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    违约风险分析报告
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    月度运营报告
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    自定义报告生成
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
