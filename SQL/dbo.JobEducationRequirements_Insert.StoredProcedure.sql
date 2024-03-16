GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[JobEducationRequirements_Insert]
@JobId int,
@EducationRequirementId int,
@CreatedBy int
as
begin
/*
Declare @JobId int = 5,
		@EducationRequirementId int = 6,
		@CreatedBy int = 7
		select JobId,
				EducationRequirementId,
				DateCreated,
				CreatedBy
		from dbo.JobEducationRequirements
		execute dbo.JobEducationRequirements_Insert
		@JobId,
		@EducationRequirementId,
		@DateCreated,
		@CreatedBy
		select JobId,
				EducationRequirementId,
				DateCreated,
				CreatedBy
		from dbo.JobEducationRequirements


*/

INSERT INTO [dbo].[JobEducationRequirements]
           ([JobId]
           ,[EducationRequirementId]
           ,[CreatedBy])
     VALUES
           (@JobId
           ,@EducationRequirementId
           ,@CreatedBy)
end


GO
