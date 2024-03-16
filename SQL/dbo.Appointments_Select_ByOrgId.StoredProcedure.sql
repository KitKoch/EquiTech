GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Appointments_Select_ByOrgId]
												@PageIndex int
												,@PageSize int
												,@OrganizationId int

AS
/* -----Test Code --------


	Declare @PageIndex int = 0
			,@PageSize int = 100
			,@OrganizationId int = 2


	Execute [dbo].[Appointments_Select_ByOrgId]
												@PageIndex
												,@PageSize
												,@OrganizationId 

*/

BEGIN
	
	DECLARE @Offset int = @PageIndex * @PageSize

	SELECT		app.Id as ApptId
				,at.Id as ApptTypeId
				,at.Name as ApptType
				,st.Id as ApptStatusId
				,st.Name as ApptStatus
				,us.Id as ClientId
				,us.FirstName
				,us.LastName
				,us.Mi 
				,us.Email
				,us.AvatarUrl
				,app.IsConfirmed
				,tm.UserId as TeamMemberId
				,users.FirstName
				,users.LastName
				,users.Mi
				,users.Email
				,users.AvatarUrl
				,app.Notes
				,loc.Id as LocationId
				,loc.LineOne
				,loc.LineTwo
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

	
	FROM	dbo.Appointments AS app 
			INNER JOIN dbo.Users AS us ON app.ClientId = us.Id
			INNER JOIN dbo.Users AS u ON app.CreatedBy = u.Id
			INNER JOIN dbo.Users AS mu ON app.ModifiedBy = mu.Id
			INNER JOIN dbo.Locations AS loc ON loc.Id = app.LocationId
			INNER JOIN dbo.States AS s ON s.Id = loc.StateId
			INNER JOIN dbo.StatusTypes AS st ON app.StatusTypesId = st.Id
			INNER JOIN dbo.AppointmentTypes AS at ON at.Id = app.AppointmentTypeId
			INNER JOIN dbo.TeamMembers AS tm ON tm.UserId = app.TeamMemberId
			INNER JOIN dbo.Users AS users ON users.Id = tm.UserId
			INNER JOIN dbo.OrganizationLocations AS org ON org.LocationId = loc.Id

	WHERE org.OrganizationId = @OrganizationId
	ORDER BY app.AppointmentStart
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY


END
GO
