using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Newsletters;
using Models.Requests.NewsletterTemplates;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Services
{
    public class NewsletterTemplateService : INewsletterTemplateService, INewsletterTemplateMapperService
    {
        private IDataProvider _data;
        private IBaseUserMapper _baseUserMapper;
        public NewsletterTemplateService(IDataProvider data, IBaseUserMapper userMapper)
        {
            _data = data;
            _baseUserMapper = userMapper;
        }

        public Paged<NewsletterTemplate> GetAll(int pageIndex, int pageSize)
        {
            Paged<NewsletterTemplate> pagedItems = null;
            List<NewsletterTemplate> list = null;
            int totalCount = 0;

            string procName = "[dbo].[NewsletterTemplates_SelectAll_V2]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                NewsletterTemplate template = MapSingleTemplate(reader, ref index);
                totalCount = reader.GetSafeInt32(index);

                if (list == null)
                {
                    list = new List<NewsletterTemplate>();
                }
                list.Add(template);
            });
            if (list != null)
            {
                pagedItems = new Paged<NewsletterTemplate>(list, pageIndex, pageSize, totalCount);
            }

            return pagedItems;
        }

        public int Add(NewsletterTemplateAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[NewsletterTemplates_Insert]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@userId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, delegate (SqlParameterCollection param)
            {
                object idObj = param["@Id"].Value;
                int.TryParse(idObj.ToString(), out id);
            });

            return id;
        }

        public void Update(NewsletterTemplateUpdateRequest model)
        {
            string procName = "[dbo].[NewsletterTemplates_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                AddCommonParams(model, param);
                param.AddWithValue("@Id", model.Id);
            }, returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[NewsletterTemplates_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@Id", id);
            }, returnParameters: null);
        }

        private static void AddCommonParams(NewsletterTemplateAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@PrimaryImage", model.PrimaryImage);
        }

        public NewsletterTemplate MapSingleTemplate(IDataReader reader, ref int index)
        {
            NewsletterTemplate template = new NewsletterTemplate();
            template.TemplateId = reader.GetSafeInt32(index++);
            template.Name = reader.GetSafeString(index++);
            template.Description = reader.GetSafeString(index++);
            template.PrimaryImage = reader.GetSafeString(index++);
            template.DateCreated = reader.GetSafeDateTime(index++);
            template.DateModified = reader.GetSafeDateTime(index++);
            template.CreatedBy = _baseUserMapper.MapUser(reader, ref index);
            template.TemplateKeys = reader.DeserializeObject<List<NewsletterKey>>(index++);
            return template;
        }
    }
}
