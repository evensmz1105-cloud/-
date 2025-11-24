"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Shield,
  Settings,
  Home,
  BookTemplate,
  FileSignature,
  Archive,
  Play,
  Code,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Gavel,
  TrendingUp,
} from "lucide-react"

const navigation = [
  { name: "仪表板", href: "#dashboard", icon: Home, current: true },
  { name: "策略管理", href: "#policy", icon: Shield, current: false },
  { name: "模板中心", href: "#template", icon: BookTemplate, current: false },
  { name: "合约创建", href: "#create", icon: FileText, current: false },
  { name: "合约签署", href: "#signing", icon: FileSignature, current: false },
  { name: "合约备案", href: "#filing", icon: Archive, current: false },
  { name: "合约执行", href: "#execution", icon: Play, current: false },
  { name: "智能合约对接", href: "#smart-contract", icon: Code, current: false },
  { name: "合同解除", href: "#termination", icon: XCircle, current: false },
  { name: "合规风险", href: "#compliance", icon: ShieldCheck, current: false },

]

interface SidebarProps {
  currentPage?: string
  onNavigate?: (page: string) => void
}

export function Sidebar({ currentPage = "dashboard", onNavigate }: SidebarProps) {
  return (
    <div className="flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-sidebar-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">数字合约管理系统</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.href.replace("#", "")
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              onClick={() => onNavigate?.(item.href.replace("#", ""))}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
