using Models.Domain.StripeProducts;
using Models.Requests.Stripe;
using Stripe;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Services.Interfaces
{
    public interface IStripeService
    {
        string NewSession();
        string NewSessionSubscription(StripeSubscriptionRequest model);
        string AddSubscription(SubscriptionAddRequest model, int userId);
        void UpdateSubscription(StripeSubscriptionRequest model, int userId);
        List<StripeProduct> GetAllProducts();
        StripeSubscription GetSubscriptionById(int Id);
        Invoice GetInvoiceFromSubscription(string subscriptionId);
        Invoice GetUpcomingInvoiceFromUserId(int userId);
        StripeSubscription GetSubscriptionBySessionId(string sessionId);
        StripeSubscription GetSubscriptionByUserId(int userId);
    }
}