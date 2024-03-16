using Data;
using Data.Providers;
using Models.Domain;
using Models.Domain.UsersEducationLevels;
using Models.Requests.Locations;
using Models.Requests.UsersEducationLevels;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class DegreeService : IDegreeService
    {
        IDataProvider _data;
        public DegreeService(IDataProvider data)
        {
            _data = data;
        }

        public void BatchInsert(List<string> degrees)
        {
            string procName = "[dbo].[Degrees_Insert]";
            DataTable batchDegrees = MapSingleDegree(degrees);

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@BatchDegrees", batchDegrees);
                },
                returnParameters: null
                );
        }

        public DataTable MapSingleDegree(List<string> degreesToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Name", typeof(string));

            foreach (string singleDegree in degreesToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleDegree);
                dt.Rows.Add(dr);
            }
            return dt;
        }
    }
}
