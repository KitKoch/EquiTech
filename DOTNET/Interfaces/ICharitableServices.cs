using Models;
using Models.Domain.CharitableFunds;
using Models.Requests.CharitableFunds;
using System;
using System.Collections.Generic;

namespace Services
{
    public interface ICharitableServices
    {
        int AddDonation(DonationAddRequest model, int userId);
        int AddCharitableFund(CharitableFundAddRequest model, int userId);
        void UpdateCharitableFund(CharitableFundUpdateRequest model);
        void DeleteCharitableFund(CharitableFundDeleteRequest model);
        CharitableFund GetFundById(int fundId);
        List<Donation> GetDonationByCharity(int charityId);
        List<Donation> GetDonationByDateRange(DateTime startDate, DateTime endDate);
        List<CharitableFund> GetFundByCreatedBy(int createdBy);
        Paged<Donation> GetDonationsByCreatedBy(int pageIndex, int pageSize, int createdBy);
        Paged<CharitableFund> GetAllCharitableFunds(int pageIndex, int pageSize);
    }
}