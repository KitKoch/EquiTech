GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Forums_SelectById]
			@Id int
AS
/*
DECLARE @Id int = 3

execute [dbo].[Forums_SelectById] @Id
select * from forums

*/
BEGIN
    SELECT	FT.Id
			,FT.[Name]
			,FT.[Description]
			,FC.Id as ForumCategoryId
			,FC.[Name] AS ForumCategoryName
			,FT.IsPrivate
			,FT.IsClosed
			,FT.DateCreated
			,FT.DateModified
    FROM Forums FT
     INNER JOIN ForumCategories FC ON FT.ForumCategoryId = FC.Id
    WHERE FT.Id = @Id
        AND FT.IsPrivate = 0
        AND FT.IsClosed = 0
    ORDER BY FT.DateCreated DESC
END




GO
