GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[JobEducationRequirements_Select_ByEducationRequirementId]
@EducationRequirementId int,
@PageIndex int,
@PageSize int
as
/*
declare @EducationRequirementId int = 6,
@PageIndex int = 0,
@PageSize int = 2
execute dbo.JobEducationRequirements_Select_ByEducationRequirementId @EducationRequirementId
																	,@PageIndex 
																	,@PageSize 


***NEEDS JOINS ON DEGREES, AND ED LEVELS


*/
begin
DECLARE	@offset int = @PageIndex * @PageSize
SELECT [Name]
	  ,j.[Title]
      ,[EducationRequirementId]
	  ,o.[Id] as OrganizationId
	  ,j.[Id] as JobId
      ,jer.[DateCreated]
      ,jer.[CreatedBy]
	  ,TotalCount = count(*) over()
  FROM [dbo].[JobEducationRequirements] as jer inner join dbo.jobs as j
  on jer.JobId = j.Id
  inner join dbo.Organizations as o 
  on o.Id = j.OrganizationId
  where jer.EducationRequirementId = @EducationRequirementId
     Order by jer.EducationRequirementId
  offset @offset rows
  fetch next @PageSize rows only
end


GO
