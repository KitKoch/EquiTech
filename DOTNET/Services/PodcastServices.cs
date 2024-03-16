using Amazon.Runtime.Internal.Transform;
using Data;
using Data.Providers;
using Models;
using Models.Domain;
using Models.Domain.Blogs;
using Models.Domain.Podcasts;
using Models.Requests.Podcasts;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    public class PodcastServices : IPodcastServices
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        IBaseUserMapper _baseUserMapper = null;
        public PodcastServices(IDataProvider data, ILookUpService lookUpService, IBaseUserMapper mapper)
        {
            _data = data;
            _lookUpService = lookUpService;
            _baseUserMapper = mapper;
        }
        public int AddPodcast(PodcastAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Podcasts_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    PodcastParams(model, coll, userId);
                    coll.AddWithValue("@CreatedBy", userId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    coll.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnColl)
                {
                    object oId = returnColl["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });
            return id;
        }

        public Paged<Podcast> GetPodcastPaged(int pageIndex, int pageSize)
        {
            Paged<Podcast> pagedList = null;
            List<Podcast> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Podcasts_SelectAll_Page]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Podcast podcast = MapPodcast(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Podcast>();
                    }
                    list.Add(podcast);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Podcast>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public List<Podcast> GetAllPodcast()
        {
            List<Podcast> list = null;
            string procName = "[dbo].[Podcasts_SelectAll]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            { }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int idx = 0;
                Podcast podcast = new Podcast();
                podcast = MapPodcast(reader, ref idx);

                if (list == null)
                {
                    list = new List<Podcast>();
                }
                list.Add(podcast);
            }
          );
            return list;
        }

        public Paged<Podcast> GetPodcastSearch(int pageIndex, int pageSize, string query)
        {
            Paged<Podcast> pagedList = null;
            List<Podcast> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Podcasts_Search_Page]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Podcast podcast = MapPodcast(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Podcast>();
                    }
                    list.Add(podcast);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Podcast>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Podcast> GetPodcastCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Podcast> pagedList = null;
            List<Podcast> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Podcasts_SelectbyCreatedBy_Page]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@UserId", createdBy);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Podcast podcast = MapPodcast(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Podcast>();
                    }
                    list.Add(podcast);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Podcast>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void Update(PodcastUpdateRequest model, int userId, int id)
        {
            string procName = "[dbo].[Podcasts_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                PodcastParams(model, col, userId);

            }, returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Podcasts_Delete]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);

            }, returnParameters: null);
        }

        public Podcast MapPodcast(IDataReader reader, ref int startingIndex)
        {

            Podcast podcast = new Podcast();
            podcast.Id = reader.GetInt32(startingIndex++);
            podcast.Title = reader.GetString(startingIndex++);
            podcast.Description = reader.GetString(startingIndex++);
            podcast.Url = reader.GetString(startingIndex++);
            podcast.PodcastType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            podcast.CoverImageUrl = reader.GetString(startingIndex++);
            podcast.DateCreated = reader.GetDateTime(startingIndex++);
            podcast.DateModified = reader.GetDateTime(startingIndex++);
            podcast.CreatedBy = _baseUserMapper.MapUser(reader, ref startingIndex);
            podcast.ModifiedBy = reader.GetInt32(startingIndex++);
            return podcast;
        }

        public static void PodcastParams(PodcastAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Url", model.Url);
            col.AddWithValue("@PodcastTypeId", model.PodcastTypeId);
            col.AddWithValue("@CoverImageUrl", model.CoverImageUrl);
            col.AddWithValue("@ModifiedBy", userId);
        }
    }
}
