using Api.Interfaces;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Http;
using Newtonsoft.Json;
<<<<<<< HEAD
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using System.Net.Http;
using System.Text;
using Api.DTO;
=======
using System.Net.Http;
using System.Text;
>>>>>>> 37744e4 (i added firebse cloud messaging)

public class FcmService : IFcmService
{
    private readonly HttpClient _httpClient;
    private readonly string _fcmEndpoint = "https://fcm.googleapis.com/v1/projects/lifepadi-17e8c/messages:send";
    private readonly GoogleCredential _googleCredential;
<<<<<<< HEAD
    private readonly FirebaseApp _firebaseApp;
=======
>>>>>>> 37744e4 (i added firebse cloud messaging)

    public FcmService()
    {
        _httpClient = new HttpClient(new HttpClientHandler());
        _googleCredential = GoogleCredential
            .FromFile("lifepadi-17e8c-firebase.json")
            .CreateScoped("https://www.googleapis.com/auth/firebase.messaging");
<<<<<<< HEAD

=======
>>>>>>> 37744e4 (i added firebse cloud messaging)
    }

    public async Task<string> SendNotificationAsync(string targetToken, string title, string body)
    {
        var accessToken = await _googleCredential.UnderlyingCredential.GetAccessTokenForRequestAsync();

        var message = new
        {
            message = new
            {
                token = targetToken,
                notification = new
                {
                    title = title,
                    body = body
                }
            }
        };

        var jsonMessage = JsonConvert.SerializeObject(message);
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri(_fcmEndpoint),
            Headers =
            {
                { "Authorization", $"Bearer {accessToken}" }
            },
            Content = new StringContent(jsonMessage, Encoding.UTF8, "application/json")
        };

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    public async Task SendTopicNotificationAsync(string topic, string title, string body)
    {
        var token = await _googleCredential.UnderlyingCredential.GetAccessTokenForRequestAsync();

        var notification = new
        {
            message = new
            {
                topic = topic,
                notification = new
                {
                    title = title,
                    body = body
                }
            }
        };

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri(_fcmEndpoint),
            Content = new StringContent(System.Text.Json.JsonSerializer.Serialize(notification), Encoding.UTF8, "application/json"),
<<<<<<< HEAD

        };

        request.Headers.Add("Authorization", $"Bearer {token}");

=======
            Headers =
            {
                { "Authorization", $"Bearer {token}" }
            }
        };

>>>>>>> 37744e4 (i added firebse cloud messaging)
        var response = await _httpClient.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {
            Console.WriteLine("Notification sent successfully.");
        }
        else
        {
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Error sending notification: {responseBody}");
        }
    }
<<<<<<< HEAD


    public async Task<object> SendGeneralNotification(NotificationRequest message)
    {

        try
        {
            Message fcmMessage = new Message()
            {
                Topic = message.Topic,
                Notification = new FirebaseAdmin.Messaging.Notification()
                {
                    Title = message.Title,
                    Body = message.Body
                }
            };

            var response = await FirebaseMessaging.DefaultInstance.SendAsync(fcmMessage);
            return new { success = "Message sent successfully", message = response };
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }

    public async Task<object> SendRiderLocation(RiderLocation location)
    {

        try
        {
            Message fcmMessage = new Message()
            {
                Topic = $"Tracking-{location.RiderId}",
                Data = new Dictionary<string, string>
        {
            { "Latitude", location.Latitude.ToString()! },
            { "Longitude", location.Longitude.ToString()! },
            { "RiderId", location.RiderId! }
        }
            };

            var response = await FirebaseMessaging.DefaultInstance.SendAsync(fcmMessage);
            return new { success = "Message sent successfully", message = response };
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }
=======
>>>>>>> 37744e4 (i added firebse cloud messaging)
}