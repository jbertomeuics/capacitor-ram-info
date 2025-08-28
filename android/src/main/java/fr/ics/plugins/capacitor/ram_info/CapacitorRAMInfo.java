package fr.ics.plugins.capacitor.ram_info;

import com.getcapacitor.Logger;

public class CapacitorRAMInfo {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
