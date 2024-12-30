public class FcmMessage
{
    public string Topic { get; set; }
    public Notification Notification { get; set; }

    public FcmMessage(string topic, string title, string body)
    {
        Topic = topic;
        Notification = new Notification { Title = title, Body = body };
    }
}

public class Notification
{
    public string? Title { get; set; }
    public string? Body { get; set; }
}