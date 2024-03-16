GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[JobEducationRequirements_Delete]
@JobId int
as

/*
declare @JobId int = 5
execute dbo.JobEducationRequirements_Select_ByJobId @JobId
execute dbo.JobEducationRequirements_Delete @JobId
execute dbo.JobEducationRequirements_Select_ByJobId @JobId

*/

begin
DELETE FROM [dbo].[JobEducationRequirements]
      WHERE JobId = @JobId

end


GO
