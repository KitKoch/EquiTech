using Models;
using System.Collections.Generic;
using Data.Providers;
using Models.Domain.SiteReferences;
using System.Data.SqlClient;
using System.Data;
using Data;
using Services.Interfaces;
using Models.Domain;
using System;

namespace Services
{
    public class SiteReferencesService : ISiteReferencesService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        public SiteReferencesService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }
        public int AddSiteRef(int currentUserId, int referenceTypeId)
        {
            string procName = "[dbo].[SiteReferences_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                SiteRefParams(col, referenceTypeId);
                col.AddWithValue("@UserId", currentUserId);
            }, returnParameters: null);
            return currentUserId;
        }

        public Paged<SiteReference> SiteRefPaged(int pageIndex, int pageSize)
        {
            Paged<SiteReference> pagedList = null;
            List<SiteReference> list = null;
            int totalCount = 0;
            _data.ExecuteCmd(
                "[dbo].[SiteReferences_SelectAll]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    SiteReference siteReferencce = MapSiteReference(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<SiteReference>();
                    }
                    list.Add(siteReferencce);
                });
            if (list != null)
            {
                pagedList = new Paged<SiteReference>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<SiteReferencesData> GetSiteReferencesData()
        {
            List<SiteReferencesData> list = null;

            string procName = "[dbo].[SiteReferences_SelectByCount]";

            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    SiteReferencesData chart = MapSiteReferenceData(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<SiteReferencesData>();
                    }

                    list.Add(chart);
                });
            return list;
        }

        public List<SiteReferencesData> GetSiteReferencesDataByDate(DateTime date1, DateTime date2)
        {
            List<SiteReferencesData> list = null;

            string procName = "[dbo].[SiteReferences_SelectByDates]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@Date1", date1);
                param.AddWithValue("@Date2", date2);
            },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    SiteReferencesData chart = MapSiteReferenceData(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<SiteReferencesData>();
                    }

                    list.Add(chart);
                });
            return list;
        }
        private static void SiteRefParams(SqlParameterCollection col, int referenceTypeId)
        {
            col.AddWithValue("@RefTypeId", referenceTypeId);
        }

        public SiteReference MapSiteReference(IDataReader reader, ref int startingIndex)
        {
            SiteReference siteRef = new SiteReference();
            siteRef.ReferenceType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            siteRef.UserId = reader.GetSafeInt32(startingIndex++);
            return siteRef;
        }

        public SiteReferencesData MapSiteReferenceData(IDataReader reader, ref int startingIndex)
        {
            SiteReferencesData chart = new SiteReferencesData();
            chart.ReferenceType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            chart.TotalCount = reader.GetSafeInt32(startingIndex++);
            return chart;
        }
    }
}
