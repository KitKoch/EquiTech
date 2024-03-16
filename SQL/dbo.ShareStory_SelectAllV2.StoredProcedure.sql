GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ShareStory_SelectAllV2]
									@PageIndex int
									,@PageSize int
									,@IsApproved bit 
AS
/*		~~ TEST ~~
			DECLARE 
				@PageIndex int = 0
				,@PageSize int = 10
				,@IsApproved int = 1
			EXECUTE [dbo].[ShareStory_SelectAllV2]
				@PageIndex
				,@PageSize
				,@IsApproved  

*/

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize 

	SELECT ss.[Id]
			,ss.[Name]
			,ss.[Email]
			,ss.[Story]
			,ss.[CreatedBy]
			,u.[FirstName]
			,u.[LastName]
			,u.[Mi]
			,u.[AvatarUrl] as Avatar
			,ss.[IsApproved]
			,ss.[ApprovedBy]
			,u2.[FirstName]
			,u2.[LastName]
			,u2.[Mi]
			,u2.[AvatarUrl] as Avatar
			,ss.[DateCreated]
			,ss.[DateModified]
			,f2.[Id]
			,f2.[Name]
			,f2.[Url]
			,[FileType] = (
				select ft.[Id], ft.[Name]
				from dbo.FileTypes as ft
				where ft.Id = f2.FileTypeId
				for json auto, without_array_wrapper
			)
			,f2.[DateCreated]
			,f2.[FileSize]
			,f2.[Downloaded]
			,TotalCount = COUNT(1) OVER()

		FROM[dbo].[ShareStory] AS ss 
			inner join [dbo].[Users] AS u
		ON ss.CreatedBy = u.Id  
	
			left outer join [dbo].[Users] AS u2
		ON ss.ApprovedBy = u2.Id

			left outer join dbo.FilesV2 AS f2
		ON ss.FileId = f2.Id
	
		WHERE IsApproved = @IsApproved

		ORDER BY ss.Id
		OFFSET @offset ROWS
		FETCH NEXT @PageSize ROWS ONLY

END
GO
