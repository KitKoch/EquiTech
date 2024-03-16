using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Models.AppSettings;
using Models.Domain.Videochat;
using Models.Requests.Ratings;
using Models.Requests.Videochat;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class VideochatService : IVideochatService
    {
        private readonly HttpClient _httpClient;
        IDataProvider _data = null;
        private AppKeys _appKey = null;

        public VideochatService(IDataProvider data, IOptions<AppKeys> appKey)
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.daily.co/v1/");
            _data = data;
            _appKey = appKey.Value;
        }

        public async Task<Room> CreateVideoChatRoom(RoomAddRequest model)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _appKey.DailyVideoChatKey);
                string uri = "rooms/";

                var now = Math.Floor(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds);
                var expirationTime = now + model.Properties.Exp;

                var privacy = model.Privacy == 1 ? "public" : "private";

                var body = new
                {
                    name = model.Name,
                    privacy = privacy,
                    properties = new
                    {
                        start_audio_off = model.Properties.StartAudioOff,
                        start_video_off = model.Properties.StartVideoOff,
                        enable_chat = model.Properties.EnableChat,
                        exp = expirationTime
                    }
                };

                var response = await _httpClient.PostAsJsonAsync(uri, body);
                var result = await response.Content.ReadAsStringAsync();
                var resultJson = JsonConvert.DeserializeObject<Room>(result);

                return resultJson;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Meeting> GetMeetingById(string meetingId)
        {
            string apiUrl = $"meetings/{meetingId}";

            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    Meeting meeting = JsonConvert.DeserializeObject<Meeting>(responseData);
                    return meeting;
                }
                else
                {
                    throw new Exception($"API request failed with status code {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve meeting details", ex);
            }
        }
    }
}
