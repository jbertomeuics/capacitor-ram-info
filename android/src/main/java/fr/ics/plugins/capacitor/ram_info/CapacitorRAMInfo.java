package fr.ics.plugins.capacitor.ram_info;

import android.app.ActivityManager;
import android.content.Context;
import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;

public class CapacitorRAMInfo {
    
    public JSObject getMemoryInfo(Context context) {
        try {
            ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
            ActivityManager.MemoryInfo memoryInfo = new ActivityManager.MemoryInfo();
            activityManager.getMemoryInfo(memoryInfo);
            
            // Calculs
            long totalRam = memoryInfo.totalMem;
            long availableRam = memoryInfo.availMem;
            long usedRam = totalRam - availableRam;
            long threshold = memoryInfo.threshold;
            boolean isLowMemory = memoryInfo.lowMemory;
            
            // Conversions en MB
            int totalRamMB = (int) (totalRam / 1024 / 1024);
            int availableRamMB = (int) (availableRam / 1024 / 1024);
            int usedRamMB = (int) (usedRam / 1024 / 1024);
            int thresholdMB = (int) (threshold / 1024 / 1024);
            
            // Pourcentage d'utilisation
            int usedPercentage = (int) Math.round((double) usedRam / totalRam * 100);
            
            // Construction de la réponse
            JSObject result = new JSObject();
            
            // Valeurs en bytes
            result.put("totalRam", totalRam);
            result.put("availableRam", availableRam);
            result.put("usedRam", usedRam);
            result.put("threshold", threshold);
            result.put("isLowMemory", isLowMemory);
            
            // Valeurs en MB
            result.put("totalRamMB", totalRamMB);
            result.put("availableRamMB", availableRamMB);
            result.put("usedRamMB", usedRamMB);
            result.put("thresholdMB", thresholdMB);
            
            // Pourcentage
            result.put("usedPercentage", usedPercentage);
            
            // Status textuel
            String status = isLowMemory ? "LOW" : "OK";
            result.put("status", status);
            
            Logger.info("RAMInfo", "RAM Total: " + totalRamMB + "MB, Utilisée: " + usedRamMB + "MB (" + usedPercentage + "%), Status: " + status);
            
            return result;
            
        } catch (Exception e) {
            Logger.error("RAMInfo", "Erreur lors de la récupération des infos RAM: " + e.getMessage(), e);
            
            // Retourner un objet d'erreur
            JSObject errorResult = new JSObject();
            errorResult.put("error", true);
            errorResult.put("message", e.getMessage());
            return errorResult;
        }
    }
    
    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}