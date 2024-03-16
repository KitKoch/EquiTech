GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Threads_SelectByParentId]
	@ParentId INT,
	@PageSize INT,
    @PageIndex INT
AS
/*
Declare @ParentId INT = 39
		,@PageSize int = 100
		,@PageIndex int = 0

EXEC dbo.Threads_SelectByParentId 
		@ParentId
		,@PageSize
		,@PageIndex
SELECT *
FROM dbo.Threads
*/
BEGIN
	 DECLARE @Offset INT = @PageIndex * @PageSize

		SELECT t.[Id]
				,t.[Subject]
				,t.[Content]
				,t.[ForumId]
				,t.[IsDeleted]
				,t.[DateCreated]
				,t.[DateModified]
				,u.[Id] AS UserId --retrieves user details for the creator of each thread, such as UserId, FirstName, LastName, Mi, and AvatarUrl.
				,u.[FirstName]
				,u.[LastName]
				,u.[Mi]
				,u.[AvatarUrl]
				,pt.[Id] AS ParentThreadId
				,f.[Name] AS ForumName
				,TotalCount = COUNT(*) OVER()
		FROM dbo.Threads AS t
		INNER JOIN dbo.Users AS u ON U.Id = t.CreatedBy --connects the Threads table (t) with the Users table (u) using the CreatedBy column.
		LEFT JOIN dbo.Threads AS pt ON pt.Id = t.ParentId
		LEFT JOIN dbo.Forums AS f ON f.Id = t.ForumId
		WHERE T.ParentId = @ParentId or t.Id = @ParentId
		ORDER BY t.DateModified DESC
		Offset @Offset ROWS
		FETCH NEXT @PageSize ROWS ONLY
END
GO
