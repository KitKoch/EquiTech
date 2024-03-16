GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[UserSkills_SelectById]
		@UserId int
		,@PageIndex int
		,@PageSize int

AS

/*
DECLARE @UserId int = 202
		,@PageIndex int =0
		,@PageSize int =5

EXECUTE dbo.UserSkills_SelectById
		@UserId
		,@PageIndex
		,@PageSize

*/

BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT	u.[Id] as UserId
		,u.[FirstName]
		,u.[LastName]
		,s.[Id] as SkillId
		,s.[Name] as Skill
		,i.[Id] as IndustryId
		,i.[Name] as Industry
		,e.[Id] as ExpId
		,e.[Name] as ExperienceLevel
		,e.[Description]
		,us.[Years]
		,us.[Months]
		,us.[DateCreated]
		,us.[DateModified]
		,TotalCount = COUNT(1) OVER()

  FROM	[dbo].[UserSkills] us JOIN [dbo].[Users] u
		ON us.UserId = u.Id 
		JOIN [dbo].[Skills] s
		ON us.SkillId = s.Id
		JOIN [dbo].[ExperienceLevels] e
		ON us.[ExperienceLevelId] = e.[Id]
		INNER JOIN [dbo].[Industries] i
		ON s.[IndustryId] = i.[Id]

		WHERE u.[Id] = @UserId

		ORDER BY s.[Name]

		OFFSET @offSet ROWS
		FETCH NEXT @PageSize ROWS ONLY
END


GO
