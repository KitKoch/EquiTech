using Google.Apis.AnalyticsReporting.v4.Data;
using Models.Requests.GoogleReportRequest;

namespace Services.Interfaces
{
    public interface IGoogleAnalyticsReportService
    {
        GetReportsResponse GetAnalyticsReport(GoogleGetReportRequest model);
    }
}