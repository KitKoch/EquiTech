using Data.Providers;
using Models.Requests.Locations;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Domain.Videochat;
using Data;
using Models.Domain;
using Models;
using Models.Requests.Videochat;
using Services.Interfaces;

namespace Services
{
    public class VideochatStatisticsService : IVideochatStatisticsService
    {

        IDataProvider _data = null;
        IBaseUserMapper _baseUserMapper = null;

        public VideochatStatisticsService(IDataProvider data, IBaseUserMapper baseUserMapper)
        {
            _data = data;
            _baseUserMapper = baseUserMapper;
        }

        public Statistics Get(int id)
        {
            string procName = "[dbo].[DailyMeetings_SelectById]";
            Statistics statistics = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    statistics = MapSingleLocation(reader, ref index);
                }
                );

            return statistics;
        }

        public Paged<Statistics> GetByCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Statistics> pagedlist = null;
            List<Statistics> list = null;
            int totalCount = 0;
            string procName = "[dbo].[DailyMeetings_SelectByCreatedBy]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@PageIndex", pageIndex);
                    paramColl.AddWithValue("@PageSize", pageSize);
                    paramColl.AddWithValue("@CreatedBy", createdBy);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Statistics aStatistic = MapSingleLocation(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<Statistics>();
                    }

                    list.Add(aStatistic);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<Statistics>(list, pageIndex, pageSize, totalCount);
            }


            return pagedlist;
        }

        public Paged<Statistics> GetPaginated(int pageIndex, int pageSize)
        {
            Paged<Statistics> pagedlist = null;
            List<Statistics> list = null;
            int totalCount = 0;
            string procName = "[dbo].[DailyMeetings_SelectAll]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper:
                delegate (SqlParameterCollection paramColl)
                {
                    paramColl.AddWithValue("@PageIndex", pageIndex);
                    paramColl.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Statistics aStatistic = MapSingleLocation(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<Statistics>();
                    }

                    list.Add(aStatistic);
                }
                );
            if (list != null)
            {
                pagedlist = new Paged<Statistics>(list, pageIndex, pageSize, totalCount);
            }


            return pagedlist;
        }

        public int Add(StatisticsAddRequest statistics)
        {
            int id = 0;
            string procName = "[dbo].[DailyMeetings_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddCommonParams(statistics, coll);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    coll.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
                );

            return id;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[DailyMeetings_DeleteById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }

        public int AddParticipants(MeetingParticipantsAddRequest statistics)
        {
            int id = 0;
            string procName = "[dbo].[MeetingParticipants_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@DailyMeetingId", statistics.DailyMeetingId);
                    coll.AddWithValue("@UserId", statistics.UserId);
                    coll.AddWithValue("@Duration", statistics.Duration);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    coll.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
                );

            return id;
        }

        private static void AddCommonParams(StatisticsAddRequest statistics, SqlParameterCollection coll)
        {
            coll.AddWithValue("@HostId", statistics.HostId);
            coll.AddWithValue("@DailyId", statistics.DailyId);
            coll.AddWithValue("@RoomName", statistics.RoomName);
            coll.AddWithValue("@Duration", statistics.Duration);
        }


        private static Statistics MapSingleLocation(IDataReader reader, ref int startingIndex)
        {
            Statistics aStatistic = new Statistics();

            aStatistic.Id = reader.GetSafeInt32(startingIndex++);
            aStatistic.HostId = reader.GetSafeInt32(startingIndex++);
            aStatistic.DailyId = reader.GetSafeString(startingIndex++);
            aStatistic.RoomName = reader.GetSafeString(startingIndex++);
            aStatistic.Duration = reader.GetSafeInt32(startingIndex++);
            aStatistic.StartTime = reader.GetSafeDateTime(startingIndex++);
            aStatistic.ParticipantId = reader.GetSafeInt32(startingIndex++);

            return aStatistic;
        }

    }
}
