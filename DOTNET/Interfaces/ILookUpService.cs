using Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface ILookUpService
    {
        List<LookUp> GetLookUp(string tableName);
        Dictionary<string, List<LookUp>> GetMany(string[] tableNames);
        List<LookUp3Col> GetLookUp3Col(string tableName);
        LookUp MapSingleLookUp(IDataReader reader, ref int startingIndex);
        LookUp3Col MapLookUp3Col(IDataReader reader, ref int startingIndex);
    }
}
