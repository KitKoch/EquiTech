GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[JobEducationRequirements_Select_ByJobId]
@JobId int
as 
/*
declare @JobId int = 5
execute dbo.JobEducationRequirements_Select_ByJobId @JobId


***MISSING  DEGREES AND ED LEVELS
*/

begin
SELECT [Name]
	  ,j.[Title]
      ,[EducationRequirementId]
	  ,o.[Id] as OrganizationId
	  ,j.[Id] as JobId
      ,jer.[DateCreated]
      ,jer.[CreatedBy]
  FROM [dbo].[JobEducationRequirements] as jer inner join dbo.jobs as j
  on jer.JobId = j.Id
  inner join dbo.Organizations as o 
  on o.Id = j.OrganizationId
  where JobId = @JobId

end


GO
