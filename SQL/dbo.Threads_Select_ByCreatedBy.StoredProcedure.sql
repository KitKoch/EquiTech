USE [Fairly]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Threads_Select_ByCreatedBy]
    @CreatedBy INT,
    @PageSize INT,
    @PageIndex INT
AS
/*
DECLARE @CreatedBy INT = 3
        ,@PageSize INT = 10
        ,@PageIndex INT = 0

EXEC dbo.Threads_Select_ByCreatedBy
    @CreatedBy
    ,@PageSize
    ,@PageIndex
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
           ,u.[Id] AS UserId
           ,u.[FirstName]
           ,u.[LastName]
           ,u.[Mi]
           ,u.[AvatarUrl]
           ,pt.[Id] AS ParentThreadId
           ,f.[Name] AS ForumName
           ,TotalCount = COUNT(*) OVER()
    FROM dbo.Threads AS t
    INNER JOIN dbo.Users AS u ON u.Id = t.CreatedBy
    LEFT JOIN dbo.Threads AS pt ON pt.Id = t.ParentId
    LEFT JOIN dbo.Forums AS f ON f.Id = t.ForumId
    WHERE t.CreatedBy = @CreatedBy and t.IsDeleted = 0
    ORDER BY t.DateModified DESC
    Offset @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY
END
GO
