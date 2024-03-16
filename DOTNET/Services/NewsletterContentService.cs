using Data;
using Data.Providers;
using Models.Domain;
using Models.Domain.Newsletters;
using Models.Requests.NewsletterContents;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class NewsletterContentService : INewsletterContentService
    {
        private IDataProvider _data;
        private IBaseUserMapper _userMapper;
        private ILookUpService _lookupMapper;
        public NewsletterContentService(IDataProvider data, IBaseUserMapper userMapper, ILookUpService lookUpMapper)
        {
            _data = data;
            _userMapper = userMapper;
            _lookupMapper = lookUpMapper;
        }

        public List<NewsletterContent> GetByNewsletter(int newsletterId)
        {
            List<NewsletterContent> list = null;
            string procName = "[dbo].[NewsletterContent_Select_ByNewsletterId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@NewsletterId", newsletterId);

            }, delegate (IDataReader reader, short set)
            {
                int index = 0;
                NewsletterContent content = MapSingleContent(reader, ref index);

                if (list == null)
                {
                    list = new List<NewsletterContent>();
                }
                list.Add(content);
            });

            return list;
        }

        public int Add(NewsletterContentAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[NewsletterContent_Insert]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection param)
            {
                AddCommonParams(model, param);
                param.AddWithValue("@UserId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                param.Add(idOut);
            }, delegate (SqlParameterCollection param)
            {
                object idObj = param["@Id"].Value;
                int.TryParse(idObj.ToString(), out id);
            });

            return id;
        }

        public void Update(NewsletterContentUpdateRequest model)
        {
            string procName = "[dbo].[NewsletterContent_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                AddCommonParams(model, param);
                param.AddWithValue("@Id", model.Id);

            }, returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[NewsletterContent_Delete_ById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@Id", id);
            }, returnParameters: null);
        }

        private static void AddCommonParams(NewsletterContentAddRequest model, SqlParameterCollection param)
        {
            param.AddWithValue("@TemplateKeyId", model.TemplateKeyId);
            param.AddWithValue("@NewsletterId", model.NewsletterId);
            param.AddWithValue("@Value", model.Value);
        }

        private NewsletterContent MapSingleContent(IDataReader reader, ref int index)
        {
            NewsletterContent content = new NewsletterContent();
            content.ContentId = reader.GetSafeInt32(index++);

            NewsletterKey templateKey = new NewsletterKey();
            templateKey.KeyId = reader.GetSafeInt32(index++);
            templateKey.KeyName = reader.GetSafeString(index++);
            templateKey.TemplateId = reader.GetSafeInt32(index++);

            templateKey.Type = _lookupMapper.MapSingleLookUp(reader, ref index);
            content.TemplateKey = templateKey;

            content.NewsletterId = reader.GetSafeInt32(index++);
            content.Value = reader.GetSafeString(index++);
            content.DateCreated = reader.GetSafeDateTime(index++);
            content.DateModified = reader.GetSafeDateTime(index++);
            content.CreatedBy = _userMapper.MapUser(reader, ref index);
            return content;
        }
    }
}
