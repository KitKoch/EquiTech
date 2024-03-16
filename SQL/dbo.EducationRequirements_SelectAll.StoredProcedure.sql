GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[EducationRequirements_SelectAll]

as

/*
execute dbo.EducationRequirements_SelectAll
***TABLE STILL NEEDS FK FROM EDUCATIONLEVELS AND DEGREE TABLES***

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

end


GO
