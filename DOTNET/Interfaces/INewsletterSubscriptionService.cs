using Models;
using Models.Domain.NewsletterSubscriptions;
using Models.Requests.NewsletterSubscriptions;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface INewsletterSubscriptionService
    {
        void AddNewsletterSubscription(NewsletterSubscriptionAddRequest model);

        Paged<NewsletterSubscription> GetAllNewsletterSubscriptions(int filterMode, int pageIndex, int pageSize);

        List<string> GetSubscriberEmails();

        NewsletterSubscription GetSubscriptionByEmail(string email);

        void UpdateNewsletterSubscription(NewsletterSubscriptionAddRequest model);

    }
}