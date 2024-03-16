using Data;
using Data.Providers;
using Models;
using Services;
using Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Models.Requests.Licenses;
using Models.Domain;
using Models.Domain.Files;
using System;

public class LicenseServices : ILicenseServices
{
	IDataProvider _data = null;
	IBaseUserMapper _baseUserMapper = null;
	ILookUpService _lookUpService = null;

	public LicenseServices(IDataProvider data, IBaseUserMapper baseUserMapper, ILookUpService lookUpService)
	{
		_data = data;
		_baseUserMapper = baseUserMapper;
		_lookUpService = lookUpService;
	}

	public void DeleteLicenseById(int licenseId)
	{
		string procName = "[dbo].[Licenses_Delete_ById]";
		_data.ExecuteNonQuery(procName,
		inputParamMapper: delegate (SqlParameterCollection collection)
		{
			collection.AddWithValue("@Id", licenseId);
		},
		returnParameters: null);
	}

	public int AddLicense(LicenseAddRequest model, int userId)
	{
		int returnId = 0;
		string procName = "[dbo].[Licenses_InsertV2]";
		_data.ExecuteNonQuery(procName,
			inputParamMapper: delegate (SqlParameterCollection collection)
			{
				collection.AddWithValue("@CreatedBy", userId);
				AddCommonParams(model, collection);
				SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
				idOut.Direction = ParameterDirection.Output;
				collection.Add(idOut);
			},
			returnParameters: delegate (SqlParameterCollection returnColl)
			{
				object oldId = returnColl["@Id"].Value;
				int.TryParse(oldId.ToString(), out returnId);
			});
		return returnId;
	}

	public Paged<License> SelectAllLicenses(int pageIndex, int pageSize)
	{
		Paged<License> pagedLicense = null;
		List<License> licenseList = null;
		int totalCount = 0;
		string procName = "[dbo].[Licenses_SelectAllV2]";
		_data.ExecuteCmd(
			procName,
			inputParamMapper:
			delegate (SqlParameterCollection paramCollection)
			{
				paramCollection.AddWithValue("@PageIndex", pageIndex);
				paramCollection.AddWithValue("@PageSize", pageSize);
			},
			singleRecordMapper: delegate (IDataReader reader, short set)
			{
				int startIndex = 0;
				License aLicense = MapSingleLicense(reader, ref startIndex);
				if (totalCount == 0)
				{
					totalCount = reader.GetSafeInt32(startIndex++);
				}
				if (licenseList == null)
				{
					licenseList = new List<License>();
				}
				licenseList.Add(aLicense);
			});
		if (licenseList != null)
		{
			pagedLicense = new Paged<License>(licenseList, pageIndex, pageSize, totalCount);
		}
		return pagedLicense;
	}

	public List<License> SelectByCreatedById(int id)
	{
		List<License> licenseList = null;
		string procName = "[dbo].[Licenses_Select_ByCreatedByV2]";
		_data.ExecuteCmd(
			procName,
			inputParamMapper:
			delegate (SqlParameterCollection paramCollection)
			{
				paramCollection.AddWithValue("@CreatedBy", id);
			},
			singleRecordMapper: delegate (IDataReader reader, short set)
			{
				int index = 0;
				License aLicense = MapSingleLicense(reader, ref index);

				if (licenseList == null)
				{
					licenseList = new List<License>();
				}
				licenseList.Add(aLicense);
			});
		return licenseList;
	}

	public void Update(LicenseUpdateRequest model, int userId)
	{
		string procName = "[dbo].[Licenses_UpdateV2]";
		_data.ExecuteNonQuery(procName,
			inputParamMapper: delegate (SqlParameterCollection collection)
			{
				collection.AddWithValue("@Id", model.Id);
				collection.AddWithValue("@CreatedBy", userId);
				if (model.DateVerified.HasValue)
				{
					collection.AddWithValue("@DateVerified", model.DateVerified.Value);
				}
				else
				{
					collection.AddWithValue("@DateVerified", DBNull.Value);
				}
				AddCommonParams(model, collection);
			},
			returnParameters: null);
	}




	private static void AddCommonParams(LicenseAddRequest addRequest, SqlParameterCollection collection)
	{
		collection.AddWithValue("@LicenseStateId", addRequest.LicenseStateId);
		collection.AddWithValue("@LicenseNumber", addRequest.LicenseNumber);
		collection.AddWithValue("@LicenseName", addRequest.LicenseName);
		collection.AddWithValue("@ExpirationDate", addRequest.ExpirationDate);
		collection.AddWithValue("@IsActive", addRequest.IsActive);
		collection.AddWithValue("@FileId", addRequest.FileId);
	}


	private License MapSingleLicense(IDataReader reader, ref int index)
	{
		License license = new License();

		license.Id = reader.GetSafeInt32(index++);
		license.LicenseStateId = reader.GetSafeInt32(index++);
		license.StateName = reader.GetSafeString(index++);
		license.LicenseNumber = reader.GetSafeString(index++);
		license.LicenseName = reader.GetSafeString(index++);
		license.CreatedBy = _baseUserMapper.MapUser(reader, ref index);
		license.IsActive = reader.GetSafeBool(index++);
		license.DateCreated = reader.GetSafeDateTime(index++);
		license.DateVerified = reader.GetSafeDateTime(index++);
		license.ExpirationDate = reader.GetSafeDateTime(index++);
		license.File = new File();
		license.File.Id = reader.GetSafeInt32(index++);
		license.File.Name = reader.GetSafeString(index++);
		license.File.Url = reader.GetSafeString(index++);
		license.File.FileType = _lookUpService.MapSingleLookUp(reader, ref index);
		license.File.FileSize = reader.GetSafeInt32(index++);
		license.File.DateCreated = reader.GetSafeDateTime(index++);
		license.File.Downloaded = reader.GetSafeInt32(index++);

		return license;
	}
}
