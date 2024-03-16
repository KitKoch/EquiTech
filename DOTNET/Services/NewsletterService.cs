using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Blogs;
using Models.Domain.Newsletters;
using Models.Requests.Newsletters;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace Services
{
    public class NewsletterService : INewsletterService
    {
        private IDataProvider _data;
        private ILookUpService _lookUpService;
        private INewsletterTemplateMapperService _templateMapper;
        private IBaseUserMapper _userMapper;
        public NewsletterService(IDataProvider data, ILookUpService lookUpService, INewsletterTemplateMapperService templateMapper, IBaseUserMapper userMapper)
        {
            _data = data;
            _lookUpService = lookUpService;
            _templateMapper = templateMapper;
            _userMapper = userMapper;
        }

        public Paged<Newsletter> GetAll(int pageIndex, int pageSize)
        {
            Paged<Newsletter> pagedList = null;
            List<Newsletter> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Newsletters_SelectAll_V4]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Newsletter newsletter = MapSingleNewsletter(reader, ref index);
                totalCount = reader.GetSafeInt32(index);

                if (list == null)
                {
                    list = new List<Newsletter>();
                }
                list.Add(newsletter);
            });
            if (list != null)
            {
                pagedList = new Paged<Newsletter>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public List<Newsletter> GetByCategory(int categoryId)
        {
            List<Newsletter> list = null;

            string procName = "[dbo].[Newsletters_Select_ByCategoryId_V4]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@CategoryId", categoryId);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;
                Newsletter newsletter = MapSingleNewsletter(reader, ref index);

                if (list == null)
                {
                    list = new List<Newsletter>();
                }
                list.Add(newsletter);
            });

            return list;
        }

        public Paged<Newsletter> PaginationNewsletterType(int pageIndex, int pageSize, int categoryId)
        {
            Paged<Newsletter> pagedList = null;
            List<Newsletter> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[Newsletters_Select_ByCategoryId_PaginateV2]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@CategoryId", categoryId);
                },
                (reader, recordSetIndex) =>
                {
                    int index = 0;
                    Newsletter newsletter = MapSingleNewsletter(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);

                    }

                    if (list == null)
                    {
                        list = new List<Newsletter>();
                    }
                    list.Add(newsletter);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Newsletter>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public int Add(NewsletterAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Newsletters_Insert_V2]";
            DataTable batchContents = mapContentsTable(model.Contents);
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@BatchContents", batchContents);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection reader)
            {
                object idObj = reader["@Id"].Value;
                int.TryParse(idObj.ToString(), out id);
            });

            return id;
        }

        public void Update(NewsletterUpdateRequest model)
        {
            string procName = "[dbo].[Newsletters_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);

            }, returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Newsletters_Delete_ById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            }, returnParameters: null);
        }

        private static void AddCommonParams(NewsletterAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@TemplateId", model.TemplateId);
            col.AddWithValue("@CategoryId", model.CategoryId);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@CoverPhoto", model.CoverPhoto);
            col.AddWithValue("@IsSubscribed", model.isSubscribed);
            col.AddWithValue("@DateToPublish", model.DateToPublish);
            col.AddWithValue("@DateToExpire", model.DateToExpire);
        }

        private Newsletter MapSingleNewsletter(IDataReader reader, ref int index)
        {
            Newsletter newsletter = new Newsletter();
            newsletter.Category = new LookUp();

            newsletter.Id = reader.GetSafeInt32(index++);
            newsletter.Template = _templateMapper.MapSingleTemplate(reader, ref index);
            newsletter.Category = _lookUpService.MapSingleLookUp(reader, ref index);
            newsletter.Description = reader.GetSafeString(index++);
            newsletter.Name = reader.GetSafeString(index++);
            newsletter.CoverPhoto = reader.GetSafeString(index++);
            newsletter.isSubscribed = reader.GetSafeBool(index++);
            newsletter.Contents = reader.DeserializeObject<List<NewsletterContent>>(index++);
            newsletter.DatoToPublish = reader.GetSafeDateTime(index++);
            newsletter.DateToExpire = reader.GetSafeDateTime(index++);
            newsletter.DatoCreated = reader.GetSafeDateTime(index++);
            newsletter.DateModified = reader.GetSafeDateTime(index++);
            newsletter.CreatedBy = _userMapper.MapUser(reader, ref index);
            return newsletter;
        }

        private DataTable mapContentsTable(List<ContentAddRequest> contents)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Value", typeof(string));
            table.Columns.Add("TemplateKeyId", typeof(int));

            foreach (ContentAddRequest singleContent in contents)
            {
                if (singleContent.Content != null)
                {
                    DataRow row = table.NewRow();
                    int index = 0;

                    row.SetField(index++, singleContent.Content);
                    row.SetField(index++, singleContent.KeyId);
                    table.Rows.Add(row);
                }
            }
            return table;
        }
    }
}
