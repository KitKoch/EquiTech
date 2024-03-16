GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Appointments_Select_ByCreatedById]
												@PageIndex int
												,@PageSize int
												,@CreatedById int


as


/* -----Test Code --------


	Declare @PageIndex int = 0
			,@PageSize int = 2
			,@CreatedById int = 14


	Execute [dbo].[Appointments_Select_ByCreatedById]
												@PageIndex
												,@PageSize
												,@CreatedById




*/





BEGIN

	
	Declare @offset int = @PageIndex * @PageSize



	Select app.Id
			,at.Id
			,at.Name as AppointmentType
			,st.Id
			,st.Name as AppointmentStatus
			,us.Id
			,us.FirstName as ClientFirstName
			,us.LastName as ClientLastName
			,us.Mi as ClientMiddleName
			,us.Email as ClientEmail
			,app.IsConfirmed
			,loc.Id
			,loc.LineOne as StreetAddress1
			,loc.LineTwo as StreetAddress2
			,loc.City
			,loc.Zip
			,app.AppointmentStart
			,app.AppointmentEnd
			,app.DateCreated
			,app.DateModified
			,u.Id
			,u.FirstName
			,u.LastName
			,u.Mi
			,u.AvatarUrl
			,mu.Id
			,mu.FirstName
			,mu.LastName
			,mu.Mi
			,mu.AvatarUrl
			,TotalCount = Count(1)Over()

	
	From dbo.Appointments as app inner join dbo.Users as us
			on app.ClientId = us.Id
								inner join dbo.Users as u
			on app.CreatedBy = u.Id
								inner join dbo.Users as mu
			on app.ModifiedBy = mu.Id
								inner join dbo.Locations as loc
			on loc.Id = app.LocationId
								inner join dbo.States as s
			on s.Id = loc.StateId
								inner join dbo.StatusTypes as st
			on app.StatusTypesId = st.Id
								inner join dbo.AppointmentTypes as at
			on at.Id = app.AppointmentTypeId
								inner join dbo.TeamMembers as tm
			on tm.UserId = app.TeamMemberId

	Where app.CreatedBy = @CreatedById and app.StatusTypesId = 1


	Order by app.CreatedBy


	OFFSET @offset Rows
	Fetch Next @PageSize Rows ONLY


END
GO
