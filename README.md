# Guide d'Installation et Configuration des Tests avec Jest

## 1. Installation des Dépendances

```bash
npm install --save-dev jest                    # Installation de Jest
npm install --save-dev supertest               # Pour les tests d'API
npm install --save-dev mongodb-memory-server   # Pour la base de données en mémoire
npm install --save-dev @babel/core             # Pour la transpilation si nécessaire
npm install --save-dev @babel/preset-env
```

## 2. Configuration de l'Environnement

### a) Créer le fichier `jest.config.js` à la racine du projet :

```javascript
module.exports = {
    testEnvironment: 'node',
    testTimeout: 10000,
    rootDir: './',
    testMatch: [
        "**/tests/**/*.test.js"
    ],
    verbose: true
};
```

### b) Modifier `package.json` pour ajouter le script de test :

```json
{
  "scripts": {
    "test": "jest --detectOpenHandles"
  }
}
```

## 3. Structure des Tests

Créer la structure de dossiers suivante :

```
/tests
  /unit                    # Pour les tests unitaires
    /controllers
    /models
  /integration            # Pour les tests d'intégration
    /controllers
    /routes
```

## 4. Configuration de MongoDB Memory Server

Dans vos fichiers de test d'intégration, ajoutez :

```javascript
const { MongoMemoryServer } = require('mongodb-memory-server');

beforeAll(async () => {
    // Déconnexion de toute instance MongoDB existante
    await mongoose.disconnect();
    
    // Création d'une nouvelle instance MongoDB en mémoire
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connexion à la base de données de test
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
```

## 5. Lancement des Tests

- Pour lancer tous les tests :

  ```bash
  npm test
  ```

- Pour lancer un fichier de test spécifique :

  ```bash
  npm test -- tests/integration/controllers/schoolController.test.js
  ```

- Pour lancer les tests en mode watch (relance automatique) :

  ```bash
  npm test -- --watch
  ```

## 6. Bonnes Pratiques

- Toujours nettoyer la base de données après chaque test
- Utiliser `beforeEach()` pour préparer les données de test
- Mocker les services externes (email, etc.)
- Utiliser des `try/catch` pour gérer les erreurs
- Vérifier les codes de statut HTTP dans les tests d'API
- Ajouter des commentaires explicatifs

## 7. Dépannage Courant

- Si les tests ne se terminent pas : ajouter `--detectOpenHandles`
- Si MongoDB ne se ferme pas : utiliser `{ force: true }` dans `mongoServer.stop()`
- Si les tests sont lents : augmenter `testTimeout` dans `jest.config.js`
- Si erreur "Jest did not exit" : vérifier la fermeture des connexions

## 8. Commandes Utiles

- Voir la couverture de code :

  ```bash
  npm test -- --coverage
  ```

- Nettoyer le cache de Jest :

  ```bash
  npm test -- --clearCache
  ```

- Debug des tests :

  ```bash
  node --inspect-brk node_modules/.bin/jest --runInBand
  ```

## 9. Variables d'Environnement

Créer un fichier `.env.test` pour les tests.

```
NODE_ENV=test
PORT=3001
MONGOURI=mongodb://localhost:27017/test
```

