using Data.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Stripe;
using Stripe.Checkout;
using Microsoft.Extensions.Options;
using Services.Interfaces;
using Models.AppSettings;
using Models.Domain.StripeProducts;
using Data;
using System.Data;
using Models.Requests.Stripe;
using System.Data.SqlClient;


namespace Sabio.Services
{
    public class StripeService : IStripeService
    {
        IDataProvider _data = null;
        private AppKeys _appKeys = null;
        private HostUrl _hostUrl = null;
        IBaseUserMapper _userMapper = null;

        public StripeService(IDataProvider data, IOptions<AppKeys> appKeys, IOptions<HostUrl> hostUrl, IBaseUserMapper userMapper)
        {
            _data = data;
            _appKeys = appKeys.Value;
            _hostUrl = hostUrl.Value;
            _userMapper = userMapper;
            StripeConfiguration.ApiKey = _appKeys.StripeAppSecretKey;
        }

        public string NewSession()
        {

            StripeConfiguration.ApiKey = _appKeys.StripeAppSecretKey;
            string domain = _hostUrl.Url;

            SessionCreateOptions options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    Price = "price_1MvWfeAlPGZiw6bDHIZBeFRf",
                    Quantity = 1,
                  },
                },
                Mode = "payment",
                SuccessUrl = domain + "/order/success?sessionId={CHECKOUT_SESSION_ID}",
                CancelUrl = domain + "/order?canceled=true",
            };

            SessionService service = new SessionService();
            Session session = service.Create(options);


            return session.Id;
        }
        public string NewSessionSubscription(StripeSubscriptionRequest model)
        {

            StripeConfiguration.ApiKey = _appKeys.StripeAppSecretKey;
            string domain = _hostUrl.Url;

            SessionCreateOptions options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID 
                    Price = model.PriceId,
                    Quantity = 1,
                  },
                },
                Mode = "subscription",
                SuccessUrl = domain + "/order/success?sessionId={CHECKOUT_SESSION_ID}",
                CancelUrl = $"{domain}/pricing",
            };

            SessionService service = new SessionService();
            Session session = service.Create(options);
            return session.Id;
        }
        public List<StripeProduct> GetAllProducts()
        {
            List<StripeProduct> list = null;

            string procName = "[dbo].[StripeProducts_SelectAll]";
            _data.ExecuteCmd(procName,
            (param) =>
            {
            }, (reader, recordSetIndex) =>
            {
                int index = 0;

                StripeProduct product = MapStripeProduct(reader, ref index);

                if (list == null)
                {
                    list = new List<StripeProduct>();
                }

                list.Add(product);
            });

            return list;
        }
        public string AddSubscription(SubscriptionAddRequest model, int userId)
        {

            SessionService service1 = new SessionService();
            Session session = service1.Get(model.SessionId);
            string sessionId = session.Id;
            string subscriptionId = session.SubscriptionId;

            SubscriptionService service2 = new SubscriptionService();
            Subscription subscritionObj = service2.Get(subscriptionId);
            string customerId = subscritionObj.CustomerId;
            string productId = subscritionObj.Items.Data.First().Price.ProductId;

            List<StripeProduct> products = GetAllProducts();
            StripeProduct result = products.Find((product) => product.ProductId == productId);
            int stripeProductId = result.Id;

            int id = 0;
            string procName = "[dbo].[Subscriptions_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@SessionId", sessionId);
                    coll.AddWithValue("@SubscriptionId", subscriptionId);
                    coll.AddWithValue("@StripeProductId", stripeProductId);
                    coll.AddWithValue("@UserId", userId);
                    coll.AddWithValue("@CustomerId", customerId);

                    //output parameter
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    coll.Add(idOut);

                },
                returnParameters: delegate (SqlParameterCollection returnColl)
                {
                    object oId = returnColl["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });

            if (id != 0)
            {
                return session.SubscriptionId;
            }
            else
            {
                return null;
            }

        }
        public void UpdateSubscription(StripeSubscriptionRequest model, int userId)
        {
            SubscriptionService subscriptionService = new SubscriptionService();

            // get subcriptionId from DB
            StripeSubscription stripeSubscription = GetSubscriptionByUserId(userId);
            string subscriptionId = stripeSubscription.SubscriptionId;

            // get official subObj from stripe subscription service
            Subscription subscription = subscriptionService.Get(subscriptionId);
            // update stripe
            var options = new SubscriptionUpdateOptions
            {
                CancelAtPeriodEnd = false,
                ProrationBehavior = "create_prorations",
                Items = new List<SubscriptionItemOptions>
                {
                    new SubscriptionItemOptions
                    {
                        Id = subscription.Items.Data[0].Id,
                        Price = model.PriceId,
                    },
                },
            };
            subscription = subscriptionService.Update(subscription.Id, options);

            string procName = "[dbo].[Subscriptions_UpdateByUserId]";

            List<StripeProduct> products = GetAllProducts();
            StripeProduct result = products.Find((product) => product.PriceId == model.PriceId);
            int stripeProductId = result.Id;
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@UserId", userId);
                    coll.AddWithValue("@StripeProductId", stripeProductId);
                },
                returnParameters: null);

        }
        public StripeSubscription GetSubscriptionById(int id)
        {
            StripeSubscription subscription = null;

            string procName = "[dbo].[Subscriptions_Select_ById]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int index = 0;

                subscription = MapSubscription(reader, ref index);
            }
           );

            return subscription;
        }
        public Invoice GetInvoiceFromSubscription(string subscriptionId)
        {
            Invoice invoice = null;

            SubscriptionService service = new SubscriptionService();
            Subscription subscritionObj = service.Get(subscriptionId);

            InvoiceService invoiceService = new InvoiceService();
            invoice = invoiceService.Get(subscritionObj.LatestInvoiceId);

            return invoice;
        }
        public Invoice GetUpcomingInvoiceFromUserId(int userId)
        {

            StripeSubscription stripeSubscription = GetSubscriptionByUserId(userId);
            InvoiceService invoiceService = new InvoiceService();
            UpcomingInvoiceOptions options = new UpcomingInvoiceOptions
            {
                Customer = stripeSubscription.CustomerId,
            };
            Invoice invoice = invoiceService.Upcoming(options);
            return invoice;

        }
        public StripeSubscription GetSubscriptionBySessionId(string sessionId)
        {
            StripeSubscription subscription = null;

            string procName = "[dbo].[Subscriptions_Select_BySessionId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@SessionId", sessionId);

            }, delegate (IDataReader reader, short set)
            {
                int index = 0;

                subscription = MapSubscription(reader, ref index);
            }
           );

            return subscription;
        }
        public StripeSubscription GetSubscriptionByUserId(int userId)
        {
            StripeSubscription subscription = null;

            string procName = "[dbo].[Subscriptions_Select_ByUserId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@UserId", userId);

            }, delegate (IDataReader reader, short set)
            {
                int index = 0;

                subscription = MapSubscription(reader, ref index);
            }
           );

            return subscription;
        }
        private static StripeProduct MapStripeProduct(IDataReader reader, ref int index)
        {
            StripeProduct product = new StripeProduct();

            product.Id = reader.GetSafeInt32(index++);
            product.ProductId = reader.GetSafeString(index++);
            product.PriceId = reader.GetSafeString(index++);
            product.Amount = reader.GetSafeDouble(index++);
            product.Name = reader.GetSafeString(index++);

            return product;
        }
        private StripeSubscription MapSubscription(IDataReader reader, ref int index)
        {
            StripeSubscription subscription = new StripeSubscription();

            subscription.Id = reader.GetSafeInt32(index++);
            subscription.SessionId = reader.GetSafeString(index++);
            subscription.SubscriptionId = reader.GetSafeString(index++);
            subscription.Product = MapStripeProduct(reader, ref index);
            subscription.User = _userMapper.MapUser(reader, ref index);
            subscription.CustomerId = reader.GetSafeString(index++);
            subscription.Status = reader.GetSafeBool(index++);
            subscription.DateCreated = reader.GetSafeDateTime(index++);

            return subscription;

        }
    }
}
