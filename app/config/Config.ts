const isDevelopment = __DEV__;

export const Config = {
  API_BASE_URL: isDevelopment 
    ? 'http://localhost:3000' 
    : 'https://miaudote-api-bngbbec8f0evabex.brazilsouth-01.azurewebsites.net',
}; 