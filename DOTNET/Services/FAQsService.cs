using Data;
using Data.Providers;
using Models.Domain;
using Models.Domain.FAQ;
using Models.Requests.Example;
using Models.Requests.FAQ;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Services
{
    public class FAQsService : IFAQsService
    {
        IDataProvider _data = null;

        ILookUpService _lookUpService = null;

        public FAQsService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public int Add(FAQAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[FAQs_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    collection.AddWithValue("@userId", userId);
                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object old = returnCollection["@Id"].Value;

                    int.TryParse(old.ToString(), out id);
                });
            return id;
        }

        private static void AddCommonParams(FAQAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Questions", model.Question);
            collection.AddWithValue("@Answer", model.Answer);
            collection.AddWithValue("@CategoryId", model.CategoryId);
            collection.AddWithValue("@SortOrder", model.SortOrder);
        }

        public void Update(FAQUpdateRequest model, int userId)
        {
            string procName = "[dbo].[FAQs_Update]";
            _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(model, collection);
                collection.AddWithValue("@userId", userId);
                collection.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }
        public List<FAQ> GetAll()
        {
            string procName = "[dbo].[FAQs_SelectAll]";

            List<FAQ> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null,
               singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;

                    FAQ aFAQ = MapSingleFAQ(reader, ref index);

                    if (list == null)
                    {
                        list = new List<FAQ>();
                    }

                    list.Add(aFAQ);
                });
            return list;
        }

        public List<FAQ> GetByCategory(int categoryId)
        {
            string procName = "[dbo].[FAQs_Select_ByCategoryId]";

            List<FAQ> list = null;

            _data.ExecuteCmd(procName,
                    delegate (SqlParameterCollection paramCollection)
                    {
                        paramCollection.AddWithValue("@Id", categoryId);
                    },
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        int index = 0;

                        FAQ aFAQ = MapSingleFAQ(reader, ref index);

                        if (list == null)
                        {
                            list = new List<FAQ>();
                        }

                        list.Add(aFAQ);
                    });
            return list;
        }

        public void Delete(int Id)
        {
            string procName = "[dbo].[FAQs_Delete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", Id);
            },
        returnParameters: null);
        }
        public FAQ MapSingleFAQ(IDataReader reader, ref int startingIndex)
        {
            FAQ anFAQ = new FAQ();
            anFAQ.Category = new LookUp();

            anFAQ.Id = reader.GetInt32(startingIndex++);
            anFAQ.Question = reader.GetSafeString(startingIndex++);
            anFAQ.Answer = reader.GetSafeString(startingIndex++);
            anFAQ.Category = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            anFAQ.SortOrder = reader.GetSafeInt32(startingIndex++);
            anFAQ.DateCreated = reader.GetSafeDateTime(startingIndex++);
            anFAQ.DateModified = reader.GetSafeDateTime(startingIndex++);

            return anFAQ;
        }
    };
};
