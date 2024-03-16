GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CharitableFunds_SelectAll_Paginated]
				@PageIndex int
				,@PageSize int
AS

/*
	DECLARE		@PageIndex int = '0'
				,@PageSize int = '2'

	EXECUTE dbo.CharitableFunds_SelectAll_Paginated
				@PageIndex
				,@PageSize

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

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
				,TotalCount = COUNT(1) OVER()

	FROM		[dbo].[CharitableFunds] as cf
					inner join dbo.Users as u on cf.CreatedBy = u.Id

	ORDER BY	cf.[Id]
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END


GO
