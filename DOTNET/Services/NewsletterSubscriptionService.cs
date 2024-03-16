using Data;
using Data.Providers;
using Models;
using Models.Domain.NewsletterSubscriptions;
using Models.Requests.NewsletterSubscriptions;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class NewsletterSubscriptionService : INewsletterSubscriptionService
    {
        IDataProvider _data = null;

        public NewsletterSubscriptionService(IDataProvider data)
        {
            _data = data;
        }

        public void AddNewsletterSubscription(NewsletterSubscriptionAddRequest model)
        {
            string procName = "[dbo].[NewsletterSubscriptions_Insert]";

            _data.ExecuteNonQuery(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                }
                , returnParameters: null
            );
        }

        public void UpdateNewsletterSubscription(NewsletterSubscriptionAddRequest model)
        {
            string procName = "[dbo].[NewsletterSubscriptions_UpdateIsSubscribed]";

            _data.ExecuteNonQuery(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                }
                , returnParameters: null
            );
        }

        public NewsletterSubscription GetSubscriptionByEmail(string email)
        {
            string procName = "[dbo].[NewsletterSubscriptions_SelectByEmail]";

            NewsletterSubscription newsletterSubscription = null;

            _data.ExecuteCmd(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Email", email);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    newsletterSubscription = MapSingleElement(reader, ref index);
                }
            );

            return newsletterSubscription;
        }

        public Paged<NewsletterSubscription> GetAllNewsletterSubscriptions(int filterMode, int pageIndex, int pageSize)
        {
            Paged<NewsletterSubscription> pagedList = null;
            int totalCount = 0;

            string procName = "[dbo].[NewsletterSubscriptions_SelectAll_Paginated]";

            List<NewsletterSubscription> list = null;

            _data.ExecuteCmd(
                storedProc: procName
                , inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@FilterMode", filterMode);
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    NewsletterSubscription newsletterSubscription = MapSingleElement(reader, ref index);
                    if (totalCount == 0)
                        totalCount = reader.GetSafeInt32(index++);
                    if (list == null)
                        list = new List<NewsletterSubscription>();
                    list.Add(newsletterSubscription);
                }
            );
            if (list != null)
            {
                pagedList = new Paged<NewsletterSubscription>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<string> GetSubscriberEmails()
        {
            List<string> subscriberEmails = null;

            string procName = "[dbo].[NewsletterSubscriptions_SelectAll_Subscribed]";

            _data.ExecuteCmd(
                storedProc: procName
                , inputParamMapper: null
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    string newsletterSubscription = reader.GetSafeString(0);

                    if (subscriberEmails == null)
                        subscriberEmails = new List<string>();
                    subscriberEmails.Add(newsletterSubscription);
                }
            );
            return subscriberEmails;
        }

        private static void AddCommonParams(NewsletterSubscriptionAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@IsSubscribed", model.IsSubscribed);
        }

        private static NewsletterSubscription MapSingleElement(IDataReader reader, ref int index)
        {
            NewsletterSubscription newsletterSubscription = new NewsletterSubscription();

            newsletterSubscription.Email = reader.GetSafeString(index++);
            newsletterSubscription.IsSubscribed = reader.GetSafeBool(index++);
            newsletterSubscription.DateCreated = reader.GetSafeDateTime(index++);
            newsletterSubscription.DateModified = reader.GetSafeDateTime(index++);

            return newsletterSubscription;
        }

    }
}
