# capacitor-ram-info

🚀 Plugin Capacitor pour récupérer les informations mémoire du device Android.

## Features

- ✅ RAM totale du système
- ✅ RAM utilisée et disponible
- ✅ Pourcentage d'utilisation
- ✅ Statut de mémoire faible (Low Memory)
- ✅ Seuil critique du système
- ✅ Compatible Android uniquement
- ✅ TypeScript support

## Install

```bash
npm install https://github.com/jbertomeuics/capacitor-ram-info.git
npx cap sync
```

Ou avec une version spécifique :

```bash
npm install https://github.com/jbertomeuics/capacitor-ram-info.git#v1.0.0
npx cap sync
```

## Usage

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

## API

<docgen-index>

* [`getMemoryInfo()`](#getmemoryinfo)
* [`echo(...)`](#echo)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getMemoryInfo()

```typescript
getMemoryInfo() => Promise<MemoryInfo>
```

Récupère les informations détaillées sur la mémoire du système.

**Returns:** <code>Promise&lt;<a href="#memoryinfo">MemoryInfo</a>&gt;</code>

--------------------

### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

Fonction de test pour vérifier que le plugin fonctionne.

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------

## Interfaces

### MemoryInfo

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

## Example

```typescript
import { CapacitorRAMInfo } from 'capacitor-ram-info';

async function checkMemoryStatus() {
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
    
    // Valeurs brutes pour debug
    console.log('Raw values:', {
      total: memory.totalRam,
      available: memory.availableRam,
      threshold: memory.threshold
    });
    
    return memory;
  } catch (error) {
    console.error('Erreur lors de la récupération des infos RAM:', error);
  }
}
```

## Monitoring en temps réel

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

// Arrêter le monitoring après 30 secondes
setTimeout(() => clearInterval(monitor), 30000);
```

## Platforms

| Platform | Support |
|----------|---------|
| Android  | ✅      |
| iOS      | ❌      |
| Web      | ❌      |

> **Note:** Ce plugin utilise `ActivityManager.getMemoryInfo()` d'Android et n'est donc compatible qu'avec la plateforme Android.

## Use Cases

- 🔍 **Debug d'applications** : Identifier les fuites mémoire
- 📊 **Monitoring** : Surveiller l'utilisation RAM en temps réel  
- ⚡ **Optimisation** : Adapter le comportement selon la RAM disponible
- 🚨 **Alertes** : Prévenir l'utilisateur en cas de mémoire faible
- 📱 **Device testing** : Comparer les performances entre appareils

## Troubleshooting

### Plugin non reconnu
```bash
# Nettoyer et resynchroniser
npx cap clean android
npx cap sync android
```

### Erreur de compilation Android
Vérifiez que les fichiers Java sont bien présents dans :
```
android/src/main/java/fr/ics/plugins/capacitor/ram_info/
├── CapacitorRAMInfo.java
└── CapacitorRAMInfoPlugin.java
```

## Development

Pour contribuer ou modifier le plugin :

```bash
# Cloner le repo
git clone https://github.com/jbertomeuics/capacitor-ram-info.git
cd capacitor-ram-info

# Installer les dépendances
npm install

# Build
npm run build

# Tester avec l'app d'exemple
cd example-app
npm install
npx cap sync android
npx cap open android
```

## License

MIT

---

Made with ❤️ for debugging those pesky Samsung memory issues! 📱🔧