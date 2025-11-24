"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Code, Play, ExternalLink, Copy, RefreshCw, Plus, Trash2, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function SmartContractIntegration() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("contracts")
  const [deploymentProgress, setDeploymentProgress] = useState(0)
  const [isCompiling, setIsCompiling] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [contractName, setContractName] = useState("")
  const [selectedChain, setSelectedChain] = useState("")
  const [previewOpen, setPreviewOpen] = useState(false)

  const [contracts, setContracts] = useState([
    {
      id: "1",
      name: "数据共享合约",
      status: "已部署",
      blockchain: "Ethereum",
      address: "0x71C...9A21",
      gasUsed: "245,678",
      lastUpdate: "2025-03-15 14:30",
    },
    {
      id: "2",
      name: "订阅服务合约",
      status: "编译中",
      blockchain: "Polygon",
      address: "待部署",
      gasUsed: "-",
      lastUpdate: "2025-03-15 15:45",
    },
  ])

  const [blockchains, setBlockchains] = useState([
    { name: "Ethereum", status: "已连接", gasPrice: "25 Gwei" },
    { name: "Polygon", status: "已连接", gasPrice: "30 Gwei" },
    { name: "BSC", status: "未连接", gasPrice: "-" },
    { name: "Arbitrum", status: "已连接", gasPrice: "0.5 Gwei" },
  ])

  const [apiBindings, setApiBindings] = useState([
    { id: 1, endpoint: "https://api.example.com/users", method: "GET", auth: "Bearer" }
  ])
  const [newApi, setNewApi] = useState({ endpoint: "", method: "GET", auth: "bearer" })

  const [viewContract, setViewContract] = useState<any>(null)

  const handleCompile = () => {
    if (!contractName) {
      toast({ title: "错误", description: "请输入合约名称", variant: "destructive" })
      return
    }
    setIsCompiling(true)
    setTimeout(() => {
      setIsCompiling(false)
      toast({ title: "编译成功", description: "智能合约代码编译完成，无错误。" })
    }, 1500)
  }

  const handleDeploy = () => {
    if (!contractName || !selectedChain) {
      toast({ title: "错误", description: "请完善部署信息", variant: "destructive" })
      return
    }
    setIsDeploying(true)
    setDeploymentProgress(0)
    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    setTimeout(() => {
      setIsDeploying(false)
      const newContract = {
        id: Date.now().toString(),
        name: contractName,
        status: "已部署",
        blockchain: selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1),
        address: "0x" + Math.random().toString(16).slice(2, 10).toUpperCase() + "..." + Math.random().toString(16).slice(2, 6).toUpperCase(),
        gasUsed: Math.floor(Math.random() * 500000).toLocaleString(),
        lastUpdate: new Date().toLocaleString(),
      }
      setContracts([newContract, ...contracts])
      setActiveTab("contracts")
      toast({ title: "部署成功", description: `合约 ${contractName} 已成功部署到 ${selectedChain}` })
      setContractName("")
      setSelectedChain("")
      setDeploymentProgress(0)
    }, 2500)
  }

  const toggleConnection = (chainName: string) => {
    setBlockchains(blockchains.map(chain => {
      if (chain.name === chainName) {
        const newStatus = chain.status === "已连接" ? "未连接" : "已连接"
        toast({ title: newStatus === "已连接" ? "连接成功" : "断开连接", description: `${chainName} 网络已${newStatus}` })
        return { ...chain, status: newStatus }
      }
      return chain
    }))
  }

  const handleAddApi = () => {
    if (!newApi.endpoint) return
    setApiBindings([...apiBindings, { id: Date.now(), ...newApi }])
    setNewApi({ ...newApi, endpoint: "" })
    toast({ title: "绑定成功", description: "新的API接口已绑定到智能合约" })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: "已复制", description: "合约地址已复制到剪贴板" })
  }

  const projectContracts = [
    { id: "pc1", name: "供应链采购协议_2025" },
    { id: "pc2", name: "员工保密协议_V2" },
    { id: "pc3", name: "技术服务合同_甲骨文" },
    { id: "pc4", name: "房屋租赁合同_A栋" },
    { id: "pc5", name: "知识产权转让协议" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">智能合约对接</h2>
          <p className="text-muted-foreground">将数字合约转化为智能合约代码并部署执行</p>
        </div>
        <Button onClick={() => setActiveTab("deployment")}>
          <Code className="mr-2 h-4 w-4" />
          新建智能合约
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已部署合约</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 本月新增</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">跨链调用</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">本月执行次数</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gas消耗</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.45 ETH</div>
            <p className="text-xs text-muted-foreground">本月总消耗</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API绑定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">活跃API接口</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">智能合约管理</TabsTrigger>
          <TabsTrigger value="deployment">合约部署</TabsTrigger>
          <TabsTrigger value="blockchain">区块链网络</TabsTrigger>
          <TabsTrigger value="api">API绑定</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>智能合约列表</CardTitle>
              <CardDescription>管理已部署和待部署的智能合约</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{contract.name}</h4>
                        <Badge variant={contract.status === "已部署" ? "default" : "secondary"}>
                          {contract.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contract.blockchain} • {contract.address} • Gas: {contract.gasUsed}
                      </div>
                      <div className="text-xs text-muted-foreground">最后更新: {contract.lastUpdate}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(contract.address)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={() => setViewContract(contract)}>查看详情</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>合约部署</CardTitle>
              <CardDescription>将数字合约转化为智能合约代码并部署</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contract-name">合约名称</Label>
                  <Select value={contractName} onValueChange={setContractName}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择项目合约" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectContracts.map((c) => (
                        <SelectItem key={c.id} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blockchain">目标区块链</Label>
                  <Select value={selectedChain} onValueChange={setSelectedChain}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择区块链网络" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="bsc">BSC</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contract-code">智能合约代码</Label>
                <Textarea
                  id="contract-code"
                  placeholder="// 自动生成的智能合约代码将显示在这里"
                  className="min-h-[200px] font-mono"
                />
              </div>
              {isDeploying && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>部署进度</span>
                    <span>{deploymentProgress}%</span>
                  </div>
                  <Progress value={deploymentProgress} />
                </div>
              )}
              <div className="flex space-x-2">
                <Button onClick={handleCompile} disabled={isCompiling || isDeploying}>
                  {isCompiling ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                  编译合约
                </Button>
                <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">预览代码</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>合约代码预览</DialogTitle>
                      <DialogDescription>Solidity 智能合约代码预览</DialogDescription>
                    </DialogHeader>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-auto max-h-[400px]">
                      <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalContract {
    address public owner;
    string public contractHash;
    uint256 public timestamp;

    event ContractSigned(address indexed signer, uint256 timestamp);

    constructor(string memory _hash) {
        owner = msg.sender;
        contractHash = _hash;
        timestamp = block.timestamp;
    }

    function sign() public {
        emit ContractSigned(msg.sender, block.timestamp);
    }
}`}</pre>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={handleDeploy} disabled={isDeploying || !contractName}>
                  {isDeploying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                  测试部署
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>区块链网络</CardTitle>
              <CardDescription>管理支持的区块链网络连接</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blockchains.map((blockchain) => (
                  <div key={blockchain.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{blockchain.name}</h4>
                        <Badge variant={blockchain.status === "已连接" ? "default" : "secondary"}>
                          {blockchain.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Gas Price: {blockchain.gasPrice}</div>
                    </div>
                    <Button
                      variant={blockchain.status === "已连接" ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleConnection(blockchain.name)}
                    >
                      {blockchain.status === "已连接" ? "断开连接" : "连接网络"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API绑定管理</CardTitle>
              <CardDescription>管理智能合约与数据访问API的自动绑定</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">API端点</Label>
                    <Input
                      id="api-endpoint"
                      placeholder="https://api.example.com/data"
                      value={newApi.endpoint}
                      onChange={(e) => setNewApi({ ...newApi, endpoint: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auth-method">认证方式</Label>
                    <Select value={newApi.auth} onValueChange={(v) => setNewApi({ ...newApi, auth: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择认证方式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bearer">Bearer Token</SelectItem>
                        <SelectItem value="apikey">API Key</SelectItem>
                        <SelectItem value="oauth">OAuth 2.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddApi}>
                  <Plus className="mr-2 h-4 w-4" />
                  添加API绑定
                </Button>

                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-medium">已绑定API</h4>
                  {apiBindings.map((api) => (
                    <div key={api.id} className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{api.method}</Badge>
                        <span className="text-sm font-mono">{api.endpoint}</span>
                        <Badge variant="secondary" className="text-xs">{api.auth}</Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {apiBindings.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-md">
                      暂无API绑定
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contract Details Dialog */}
      <Dialog open={!!viewContract} onOpenChange={(open) => !open && setViewContract(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>合约详情</DialogTitle>
            <DialogDescription>查看智能合约的详细信息</DialogDescription>
          </DialogHeader>
          {viewContract && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">合约名称</Label>
                  <div className="font-medium">{viewContract.name}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">状态</Label>
                  <div className="font-medium">{viewContract.status}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">区块链</Label>
                  <div className="font-medium">{viewContract.blockchain}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Gas 消耗</Label>
                  <div className="font-medium">{viewContract.gasUsed}</div>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">合约地址</Label>
                <div className="font-mono text-sm bg-muted p-2 rounded mt-1 break-all">
                  {viewContract.address}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">最后更新</Label>
                <div className="font-medium">{viewContract.lastUpdate}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewContract(null)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
