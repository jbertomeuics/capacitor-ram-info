import { CapacitorRAMInfo } from 'capacitor-ram-info';

let monitoringInterval = null;

// Test Echo
window.testEcho = async () => {
    const inputValue = document.getElementById("echoInput").value;
    const resultDiv = document.getElementById("echoResult");
    
    try {
        const result = await CapacitorRAMInfo.echo({ value: inputValue });
        resultDiv.innerHTML = `<div class="result success">✅ Echo result: ${result.value}</div>`;
    } catch (error) {
        resultDiv.innerHTML = `<div class="result error">❌ Echo error: ${error}</div>`;
    }
};

// Get RAM Info une fois
window.getRAMInfo = async () => {
    const ramDetails = document.getElementById("ramDetails");
    const ramButton = document.getElementById("ramButton");
    
    ramButton.disabled = true;
    ramButton.textContent = "Analyse...";
    
    try {
        const ramInfo = await CapacitorRAMInfo.getMemoryInfo();
        displayRAMInfo(ramInfo);
        
    } catch (error) {
        ramDetails.innerHTML = `<span style="color: #dc3545;">❌ Error: ${error}</span>`;
        ramDetails.classList.remove("hidden");
    } finally {
        ramButton.disabled = false;
        ramButton.textContent = "Analyser";
    }
};

// Monitoring continu
window.startMonitoring = () => {
    if (monitoringInterval) return;
    
    const monitorButton = document.getElementById("monitorButton");
    const stopButton = document.getElementById("stopButton");
    
    monitorButton.disabled = true;
    stopButton.disabled = false;
    
    // Première récupération immédiate
    getRAMInfo();
    
    // Puis toutes les 2 secondes
    monitoringInterval = setInterval(() => {
        getRAMInfoSilent();
    }, 2000);
};

window.stopMonitoring = () => {
    if (monitoringInterval) {
        clearInterval(monitoringInterval);
        monitoringInterval = null;
    }
    
    const monitorButton = document.getElementById("monitorButton");
    const stopButton = document.getElementById("stopButton");
    
    monitorButton.disabled = false;
    stopButton.disabled = true;
};

// Fonction silencieuse pour le monitoring
async function getRAMInfoSilent() {
    try {
        const ramInfo = await CapacitorRAMInfo.getMemoryInfo();
        displayRAMInfo(ramInfo, true);
    } catch (error) {
        console.error('RAM monitoring error:', error);
    }
}

// Affichage des infos RAM
function displayRAMInfo(ramInfo, isMonitoring = false) {
    const ramSummary = document.getElementById("ramSummary");
    const ramStats = document.getElementById("ramStats");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const ramDetails = document.getElementById("ramDetails");
    
    // Afficher le résumé visuel
    ramSummary.classList.remove("hidden");
    ramDetails.classList.remove("hidden");
    
    // Mise à jour du résumé
    ramStats.innerHTML = `
        <div class="ram-stat">
            <div class="ram-stat-value">${ramInfo.totalRamMB} MB</div>
            <div class="ram-stat-label">Total</div>
        </div>
        <div class="ram-stat">
            <div class="ram-stat-value">${ramInfo.usedRamMB} MB</div>
            <div class="ram-stat-label">Utilisée</div>
        </div>
        <div class="ram-stat">
            <div class="ram-stat-value">${ramInfo.availableRamMB} MB</div>
            <div class="ram-stat-label">Disponible</div>
        </div>
        <div class="ram-stat">
            <div class="ram-stat-value">${ramInfo.usedPercentage}%</div>
            <div class="ram-stat-label">Usage</div>
        </div>
        <div class="ram-stat">
            <div class="ram-stat-value">
                <span class="status-badge ${ramInfo.isLowMemory ? 'danger' : 'ok'}">
                    ${ramInfo.status}
                </span>
            </div>
            <div class="ram-stat-label">Status</div>
        </div>
    `;
    
    // Mise à jour de la barre de progression
    const percentage = ramInfo.usedPercentage;
    let progressClass = '';
    if (percentage > 80) progressClass = 'danger';
    else if (percentage > 60) progressClass = 'warning';
    
    progressFill.style.width = `${percentage}%`;
    progressFill.className = `progress-fill ${progressClass}`;
    progressText.textContent = `${percentage}%`;
    
    // Affichage détaillé avec timestamp si monitoring
    const timestamp = isMonitoring ? `[${new Date().toLocaleTimeString()}] ` : '';
    
    const detailedInfo = `${timestamp}📱 RAM Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💾 Memory Summary:
   Total RAM: ${ramInfo.totalRamMB} MB (${formatBytes(ramInfo.totalRam)})
   Used RAM:  ${ramInfo.usedRamMB} MB (${ramInfo.usedPercentage}%)
   Available: ${ramInfo.availableRamMB} MB
   
🚨 System Status:
   Low Memory: ${ramInfo.isLowMemory ? '⚠️  YES' : '✅ NO'}
   Status: ${ramInfo.status}
   Threshold: ${ramInfo.thresholdMB} MB
   
🔍 Raw Values:
   totalRam: ${ramInfo.totalRam} bytes
   usedRam: ${ramInfo.usedRam} bytes
   availableRam: ${ramInfo.availableRam} bytes
   threshold: ${ramInfo.threshold} bytes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    
    if (isMonitoring) {
        // Pour le monitoring, on ajoute en haut
        ramDetails.innerHTML = detailedInfo + '\n' + ramDetails.innerHTML;
        // Garder seulement les 5 dernières entrées
        const lines = ramDetails.innerHTML.split('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        if (lines.length > 11) { // 5 entrées * 2 séparateurs + 1
            ramDetails.innerHTML = lines.slice(0, 11).join('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }
    } else {
        ramDetails.innerHTML = detailedInfo;
    }
}

// Utilitaire pour formater les bytes
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Auto-start pour test
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 RAM Info Plugin Test App loaded!');
    console.log('Available functions:', { testEcho: window.testEcho, getRAMInfo: window.getRAMInfo });
});