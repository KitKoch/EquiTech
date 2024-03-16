GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[EducationRequirements_SelectById]
@Id int
as

/*
declare @Id int = 6
execute dbo.EducationRequirements_SelectById @Id

****STILL NEEDS JOINS WITH EDUCATION LEVELS****

*/

begin
SELECT er.[Id]
      ,er.[Name]
      ,er.[Description]
      ,er.[EducationLevelId]
      ,er.[DegreeId]
	  ,er.[OrganizationId]
      ,er.[IsExperienceAllowed]
      ,er.[MinYears]
      ,er.[CreatedBy]
      ,er.[ModifiedBy]
      ,er.[DateCreated]
      ,er.[DateModified]
	  ,er.[IsDeleted]

from dbo.EducationRequirements as er 

  where er.Id = @Id
end


GO
