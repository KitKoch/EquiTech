GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[JobEducationRequirements_Update]
@JobId int,
@EducationRequirementId int
as
/*
declare @JobId int = 5,
		@EducationRequirementId int = 6
		execute dbo.JobEducationRequirements_Select_ByJobId @JobId
		execute dbo.JobEducationRequirements_Update
													@JobId,
													@EducationRequirementId
		execute dbo.JobEducationRequirements_Select_ByJobId @JobId


*/

begin
UPDATE [dbo].[JobEducationRequirements]
   SET [EducationRequirementId] = @EducationRequirementId
 WHERE JobId = @JobId
end



GO
