GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Teams_SelectAll]
	@OrganizationId int
as

/* ---------------TEST-------------
	 
	DECLARE @OrganizationId int = 3

	Execute dbo.Teams_SelectAll @OrganizationId


	Select *
	from dbo.Teams

	Select *
	from dbo.Organizations

*/

BEGIN




	SELECT Id
		,Name
			 

	FROM dbo.Teams 
	WHERE OrganizationId = @OrganizationId






END
GO
