﻿using Models;
using Models.Domain.Organizations;
using Models.Requests.OrganizationRequests;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IOrganizationService
    {
        void DeleteOrgLoc(int organizationId, int locationId);
        OrganizationLocations GetOrgLoc(int organizationId);
        Paged<OrganizationLocations> GetOrgLocPage(int pageIndex, int pageSize, string nameQuery, int orgTypeId);
        void AddOrgLoc(int locationId, int userId, int organizationId);
        int Add(OrganizationAddRequest model, int userId);
        void Delete(int id);
        Organization GetOrg(int id);
        Paged<Organization> AllOrganizations(int pageIndex, int pageSize);
        void Update(OrganizationsUpdateRequest model, int UserId);
        Paged<Organization> SearchCurrent(int pageIndex, int pageSize, int query);
        void UpdateValidation(OrganizationUpdateValidation model);
        Organization GetOrganization(int userId);
        List<Organization> GetAll();
        int AddOrgLocBridge(OrgLocBridgeAddRequest model, int userId);
    }
}