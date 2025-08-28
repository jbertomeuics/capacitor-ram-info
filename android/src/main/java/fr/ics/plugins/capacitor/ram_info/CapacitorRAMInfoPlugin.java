package fr.ics.plugins.capacitor.ram_info;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "CapacitorRAMInfo")
public class CapacitorRAMInfoPlugin extends Plugin {
    
    private CapacitorRAMInfo implementation = new CapacitorRAMInfo();
    
    @PluginMethod
    public void getMemoryInfo(PluginCall call) {
        try {
            JSObject result = implementation.getMemoryInfo(getContext());
            
            // Vérifier si on a une erreur
            if (result.has("error") && result.getBool("error")) {
                call.reject(result.getString("message"));
            } else {
                call.resolve(result);
            }
            
        } catch (Exception e) {
            call.reject("Erreur lors de la récupération des infos mémoire: " + e.getMessage());
        }
    }
    
    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");
        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
    }
}