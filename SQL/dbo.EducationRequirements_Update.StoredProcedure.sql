GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[EducationRequirements_Update]
@Id int OUTPUT,
@Name nvarchar(100),
@Description nvarchar(500),
@EducationLevelId int,
@DegreeId int,
@OrganizationId int,
@IsExperienceAllowed bit,
@MinYears int,
@ModifiedBy int
as
/*
declare @Id int = 6,
@Name nvarchar(100)='Test Name',
@Description nvarchar(500)='Test Desctiption',
@EducationLevelId int =3,
@DegreeId int =1,
@OrganizationId int =1,
@IsExperienceAllowed bit = 0,
@MinYears int = 3,
@CreatedBy int = 6,
@ModifiedBy int = 7
execute dbo.EducationRequirements_Update @Id,
										@Name,
										@Description,
										@EducationLevelId,
										@DegreeId,
										@OrganizationId,
										@IsExperienceAllowed,
										@MinYears,
										@ModifiedBy 
execute dbo.EducationRequirements_SelectById @Id

*/

begin
Declare @DateModified datetime2(7) = getutcdate()
update dbo.EducationRequirements set
										[Name] = @Name,
										[Description] = @Description,
										[EducationLevelId] = @EducationLevelId,
										[DegreeId] = @DegreeId,
										[OrganizationId] = @OrganizationId,
										[IsExperienceAllowed] = @IsExperienceAllowed,
										[MinYears] = @MinYears,
										[ModifiedBy] = @ModifiedBy,
										[DateModified] = @DateModified
										where Id = @Id

end


GO
