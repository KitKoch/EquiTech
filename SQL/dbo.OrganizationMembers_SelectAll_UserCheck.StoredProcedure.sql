GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 
CREATE PROC [dbo].[OrganizationMembers_SelectAll_UserCheck]
			@email nvarchar(255)
AS
/*---------------- TEST CODE -----------------
	--returns a null OrgId
	Declare @Email nvarchar(255) = 'testfairly1234@dispostable.com'
	Execute [dbo].[OrganizationMembers_SelectAll_UserCheck]
			@Email

    --returns a valid Org ID
	Declare @Email nvarchar(255) = 'fairlyhiringadmin@dispostable.com'
	Execute [dbo].[OrganizationMembers_SelectAll_UserCheck]
			@Email
			
	--returns InviteEmail
	Declare @Email nvarchar(255) = 'testdelte@dispostable.com'
	Execute [dbo].[OrganizationMembers_SelectAll_UserCheck]
			@Email

	AND st.Name = 'Active'
*/

BEGIN

	SELECT TOP 1 u.Id
				,u.FirstName
				,u.LastName
				,u.Mi
				,u.AvatarUrl
				,om.OrganizationId
				,i.Email as InviteEmail

	FROM		[dbo].[Users] AS u
				FULL OUTER JOIN [dbo].[InviteMembers] as i
					ON i.Email = @Email
				LEFT OUTER JOIN [dbo].[OrganizationMembers] AS om  
					ON u.Id = om.UserId

	WHERE u.Email = @Email
	OR	  i.Email = @Email

END
GO
