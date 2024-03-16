using Data;
using Data.Providers;
using Models.Domain.InviteMembers;
using Models.Requests.Emails;
using Models.Requests.InviteMembers;
using Services.Interfaces;
using System;
using System.Data;
using System.Data.SqlClient;

namespace Services
{
    public class InviteService : IInviteService
    {
        IDataProvider _data = null;
        IBaseUserMapper _userMapper = null;
        ILookUpService _lookUpService = null;
        IEmailSenderService _emailService = null;

        public InviteService(IDataProvider data, IBaseUserMapper mapper, ILookUpService lookUpService, IEmailSenderService emailService)
        {
            _data = data;
            _userMapper = mapper;
            _lookUpService = lookUpService;
            _emailService = emailService;
        }

        public InviteMember SelectByToken(string token)
        {
            string procName = "[dbo].[InviteMembers_Select_ByToken]";

            InviteMember invite = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Token", token);
            }, delegate (IDataReader reader, short set)
            {
                invite = MapInvite(reader);
            }
            );

            return invite;
        }
        public int Add(InviteMembersAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[InviteMembers_Insert]";
            string token = Guid.NewGuid().ToString();
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(model, collection);
                collection.AddWithValue("@CreatedBy", userId);
                collection.AddWithValue("@Token", token);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                collection.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            }
            );
            SendInviteEmail(token);
            return id;
        }

        private static void AddCommonParams(InviteMembersAddRequest input, SqlParameterCollection collection)
        {
            collection.AddWithValue("@FirstName", input.FirstName);
            collection.AddWithValue("@LastName", input.LastName);
            collection.AddWithValue("@Email", input.Email);
            collection.AddWithValue("@UserRoleTypeId", input.UserRoleTypeId);
            collection.AddWithValue("@OrganizationId", input.OrganizationId);
        }

        public void DeleteInviteById(int id)
        {
            string procName = "[dbo].[InviteMembers_DeleteById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }

        private void SendInviteEmail(string token)
        {
            InviteMember aInvite = SelectByToken(token);
            _emailService.SendNewUserInviteEmail(aInvite);
        }

        private InviteMember MapInvite(IDataReader reader)
        {
            InviteMember invite = new InviteMember();
            int colIdex = 0;

            invite.Id = reader.GetSafeInt32(colIdex++);
            invite.FirstName = reader.GetSafeString(colIdex++);
            invite.LastName = reader.GetSafeString(colIdex++);
            invite.Email = reader.GetSafeString(colIdex++);
            invite.Token = reader.GetSafeString(colIdex++);
            invite.UserRoleTypeId = _lookUpService.MapSingleLookUp(reader, ref colIdex);
            invite.OrganizationId = _lookUpService.MapLookUp3Col(reader, ref colIdex);
            invite.ExpirationDate = reader.GetDateTime(colIdex++);
            invite.CreatedBy = _userMapper.MapUser(reader, ref colIdex);
            invite.DateCreated = reader.GetDateTime(colIdex++);

            return invite;
        }
    }
}
