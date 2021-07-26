export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  maxWorkers: 1,
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)']
};