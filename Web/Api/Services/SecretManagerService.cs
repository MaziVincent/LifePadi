using Google.Cloud.SecretManager.V1;
using Google.Api.Gax.ResourceNames;

namespace Api.Services
{
    public class SecretManagerService
    {
        private readonly SecretManagerServiceClient _client;
        private readonly string _projectId;
        private readonly ILogger<SecretManagerService> _logger;

        public SecretManagerService(ILogger<SecretManagerService> logger)
        {
            _logger = logger;
            _client = SecretManagerServiceClient.Create();
            
            // Get project ID from environment variable or metadata server
            _projectId = Environment.GetEnvironmentVariable("GOOGLE_CLOUD_PROJECT") ?? 
                        Environment.GetEnvironmentVariable("GCP_PROJECT") ?? 
                        GetProjectIdFromMetadata();
        }

        /// <summary>
        /// Loads environment variables from a secret stored in Google Cloud Secret Manager
        /// The secret should contain the .env file content
        /// </summary>
        /// <param name="secretName">The name of the secret containing the .env file</param>
        /// <param name="version">The version of the secret (default: "latest")</param>
        public async Task LoadEnvironmentVariablesFromSecretAsync(string secretName, string version = "latest")
        {
            try
            {
                _logger.LogInformation($"Loading environment variables from secret: {secretName}");

                // Build the resource name
                var secretVersionName = new SecretVersionName(_projectId, secretName, version);

                // Access the secret version
                var response = await _client.AccessSecretVersionAsync(secretVersionName);
                
                // Get the secret payload
                var secretPayload = response.Payload.Data.ToStringUtf8();
                
                // Parse the .env content and set environment variables
                ParseAndSetEnvironmentVariables(secretPayload);
                
                _logger.LogInformation($"Successfully loaded environment variables from secret: {secretName}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to load environment variables from secret: {secretName}");
                throw;
            }
        }

        /// <summary>
        /// Gets a specific secret value from Google Cloud Secret Manager
        /// </summary>
        /// <param name="secretName">The name of the secret</param>
        /// <param name="version">The version of the secret (default: "latest")</param>
        /// <returns>The secret value as string</returns>
        public async Task<string> GetSecretAsync(string secretName, string version = "latest")
        {
            try
            {
                var secretVersionName = new SecretVersionName(_projectId, secretName, version);
                var response = await _client.AccessSecretVersionAsync(secretVersionName);
                return response.Payload.Data.ToStringUtf8();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to get secret: {secretName}");
                throw;
            }
        }

        /// <summary>
        /// Parses .env file content and sets environment variables
        /// </summary>
        /// <param name="envContent">The content of the .env file</param>
        private void ParseAndSetEnvironmentVariables(string envContent)
        {
            if (string.IsNullOrEmpty(envContent))
            {
                _logger.LogWarning("Environment content is empty");
                return;
            }

            var lines = envContent.Split('\n', StringSplitOptions.RemoveEmptyEntries);
            var loadedCount = 0;

            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();
                
                // Skip empty lines and comments
                if (string.IsNullOrEmpty(trimmedLine) || trimmedLine.StartsWith('#'))
                    continue;

                // Find the first equals sign
                var equalIndex = trimmedLine.IndexOf('=');
                if (equalIndex <= 0)
                    continue;

                var key = trimmedLine.Substring(0, equalIndex).Trim();
                var value = trimmedLine.Substring(equalIndex + 1).Trim();

                // Remove quotes if present
                if (value.StartsWith('"') && value.EndsWith('"'))
                {
                    value = value.Substring(1, value.Length - 2);
                }
                else if (value.StartsWith('\'') && value.EndsWith('\''))
                {
                    value = value.Substring(1, value.Length - 2);
                }

                // Only set if not already set (environment variables take precedence)
                if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable(key)))
                {
                    Environment.SetEnvironmentVariable(key, value);
                    loadedCount++;
                    _logger.LogDebug($"Set environment variable: {key}");
                }
                else
                {
                    _logger.LogDebug($"Environment variable already set, skipping: {key}");
                }
            }

            _logger.LogInformation($"Loaded {loadedCount} environment variables from secret");
        }

        /// <summary>
        /// Gets the project ID from the metadata server (when running on Google Cloud)
        /// </summary>
        /// <returns>The project ID</returns>
        private string GetProjectIdFromMetadata()
        {
            try
            {
                using var client = new HttpClient();
                client.DefaultRequestHeaders.Add("Metadata-Flavor", "Google");
                var response = client.GetAsync("http://metadata.google.internal/computeMetadata/v1/project/project-id").Result;
                
                if (response.IsSuccessStatusCode)
                {
                    return response.Content.ReadAsStringAsync().Result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to get project ID from metadata server");
            }

            throw new InvalidOperationException("Could not determine Google Cloud project ID. Please set GOOGLE_CLOUD_PROJECT environment variable.");
        }
    }
}
