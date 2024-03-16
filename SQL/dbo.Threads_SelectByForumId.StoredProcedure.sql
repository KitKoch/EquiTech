GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Threads_SelectByForumId]
	@ForumId INT
AS
/*
DECLARE @ForumId INT = 24

EXEC [dbo].[Threads_SelectByForumId]
	@ForumId
*/

BEGIN
	SELECT t.[Id]
           ,t.[Subject]
           ,t.[Content]
           ,t.[ForumId]
           ,t.[IsDeleted]
           ,t.[DateCreated]
           ,t.[DateModified]
           ,t.[CreatedBy]
           ,u.[FirstName]
           ,u.[LastName]
           ,u.[Mi]
           ,u.[AvatarUrl]
           ,pt.[Id] AS ParentThreadId
           ,f.[Name] AS ForumName
	FROM dbo.Threads AS t 
	INNER JOIN dbo.Users AS u ON u.Id = t.CreatedBy
	LEFT JOIN dbo.Threads AS pt ON pt.Id = t.ParentId
	LEFT JOIN dbo.Forums AS f ON f.Id = T.ForumId
	WHERE t.ForumId = @ForumId AND T.IsDeleted = 0
	ORDER BY t.DateModified DESC 
END
GO
