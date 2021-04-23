module.exports = {
    roots: ["<rootDir>/dist"],
    setupFiles: ["superTests.ts"],
    testRegex: `spec.js$`,
    testPathIgnorePatterns: ["/node_modules/"]
}