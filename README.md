# capacitor-ram-info

🚀 Plugin Capacitor pour récupérer les informations mémoire du device Android.

🇬🇧 [English documentation](#english-documentation) | 🇫🇷 [Documentation française](#documentation-française)

---

## 🇫🇷 Documentation française

### Features

- ✅ RAM totale du système
- ✅ RAM utilisée et disponible
- ✅ Pourcentage d'utilisation
- ✅ Statut de mémoire faible (Low Memory)
- ✅ Seuil critique du système
- ✅ Compatible Android uniquement
- ✅ Support TypeScript

### Installation

```bash
npm install https://github.com/jbertomeuics/capacitor-ram-info.git
npx cap sync
```

Ou avec une version spécifique :

```bash
npm install https://github.com/jbertomeuics/capacitor-ram-info.git#v1.0.0
npx cap sync
```

### Utilisation

```typescript
import { CapacitorRAMInfo } from 'capacitor-ram-info';

// Récupérer les informations RAM
const ramInfo = await CapacitorRAMInfo.getMemoryInfo();

console.log('RAM totale:', ramInfo.totalRamMB, 'MB');
console.log('RAM utilisée:', ramInfo.usedRamMB, 'MB');
console.log('RAM disponible:', ramInfo.availableRamMB, 'MB');
console.log('Utilisation:', ramInfo.usedPercentage, '%');
console.log('Mémoire faible?', ramInfo.isLowMemory);
```

### API

<docgen-index>

* [`getMemoryInfo()`](#getmemoryinfo)
* [`echo(...)`](#echo)

</docgen-index>

<docgen-api>

#### getMemoryInfo()

```typescript
getMemoryInfo() => Promise<MemoryInfo>
```

Récupère les informations détaillées sur la mémoire du système.

**Retourne:** <code>Promise&lt;<a href="#memoryinfo">MemoryInfo</a>&gt;</code>

--------------------

#### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

Fonction de test pour vérifier que le plugin fonctionne.

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Retourne:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------

### Interface MemoryInfo

| Prop                | Type                 | Description                                    |
| ------------------- | -------------------- | ---------------------------------------------- |
| **`totalRam`**      | <code>number</code>  | RAM totale en bytes                            |
| **`availableRam`**  | <code>number</code>  | RAM disponible en bytes                        |
| **`usedRam`**       | <code>number</code>  | RAM utilisée en bytes                          |
| **`threshold`**     | <code>number</code>  | Seuil critique du système en bytes             |
| **`isLowMemory`**   | <code>boolean</code> | `true` si la mémoire est faible                |
| **`totalRamMB`**    | <code>number</code>  | RAM totale en MB                               |
| **`availableRamMB`** | <code>number</code>  | RAM disponible en MB                           |
| **`usedRamMB`**     | <code>number</code>  | RAM utilisée en MB                             |
| **`thresholdMB`**   | <code>number</code>  | Seuil critique en MB                           |
| **`usedPercentage`** | <code>number</code>  | Pourcentage d'utilisation (0-100)             |
| **`status`**        | <code>string</code>  | Statut textuel: "OK" ou "LOW"                 |

</docgen-api>

### Exemple

```typescript
import { CapacitorRAMInfo } from 'capacitor-ram-info';

async function verifierMemoire() {
  try {
    const memory = await CapacitorRAMInfo.getMemoryInfo();
    
    // Informations de base
    console.log(`📱 RAM: ${memory.usedRamMB}/${memory.totalRamMB} MB (${memory.usedPercentage}%)`);
    
    // Vérifications
    if (memory.isLowMemory) {
      console.warn('⚠️ Mémoire faible détectée!');
    }
    
    if (memory.usedPercentage > 85) {
      console.warn('🚨 Utilisation mémoire critique');
    }
    
    return memory;
  } catch (error) {
    console.error('Erreur lors de la récupération des infos RAM:', error);
  }
}
```

### Monitoring temps réel

```typescript
// Monitoring toutes les 2 secondes
const monitor = setInterval(async () => {
  const memory = await CapacitorRAMInfo.getMemoryInfo();
  
  console.log(`[${new Date().toLocaleTimeString()}] RAM: ${memory.usedRamMB}MB (${memory.usedPercentage}%)`);
  
  // Arrêter si mémoire critique
  if (memory.usedPercentage > 90) {
    clearInterval(monitor);
    console.error('🚨 Mémoire critique - arrêt du monitoring');
  }
}, 2000);
```

### Cas d'usage

- 🔍 **Debug d'applications** : Identifier les fuites mémoire
- 📊 **Monitoring** : Surveiller l'utilisation RAM en temps réel  
- ⚡ **Optimisation** : Adapter le comportement selon la RAM disponible
- 🚨 **Alertes** : Prévenir l'utilisateur en cas de mémoire faible
- 📱 **Test de devices** : Comparer les performances entre appareils

### Dépannage

#### Plugin non reconnu
```bash
# Nettoyer et resynchroniser
npx cap clean android
npx cap sync android
```

#### Erreur de compilation Android
Vérifiez que les fichiers Java sont bien présents dans :
```
android/src/main/java/fr/ics/plugins/capacitor/ram_info/
├── CapacitorRAMInfo.java
└── CapacitorRAMInfoPlugin.java
```

---

## 🇬🇧 English documentation

### Features

- ✅ Total system RAM
- ✅ Used and available RAM
- ✅ Usage percentage
- ✅ Low memory status
- ✅ System critical threshold
- ✅ Android only compatibility
- ✅ TypeScript support

### Installation

```bash
npm install https://github.com/jbertomeuics/capacitor-ram-info.git
npx cap sync
```

Or with a specific version:

```bash
npm install https://github.com/jbertomeuics/capacitor-ram-info.git#v1.0.0
npx cap sync
```

### Usage

```typescript
import { CapacitorRAMInfo } from 'capacitor-ram-info';

// Get RAM information
const ramInfo = await CapacitorRAMInfo.getMemoryInfo();

console.log('Total RAM:', ramInfo.totalRamMB, 'MB');
console.log('Used RAM:', ramInfo.usedRamMB, 'MB');
console.log('Available RAM:', ramInfo.availableRamMB, 'MB');
console.log('Usage:', ramInfo.usedPercentage, '%');
console.log('Low memory?', ramInfo.isLowMemory);
```

### API Reference

#### getMemoryInfo()

```typescript
getMemoryInfo() => Promise<MemoryInfo>
```

Retrieves detailed system memory information.

**Returns:** <code>Promise&lt;<a href="#memoryinfo">MemoryInfo</a>&gt;</code>

--------------------

#### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

Test function to verify plugin functionality.

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

### MemoryInfo Interface

| Prop                | Type                 | Description                                    |
| ------------------- | -------------------- | ---------------------------------------------- |
| **`totalRam`**      | <code>number</code>  | Total RAM in bytes                             |
| **`availableRam`**  | <code>number</code>  | Available RAM in bytes                         |
| **`usedRam`**       | <code>number</code>  | Used RAM in bytes                              |
| **`threshold`**     | <code>number</code>  | System critical threshold in bytes             |
| **`isLowMemory`**   | <code>boolean</code> | `true` if memory is low                        |
| **`totalRamMB`**    | <code>number</code>  | Total RAM in MB                                |
| **`availableRamMB`** | <code>number</code>  | Available RAM in MB                            |
| **`usedRamMB`**     | <code>number</code>  | Used RAM in MB                                 |
| **`thresholdMB`**   | <code>number</code>  | Critical threshold in MB                       |
| **`usedPercentage`** | <code>number</code>  | Usage percentage (0-100)                       |
| **`status`**        | <code>string</code>  | Text status: "OK" or "LOW"                     |

### Example

```typescript
import { CapacitorRAMInfo } from 'capacitor-ram-info';

async function checkMemoryStatus() {
  try {
    const memory = await CapacitorRAMInfo.getMemoryInfo();
    
    // Basic information
    console.log(`📱 RAM: ${memory.usedRamMB}/${memory.totalRamMB} MB (${memory.usedPercentage}%)`);
    
    // Checks
    if (memory.isLowMemory) {
      console.warn('⚠️ Low memory detected!');
    }
    
    if (memory.usedPercentage > 85) {
      console.warn('🚨 Critical memory usage');
    }
    
    return memory;
  } catch (error) {
    console.error('Error retrieving RAM info:', error);
  }
}
```

### Real-time monitoring

```typescript
// Monitor every 2 seconds
const monitor = setInterval(async () => {
  const memory = await CapacitorRAMInfo.getMemoryInfo();
  
  console.log(`[${new Date().toLocaleTimeString()}] RAM: ${memory.usedRamMB}MB (${memory.usedPercentage}%)`);
  
  // Stop if critical memory
  if (memory.usedPercentage > 90) {
    clearInterval(monitor);
    console.error('🚨 Critical memory - stopping monitoring');
  }
}, 2000);
```

### Use Cases

- 🔍 **App debugging**: Identify memory leaks
- 📊 **Monitoring**: Real-time RAM usage surveillance  
- ⚡ **Optimization**: Adapt behavior based on available RAM
- 🚨 **Alerts**: Warn users about low memory
- 📱 **Device testing**: Compare performance between devices

### Troubleshooting

#### Plugin not recognized
```bash
# Clean and resync
npx cap clean android
npx cap sync android
```

#### Android compilation error
Check that Java files are present in:
```
android/src/main/java/fr/ics/plugins/capacitor/ram_info/
├── CapacitorRAMInfo.java
└── CapacitorRAMInfoPlugin.java
```

---

## Platforms

| Platform | Support |
|----------|---------|
| Android  | ✅      |
| iOS      | ❌      |
| Web      | ❌      |

> **Note:** This plugin uses Android's `ActivityManager.getMemoryInfo()` and is only compatible with the Android platform.

## Development

To contribute or modify the plugin:

```bash
# Clone the repo
git clone https://github.com/jbertomeuics/capacitor-ram-info.git
cd capacitor-ram-info

# Install dependencies
npm install

# Build
npm run build

# Test with example app
cd example-app
npm install
npx cap sync android
npx cap open android
```

## License

MIT

---

Made with ❤️ for debugging those pesky Samsung memory issues! 📱🔧