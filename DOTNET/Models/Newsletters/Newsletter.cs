using Models.Domain.NewsletterSubscriptions;
using System;
using System.Collections.Generic;

namespace Models.Domain.Newsletters
{
    public class Newsletter
    {
        public int Id { get; set; }
        public NewsletterTemplate Template { get; set; }
        public LookUp Category { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string CoverPhoto { get; set; }
        public bool isSubscribed { get; set; }
        public List<NewsletterContent> Contents { get; set; }
        public DateTime DatoToPublish { get; set; }
        public DateTime DateToExpire { get; set; }
        public List<NewsletterSubscription> Subscriptions { get; set; }
        public DateTime DatoCreated { get; set; }
        public DateTime DateModified { get; set; }
        public BaseUser CreatedBy { get; set; }
    }
}
