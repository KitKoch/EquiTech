GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[UserSkills_Insert]
			@UserId int
           ,@SkillId int
           ,@ExperienceLevelId int
           ,@Years int
           ,@Months int


AS
/*
DECLARE		@UserId int = 202
           ,@SkillId int = 6
           ,@ExperienceLevelId int =7
           ,@Years int = 10
           ,@Months int = 2
           ,@DateCreated datetime2(7)
           ,@DateModified datetime2(7)
EXEC [dbo].[UserSkills_Insert]
			@UserId
           ,@SkillId
           ,@ExperienceLevelId
           ,@Years
           ,@Months
SELECT * FROM DBO.Users
SELECT * FROM DBO.Skills
SELECT * FROM DBO.ExperienceLevels
EXEC [dbo].[UserSkills_SelectAll]

*/
BEGIN

INSERT INTO [dbo].[UserSkills]
           ([UserId]
           ,[SkillId]
           ,[ExperienceLevelId]
           ,[Years]
           ,[Months])
     VALUES
           (@UserId
           ,@SkillId
           ,@ExperienceLevelId
           ,@Years
           ,@Months)
END


GO
