GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CharitableFunds_Select_ByCreatedBy]
				@CreatedBy int
AS

/*
	DECLARE		@CreatedBy int = '202'


	EXECUTE dbo.CharitableFunds_Select_ByCreatedBy
				@CreatedBy


*/

BEGIN

	SELECT		cf.[Id]
				,cf.[Name]
				,cf.[Description]
				,cf.[Url]
				,cf.[DateCreated]
				,cf.[DateModified]
				,cf.[isDeleted]
				,u.Id
				,u.[FirstName]
				,u.[LastName]
				,u.[Mi]
				,u.[AvatarUrl]

	FROM		[dbo].[CharitableFunds] as cf
					inner join dbo.Users as u on cf.CreatedBy = u.Id
	WHERE cf.CreatedBy = @CreatedBy

END


GO
