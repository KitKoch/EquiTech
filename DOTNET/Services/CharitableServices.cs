using Data.Providers;
using Models.Requests.FAQ;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Requests.CharitableFunds;
using Models.Domain;
using Models.Requests.Users;
using Models;
using Models.Domain.CharitableFunds;
using Data;
using System.Drawing.Printing;

namespace Services
{
    public class CharitableServices : ICharitableServices
    {
        IDataProvider _data = null;
        IBaseUserMapper _userMapper = null;

        public CharitableServices(IDataProvider data, IBaseUserMapper mapper)
        {
            _data = data;
            _userMapper = mapper;

        }

        public int AddDonation(DonationAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Donations_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    DonationAddCommonParams(model, userId, collection);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object old = returnCollection["@Id"].Value;
                    int.TryParse(old.ToString(), out id);
                });
            return id;
        }

        public int AddCharitableFund(CharitableFundAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[CharitableFunds_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    CharitableFundAddCommonParams(model, collection);
                    collection.AddWithValue("@CreatedBy", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object old = returnCollection["@Id"].Value;
                    int.TryParse(old.ToString(), out id);
                });
            return id;
        }

        public void UpdateCharitableFund(CharitableFundUpdateRequest model)
        {
            string procName = "[dbo].[CharitableFunds_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    CharitableFundAddCommonParams(model, collection);
                    collection.AddWithValue("@Id", model.Id);
                },
                 returnParameters: null);
        }

        public void DeleteCharitableFund(CharitableFundDeleteRequest model)
        {
            string procName = "[dbo].[CharitableFunds_Delete]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", model.Id);
                    collection.AddWithValue("@IsDeleted", model.IsDeleted);
                },
                 returnParameters: null);
        }

        public CharitableFund GetFundById(int fundId)
        {
            string procName = "[dbo].[CharitableFunds_Select_ById]";
            CharitableFund charitableFund = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", fundId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    charitableFund = FundSingleRecordMapper(reader, ref startingIndex);

                });
            return charitableFund;
        }

        public List<Donation> GetDonationByCharity(int charityId)
        {
            string procName = "[dbo].[Donations_Select_ByCharityId]";
            List<Donation> list = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@CharityId", charityId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Donation donation = DonationSingleRecordMapper(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<Donation>();
                    }
                    list.Add(donation);
                });
            return list;
        }

        public List<Donation> GetDonationByDateRange(DateTime startDate, DateTime endDate)
        {
            string procName = "[dbo].[Donations_Select_ByDateRange]";
            List<Donation> list = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@StartDate", startDate);
                    paramCol.AddWithValue("@EndDate", endDate);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Donation donation = DonationSingleRecordMapper(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<Donation>();
                    }
                    list.Add(donation);
                });
            return list;
        }

        public Paged<Donation> GetDonationsByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            string procName = "[dbo].[Donations_Select_ByCreatedBy_Paginated]";
            List<Donation> list = null;
            Paged<Donation> paged = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@PageIndex", pageIndex);
                    paramCol.AddWithValue("@PageSize", pageSize);
                    paramCol.AddWithValue("@CreatedById", createdBy);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Donation donation = DonationSingleRecordMapper(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Donation>();
                    }
                    list.Add(donation);
                });
            if (list != null)
            {
                paged = new Paged<Donation>(list, pageIndex, pageSize, totalCount);
            }
            return paged;
        }

        public List<CharitableFund> GetFundByCreatedBy(int createdBy)
        {
            string procName = "[dbo].[CharitableFunds_Select_ByCreatedBy]";
            List<CharitableFund> list = null;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@CreatedBy", createdBy);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    CharitableFund charitableFund = FundSingleRecordMapper(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<CharitableFund>();
                    }
                    list.Add(charitableFund);
                });
            return list;
        }

        public Paged<CharitableFund> GetAllCharitableFunds(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[CharitableFunds_SelectAll_Paginated]";
            List<CharitableFund> list = null;
            Paged<CharitableFund> paged = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@PageIndex", pageIndex);
                    paramCol.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    CharitableFund charitableFund = FundSingleRecordMapper(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<CharitableFund>();
                    }
                    list.Add(charitableFund);
                });
            if (list != null)
            {
                paged = new Paged<CharitableFund>(list, pageIndex, pageSize, totalCount);
            }
            return paged;
        }

        private Donation DonationSingleRecordMapper(IDataReader reader, ref int startingIndex)
        {
            Donation donation = new Donation();
            BaseCharitableFund charitableFund = new BaseCharitableFund();

            donation.Id = reader.GetSafeInt32(startingIndex++);
            charitableFund.Id = reader.GetSafeInt32(startingIndex++);
            charitableFund.Name = reader.GetSafeString(startingIndex++);
            charitableFund.Description = reader.GetSafeString(startingIndex++);
            charitableFund.Url = reader.GetSafeString(startingIndex++);
            donation.CharitableFund = charitableFund;
            donation.OrderId = reader.GetSafeString(startingIndex++);
            donation.UnitCost = reader.GetSafeInt32(startingIndex++);
            donation.CreatedBy = _userMapper.MapUser(reader, ref startingIndex);
            donation.DateCreated = reader.GetSafeDateTime(startingIndex++);
            return donation;
        }

        private CharitableFund FundSingleRecordMapper(IDataReader reader, ref int startingIndex)
        {
            CharitableFund charitableFund = new CharitableFund();

            charitableFund.Id = reader.GetSafeInt32(startingIndex++);
            charitableFund.Name = reader.GetSafeString(startingIndex++);
            charitableFund.Description = reader.GetSafeString(startingIndex++);
            charitableFund.Url = reader.GetSafeString(startingIndex++);
            charitableFund.DateCreated = reader.GetSafeDateTime(startingIndex++);
            charitableFund.DateModified = reader.GetSafeDateTime(startingIndex++);
            charitableFund.IsDeleted = reader.GetSafeBool(startingIndex++);
            charitableFund.CreatedBy = _userMapper.MapUser(reader, ref startingIndex);
            return charitableFund;
        }

        private static void DonationAddCommonParams(DonationAddRequest model, int userId, SqlParameterCollection collection)
        {
            collection.AddWithValue("@CharitableFundId", model.CharitableFundId);
            collection.AddWithValue("@OrderId", model.OrderId);
            collection.AddWithValue("@UnitCost", model.UnitCost);
            collection.AddWithValue("@CreatedBy", userId);
        }

        private static void CharitableFundAddCommonParams(CharitableFundAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Name", model.Name);
            collection.AddWithValue("@Description", model.Description);
            collection.AddWithValue("@Url", model.Url);
        }

    }
}
