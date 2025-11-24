"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainDashboard } from "@/components/main-dashboard"
import { PolicyDashboard } from "@/components/policy-dashboard"
import { TemplateCenter } from "@/components/template-center"
import { ContractCreation } from "@/components/contract-creation"
import { ContractSigning } from "@/components/contract-signing"
import { ContractFiling } from "@/components/contract-filing"
import { ContractExecution } from "@/components/contract-execution"
import { SmartContractIntegration } from "@/components/smart-contract-integration"
import { ContractTermination } from "@/components/contract-termination"
import { ContractMonitoring } from "@/components/contract-monitoring"
import { ComplianceRisk } from "@/components/compliance-risk"
import { ArbitrationDispute } from "@/components/arbitration-dispute"
import { DataAnalytics } from "@/components/data-analytics"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <MainDashboard onNavigate={setCurrentPage} />
      case "policy":
        return <PolicyDashboard />
      case "template":
        return <TemplateCenter />
      case "create":
        return <ContractCreation />
      case "signing":
        return <ContractSigning />
      case "filing":
        return <ContractFiling />
      case "execution":
        return <ContractExecution />
      case "smart-contract":
        return <SmartContractIntegration />
      case "termination":
        return <ContractTermination />
      case "monitoring":
        return <ContractMonitoring />
      case "compliance":
        return <ComplianceRisk />
      case "arbitration":
        return <ArbitrationDispute />
      case "analytics":
        return <DataAnalytics />
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">系统设置</h1>
            <p className="text-muted-foreground mt-2">功能开发中...</p>
          </div>
        )
      default:
        return <MainDashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-hidden">{renderCurrentPage()}</main>
    </div>
  )
}
