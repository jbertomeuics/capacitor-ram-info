import { CapacitorRAMInfo } from 'capacitor-ram-info';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    CapacitorRAMInfo.echo({ value: inputValue })
}
