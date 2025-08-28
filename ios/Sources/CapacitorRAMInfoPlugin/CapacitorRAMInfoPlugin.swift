import Foundation
import Capacitor

/**
 * iOS Plugin for RAM information
 * Limited by iOS security restrictions - provides app memory info only
 */
@objc(CapacitorRAMInfoPlugin)
public class CapacitorRAMInfoPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapacitorRAMInfoPlugin"
    public let jsName = "CapacitorRAMInfo"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getMemoryInfo", returnType: CAPPluginReturnPromise)
    ]
    
    private let implementation = CapacitorRAMInfo()
    
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
    
    @objc func getMemoryInfo(_ call: CAPPluginCall) {
        do {
            let memoryInfo = implementation.getMemoryInfo()
            call.resolve(memoryInfo)
        } catch {
            call.reject("Failed to get memory info: \(error.localizedDescription)")
        }
    }
}