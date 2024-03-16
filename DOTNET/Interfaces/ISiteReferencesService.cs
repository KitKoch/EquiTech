using Models;
using Models.Domain.SiteReferences;
using System;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface ISiteReferencesService
    {
        int AddSiteRef(int currentUserId, int referenceTypeId);
        List<SiteReferencesData> GetSiteReferencesData();
        List<SiteReferencesData> GetSiteReferencesDataByDate(DateTime date1, DateTime date2);
        Paged<SiteReference> SiteRefPaged(int pageIndex, int pageSize);
    }
}