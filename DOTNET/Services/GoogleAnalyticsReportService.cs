﻿using Google.Apis.AnalyticsReporting.v4;
using Google.Apis.AnalyticsReporting.v4.Data;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Http;
using Google.Apis.Services;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Models.Domain.GoogleAnalytics;
using Models.Requests.GoogleReportRequest;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class GoogleAnalyticsReportService : IGoogleAnalyticsReportService
    {
        private ServiceAccountCred _acc;
        private GoogleCredential _credential;
        private AnalyticsReportingService _client;

        public GoogleAnalyticsReportService(IOptions<ServiceAccountCred> acc)
        {
            _acc = acc.Value;
            string keyPath = Path.Combine("fairly-383317-ab50cd65ecf7.json");
            _credential = GoogleCredential.FromFile(keyPath).CreateScoped(new[] { AnalyticsReportingService.Scope.AnalyticsReadonly });
            _client = new AnalyticsReportingService(
                new BaseClientService.Initializer
                {
                    HttpClientInitializer = _credential
                }
                );
        }

        public GetReportsResponse GetAnalyticsReport(GoogleGetReportRequest model)
        {
            string viewIdPath = Path.Combine("fairly-383317-ab50cd65ecf7.json");
            string file = File.ReadAllText(viewIdPath);
            dynamic jsonFile = JsonConvert.DeserializeObject(file);

            string viewId = jsonFile.ViewId;

            ReportRequest reportRequest = new ReportRequest
            {
                ViewId = viewId,
                DateRanges = new List<DateRange>
                {
                    new DateRange
                    {
                        StartDate = model.StartDate,
                        EndDate = model.EndDate,
                    }
                },
                Dimensions = model.Dimensions,
                Metrics = model.Metrics,
                OrderBys = model.OrderBy,
            };

            List<ReportRequest> requests = new List<ReportRequest>();
            requests.Add(reportRequest);

            GetReportsRequest getReport = new GetReportsRequest() { ReportRequests = requests };
            GetReportsResponse response = _client.Reports.BatchGet(getReport).Execute();

            return response;
        }
    }
}