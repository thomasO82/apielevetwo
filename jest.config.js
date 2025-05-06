module.exports = {
    // Environnement de test
    testEnvironment: 'node',
    
    // Timeout des tests
    testTimeout: 30000,
    
    // Configuration des chemins de test
    roots: ['<rootDir>/tests'],
    
    // Pattern des fichiers de test
    testMatch: [
        '**/tests/unit/**/*.test.js',
        '**/tests/integration/**/*.test.js'
    ],

    // Variables d'environnement pour les tests
    setupFiles: ['<rootDir>/tests/setup.js']
}; 