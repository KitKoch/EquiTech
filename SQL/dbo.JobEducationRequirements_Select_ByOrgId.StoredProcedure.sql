GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[JobEducationRequirements_Select_ByOrgId]

@PageIndex int,
@PageSize int,
@OrganizationId int
as
/*
declare @PageIndex int = 0,
@PageSize int = 2,
@OrganizationId int = 1
execute dbo.JobEducationRequirements_Select_ByOrgId
													@PageIndex 
													,@PageSize 
													,@OrganizationId
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
    where j.OrganizationId = @OrganizationId
   Order by j.OrganizationId
  offset @offset rows
  fetch next @PageSize rows only 

end
GO
