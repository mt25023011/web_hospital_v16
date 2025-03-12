module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    setupFilesAfterEnv: ['./jest.setup.js']
}; 