using Data;
using Data.Providers;
using Models.Domain.Locations;
using Models.Domain;
using Models.Domain.OrganizationMembers;
using Models.Domain.Organizations;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Domain.Skills;
using Models;
using Models.Requests.OrganizationMembersRequest;
using Models.Domain.Schools;
using Google.Apis.AnalyticsReporting.v4.Data;
using Services.Interfaces;
using Models.Requests.InviteMembers;

namespace Services
{
    public class OrganizationMemberService : IOrganizationMemberService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        IInviteService _inviteService = null;
        IEmailSenderService _emailService = null;
        public OrganizationMemberService(IDataProvider data, ILookUpService lookUp, IInviteService invite, IEmailSenderService emailService)
        {
            _data = data;
            _lookUpService = lookUp;
            _inviteService = invite;
            _emailService = emailService;
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[OrganizationMembers_Delete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }
            , returnParameters: null);
        }
        public void UpdateOrgMember(OrganizationMemberUpdateRequest model)
        {
            string procName = "[dbo].[OrganizationMembers_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
            }
            , returnParameters: null);
        }
        public int AddOrgMember(OrganizationMemberAddRequest model)
        {
            int id = 0;
            string procName = "[dbo].[OrganizationMembers_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });
            return id;
        }

        public Dictionary<string, int> InviteOrgMember(InviteMembersAddRequest model, int userId, int orgId)
        {
            Dictionary<string, int> keyValuePairs = new Dictionary<string, int>();
            OrgMemberUserCheck user = GetUserCheck(model.Email);
            if (user == null)
            {
                int inviteId = 0;
                model.OrganizationId = orgId;
                inviteId = _inviteService.Add(model, userId);
                keyValuePairs.Add("invite", inviteId);
                return keyValuePairs;
            }
            else if (user.InviteEmail != null)
            {
                throw new Exception("User invite already exist. Please use a different Email");
            }
            else if (user.OrganizationId != 0)
            {
                throw new Exception("User is a member of another Organization. Cannot add to your Organization");
            }
            else
            {
                OrganizationMemberAddRequest addUser = MapMemberInviteToOrgMemberAdd(model, orgId, user.Id);
                int orgMemberId = AddOrgMember(addUser);
                keyValuePairs.Add("orgMember", orgMemberId);
                List<OrganizationMemberV2> orgData = SelectAllByOrgId(orgId);
                _emailService.SendExistingUserInviteEmail(orgData, orgMemberId, userId);
                return keyValuePairs;
            }
        }

        private OrgMemberUserCheck GetUserCheck(string email)
        {
            string procName = "[dbo].[OrganizationMembers_SelectAll_UserCheck]";
            OrgMemberUserCheck user = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection param)
            {
                param.AddWithValue("@Email", email);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                user = MapFullUserCheck(reader, ref startingIndex);
            }
            );
            return user;
        }
        public List<OrganizationMemberV2> SelectAllByOrgId(int oId)
        {
            List<OrganizationMemberV2> list = null;
            string procName = "[dbo].[OrganizationMembers_SelectAll_ByOrgId]";
            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@OrgId", oId);
            },
            (reader, recordSetIndex) =>
            {
                int counter = 0;
                OrganizationMemberV2 orgMembers = SingleOrgMemberMapperV2(reader, ref counter);
                if (list == null)
                {
                    list = new List<OrganizationMemberV2>();
                }
                list.Add(orgMembers);
            }
            );
            return list;
        }
        public Paged<OrganizationMemberV2> ByOrgByNameByEmail(int pageIndex, int pageSize, string query = "")
        {
            Paged<OrganizationMemberV2> pagedList = null;
            List<OrganizationMemberV2> list = null;
            int totalCount = 0;
            string procName = "[dbo].[OrganizationMembers_Select_ByOrgByEmailByName]";
            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@Query", query);
            },
            (reader, recordSetIndex) =>
            {
                int counter = 0;
                OrganizationMemberV2 orgMembers = SingleOrgMemberMapperV2(reader, ref counter);
                totalCount = reader.GetSafeInt32(counter++);
                if (list == null)
                {
                    list = new List<OrganizationMemberV2>();
                }
                list.Add(orgMembers);
            }
            );
            if (list != null)
            {
                pagedList = new Paged<OrganizationMemberV2>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<OrganizationMemberV2> ByOrgId(int pageIndex, int pageSize, int query)
        {
            Paged<OrganizationMemberV2> pagedList = null;
            List<OrganizationMemberV2> list = null;
            int totalCount = 0;
            string procName = "[dbo].[OrganizationMembers_Select_ByOrgId]";
            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@Query", query);
            },
            (reader, recordSetIndex) =>
            {
                int counter = 0;
                OrganizationMemberV2 orgMembers = SingleOrgMemberMapperV2(reader, ref counter);
                totalCount = reader.GetSafeInt32(counter++);
                if (list == null)
                {
                    list = new List<OrganizationMemberV2>();
                }
                list.Add(orgMembers);
            }
            );
            if (list != null)
            {
                pagedList = new Paged<OrganizationMemberV2>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public OrganizationMember GetOrgMember(int id)
        {
            string procName = "[dbo].[OrganizationMembers_SelectById]";
            OrganizationMember orgMember = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndx = 0;
                orgMember = SingleOrgMemberMapper(reader, ref startingIndx);
            });
            return orgMember;
        }
        private static OrganizationMember SingleOrgMemberMapper(IDataReader reader, ref int startingIndx)
        {
            OrganizationMember orgMember = new OrganizationMember();
            LookUp lookUp = new LookUp();
            BaseLocation loc = new BaseLocation();
            MembersOrganizationBase memOrg = new MembersOrganizationBase();
            orgMember.Id = reader.GetSafeInt32(startingIndx++);
            memOrg.Id = reader.GetSafeInt32(startingIndx++);
            memOrg.Name = reader.GetSafeString(startingIndx++);
            lookUp.Id = reader.GetSafeInt32(startingIndx++);
            lookUp.Name = reader.GetSafeString(startingIndx++);
            loc.LineOne = reader.GetSafeString(startingIndx++);
            loc.LineTwo = reader.GetSafeString(startingIndx++);
            loc.City = reader.GetSafeString(startingIndx++);
            loc.State = reader.GetSafeString(startingIndx++);
            loc.Zip = reader.GetSafeString(startingIndx++);
            memOrg.Phone = reader.GetSafeString(startingIndx++);
            memOrg.SiteUrl = reader.GetSafeString(startingIndx++);
            memOrg.Logo = reader.GetSafeString(startingIndx++);
            memOrg.Description = reader.GetSafeString(startingIndx++);
            orgMember.Members = reader.DeserializeObject<List<Member>>(startingIndx++);
            orgMember.DateCreated = reader.GetSafeDateTime(startingIndx++);
            orgMember.DateModified = reader.GetSafeDateTime(startingIndx++);
            orgMember.Location = loc;
            orgMember.OrganizationTypeId = lookUp;
            orgMember.Organization = memOrg;
            return orgMember;
        }
        private OrgMemberUserCheck MapFullUserCheck(IDataReader reader, ref int startingIndex)
        {
            OrgMemberUserCheck user = new OrgMemberUserCheck();
            user.Id = reader.GetSafeInt32(startingIndex++);
            user.FirstName = reader.GetSafeString(startingIndex++);
            user.LastName = reader.GetSafeString(startingIndex++);
            user.Mi = reader.GetSafeString(startingIndex++);
            user.AvatarUrl = reader.GetSafeString(startingIndex++);
            user.OrganizationId = reader.GetSafeInt32(startingIndex++);
            user.InviteEmail = reader.GetSafeString(startingIndex++);
            return user;
        }
        private static OrganizationMemberAddRequest MapMemberInviteToOrgMemberAdd(InviteMembersAddRequest input, int oId, int uId)
        {
            OrganizationMemberAddRequest orgAdd = new OrganizationMemberAddRequest();
            orgAdd.OrganizationId = oId;
            orgAdd.UserId = uId;
            orgAdd.UserRoleId = input.UserRoleTypeId;
            orgAdd.PositionTypeId = input.UserRoleTypeId;
            orgAdd.OrganizationEmail = input.Email;
            return orgAdd;
        }
        private static OrganizationMemberV2 SingleOrgMemberMapperV2(IDataReader reader, ref int startingIndx)
        {
            OrganizationMemberV2 orgMember = new OrganizationMemberV2();
            LookUp lookUp = new LookUp();
            MembersOrganizationBase memOrg = new MembersOrganizationBase();
            Member member = new Member();
            orgMember.Id = reader.GetInt32(startingIndx++);
            memOrg.Id = reader.GetSafeInt32(startingIndx++);
            memOrg.Name = reader.GetSafeString(startingIndx++);
            memOrg.Description = reader.GetSafeString(startingIndx++);
            memOrg.Phone = reader.GetSafeString(startingIndx++);
            memOrg.Logo = reader.GetSafeString(startingIndx++);
            memOrg.SiteUrl = reader.GetSafeString(startingIndx++);
            lookUp.Id = reader.GetSafeInt32(startingIndx++);
            lookUp.Name = reader.GetSafeString(startingIndx++);
            orgMember.OrganizationType = lookUp;
            member.Id = reader.GetSafeInt32(startingIndx++);
            member.FirstName = reader.GetSafeString(startingIndx++);
            member.LastName = reader.GetSafeString(startingIndx++);
            member.Mi = reader.GetSafeString(startingIndx++);
            member.Email = reader.GetSafeString(startingIndx++);
            member.AvatarUrl = reader.GetSafeString(startingIndx++);
            lookUp.Id = reader.GetSafeInt32(startingIndx++);
            lookUp.Name = reader.GetSafeString(startingIndx++);
            member.Role = lookUp;
            lookUp.Id = reader.GetSafeInt32(startingIndx++);
            lookUp.Name = reader.GetString(startingIndx++);
            member.Position = lookUp;
            member.OrganizationEmail = reader.GetSafeString(startingIndx++);
            orgMember.DateCreated = reader.GetSafeDateTime(startingIndx++);
            orgMember.DateModified = reader.GetSafeDateTime(startingIndx++);
            orgMember.Organization = memOrg;
            orgMember.User = member;
            return orgMember;
        }
        private static void AddCommonParams(OrganizationMemberAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@UserId", model.UserId);
            col.AddWithValue("@UserRoleId", model.UserRoleId);
            col.AddWithValue("@PositionType", model.PositionTypeId);
            col.AddWithValue("@OrganizationEmail", model.OrganizationEmail);
        }

    }
}
