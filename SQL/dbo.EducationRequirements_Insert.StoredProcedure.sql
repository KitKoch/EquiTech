GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[EducationRequirements_Insert]
@Id int OUTPUT,
@Name nvarchar(100),
@Description nvarchar(500),
@EducationLevelId int,
@DegreeId int,
@OrganizationId int,
@IsExperienceAllowed bit,
@MinYears int,
@CreatedBy int,
@ModifiedBy int
as
/*
declare @Id int = 0,
@Name nvarchar(100)='Test Name',
@Description nvarchar(500)='Test Desctiption',
@EducationLevelId int =1,
@DegreeId int =1,
@OrganizationId int =1,
@IsExperienceAllowed bit = 0,
@MinYears int =1,
@CreatedBy int =3,
@ModifiedBy int =3

execute dbo.EducationRequirements_Insert @Id OUTPUT,
										@Name,
										@Description,
										@EducationLevelId,
										@DegreeId,
										@OrganizationId,
										@IsExperienceAllowed,
										@MinYears,
										@CreatedBy,
										@ModifiedBy
execute dbo.EducationRequirements_SelectById @Id

*/

begin
insert into dbo.EducationRequirements(
										[Name],
										[Description],
										[EducationLevelId],
										[DegreeId],
										[OrganizationId],
										[IsExperienceAllowed],
										[MinYears],
										[CreatedBy],
										[ModifiedBy]
										)
										Values
										(
										@Name,
										@Description,
										@EducationLevelId,
										@DegreeId,
										@OrganizationId,
										@IsExperienceAllowed,
										@MinYears,
										@CreatedBy,
										@ModifiedBy
										)
									set	@Id = Scope_Identity()
end


GO
