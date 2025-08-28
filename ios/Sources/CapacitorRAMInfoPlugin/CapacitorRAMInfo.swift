import Foundation
import UIKit

struct AppMemoryInfo {
    let used: UInt64
    let resident: UInt64
    let virtual: UInt64
    let peak: UInt64
}

struct SystemMemoryInfo {
    let physicalMemory: UInt64
    let memoryPressure: String
    let lowMemoryWarning: Bool
}

@objc public class CapacitorRAMInfo: NSObject {
    
    private var hasReceivedMemoryWarning = false
    
    override init() {
        super.init()
        // S'abonner aux notifications de mémoire faible
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(didReceiveMemoryWarning),
            name: UIApplication.didReceiveMemoryWarningNotification,
            object: nil
        )
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    @objc private func didReceiveMemoryWarning() {
        hasReceivedMemoryWarning = true
    }
    
    @objc public func echo(_ value: String) -> String {
        print("iOS Echo: \(value)")
        return value
    }
    
    @objc public func getMemoryInfo() -> [String: Any] {
        let appMemory = getAppMemoryInfo()
        let systemMemory = getSystemMemoryInfo()
        
        // Sur iOS, on ne peut pas avoir la vraie RAM disponible/utilisée du système
        // On fait des estimations pour garder la même interface qu'Android
        
        let totalRam = systemMemory.physicalMemory
        let appUsedRam = appMemory.resident
        
        // Estimation de la RAM disponible (très approximative)
        // iOS ne donne pas cette info, on estime à 60% de libre en moyenne
        let estimatedAvailableRam = totalRam - (totalRam * 40 / 100)
        let estimatedUsedRam = totalRam - estimatedAvailableRam
        
        // Si l'app utilise beaucoup, on ajuste l'estimation
        if appUsedRam > estimatedUsedRam {
            let adjustedUsedRam = appUsedRam + (totalRam * 30 / 100) // App + estimation système
            let adjustedAvailableRam = totalRam - adjustedUsedRam
            
            let totalRamMB = Int(totalRam / 1024 / 1024)
            let availableRamMB = Int(max(0, adjustedAvailableRam) / 1024 / 1024)
            let usedRamMB = Int(adjustedUsedRam / 1024 / 1024)
            let usedPercentage = min(100, Int((Double(adjustedUsedRam) / Double(totalRam)) * 100))
            
            return buildResult(
                totalRam: totalRam,
                availableRam: max(0, adjustedAvailableRam),
                usedRam: adjustedUsedRam,
                totalRamMB: totalRamMB,
                availableRamMB: availableRamMB,
                usedRamMB: usedRamMB,
                usedPercentage: usedPercentage,
                isLowMemory: systemMemory.lowMemoryWarning || hasReceivedMemoryWarning
            )
        }
        
        // Cas normal - utiliser les estimations par défaut
        let totalRamMB = Int(totalRam / 1024 / 1024)
        let availableRamMB = Int(estimatedAvailableRam / 1024 / 1024)
        let usedRamMB = Int(estimatedUsedRam / 1024 / 1024)
        let usedPercentage = Int((Double(estimatedUsedRam) / Double(totalRam)) * 100)
        
        return buildResult(
            totalRam: totalRam,
            availableRam: estimatedAvailableRam,
            usedRam: estimatedUsedRam,
            totalRamMB: totalRamMB,
            availableRamMB: availableRamMB,
            usedRamMB: usedRamMB,
            usedPercentage: usedPercentage,
            isLowMemory: systemMemory.lowMemoryWarning || hasReceivedMemoryWarning
        )
    }
    
    private func buildResult(
        totalRam: UInt64,
        availableRam: UInt64,
        usedRam: UInt64,
        totalRamMB: Int,
        availableRamMB: Int,
        usedRamMB: Int,
        usedPercentage: Int,
        isLowMemory: Bool
    ) -> [String: Any] {
        
        // Estimation du threshold (iOS n'a pas cette info)
        let estimatedThreshold = totalRam * 15 / 100  // 15% de la RAM totale
        let thresholdMB = Int(estimatedThreshold / 1024 / 1024)
        
        // Interface IDENTIQUE à Android
        return [
            "totalRam": totalRam,
            "availableRam": availableRam,
            "usedRam": usedRam,
            "threshold": estimatedThreshold,
            "isLowMemory": isLowMemory,
            "totalRamMB": totalRamMB,
            "availableRamMB": availableRamMB,
            "usedRamMB": usedRamMB,
            "thresholdMB": thresholdMB,
            "usedPercentage": usedPercentage,
            "status": isLowMemory ? "LOW" : "OK"
        ]
    }
    
    private func getAppMemoryInfo() -> AppMemoryInfo {
        var info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size) / 4
        
        let kerr: kern_return_t = withUnsafeMutablePointer(to: &info) {
            $0.withMemoryRebound(to: integer_t.self, capacity: 1) {
                task_info(mach_task_self_, task_flavor_t(MACH_TASK_BASIC_INFO), $0, &count)
            }
        }
        
        if kerr == KERN_SUCCESS {
            return AppMemoryInfo(
                used: UInt64(info.resident_size),
                resident: UInt64(info.resident_size),
                virtual: UInt64(info.virtual_size),
                peak: UInt64(info.resident_size_max)
            )
        }
        
        // Fallback si l'API native échoue
        return AppMemoryInfo(used: 0, resident: 0, virtual: 0, peak: 0)
    }
    
    private func getSystemMemoryInfo() -> SystemMemoryInfo {
        // RAM physique totale
        let physicalMemory = ProcessInfo.processInfo.physicalMemory
        
        // Pression mémoire (approximation)
        let memoryPressure = getMemoryPressure()
        
        // Warning de mémoire faible
        let lowMemoryWarning = hasReceivedMemoryWarning
        
        return SystemMemoryInfo(
            physicalMemory: physicalMemory,
            memoryPressure: memoryPressure,
            lowMemoryWarning: lowMemoryWarning
        )
    }
    
    private func getMemoryPressure() -> String {
        // Utiliser les infos système disponibles pour estimer la pression
        if hasReceivedMemoryWarning {
            return "HIGH"
        }
        
        // Approximation basée sur l'utilisation de l'app
        let appMemory = getAppMemoryInfo()
        let systemMemory = ProcessInfo.processInfo.physicalMemory
        
        let appPercentage = Double(appMemory.resident) / Double(systemMemory) * 100
        
        if appPercentage > 15 {
            return "HIGH"
        } else if appPercentage > 8 {
            return "MEDIUM"
        } else {
            return "LOW"
        }
    }
}