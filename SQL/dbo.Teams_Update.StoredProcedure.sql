GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Teams_Update]
	@OrganizationId int
	,@Name nvarchar(100)
	,@Description nvarchar(500)
	,@Id int 

as
/* ----- Test Code -----
	

	DECLARE @OrganizationId int = 1
	,@Name nvarchar(100) = 'Marketing Team'
	,@Description nvarchar(500) = 'Social Media'
	,@Id int = 10



	SELECT *
	FROM dbo.Teams
	WHERE Id = @Id

	Execute dbo.Teams_Update
							@OrganizationId
							,@Name
							,@Description
							,@Id

	SELECT *
	FROM dbo.Teams
	WHERE Id = @Id



*/


BEGIN
	
	DECLARE @DateNow datetime2 = GETUTCDATE()

	UPDATE [dbo].Teams
	   SET OrganizationId = @OrganizationId
            ,Name = @Name
            ,Description = @Description
			,DateModified = @DateNow


	 WHERE Id = @Id


END
GO
