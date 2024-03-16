GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[UsersEducation_Insert_V2]
								 @UserId int
								,@SchoolId Int = null
								,@EducationLevelId int
								,@Description nvarchar(500)
								,@StartDate datetime2
								,@EndDate datetime2 = null
								,@Id int OUTPUT
	as
/*------------ TEST CODE ------------

		DECLARE  @UserId int = 305
				,@SchoolId Int = null
				,@EducationLevelId int = 3
				,@Description nvarchar(500) = 'This is a Basic DESCRIPTION 123123'
				,@StartDate datetime2 = getutcdate()
				,@EndDate datetime2 = getutcdate()
				,@Id int 

		EXECUTE dbo.[UsersEducation_Insert_V2]
								 @UserId 
								,@SchoolId 
								,@EducationLevelId 
								,@Description
								,@StartDate 
								,@EndDate 
								,@Id OUTPUT
		
		EXECUTE dbo.UsersEducation_Select_ByUserId_V2
											@UserId
*/
	BEGIN
				DECLARE @DegreeId int = null;

				INSERT INTO [dbo].[UsersEducation]
						   ([SourceId]
						   ,[EducationalLevelId]
						   ,[DegreeId]
						   ,[Description]
						   ,[StartDate]
						   ,[EndDate]
						   ,[CreatedBy]
						   ,[ModifiedBy])
					 VALUES
						   (@SchoolId
						   ,@EducationLevelId
						   ,@DegreeId
						   ,@Description
						   ,@StartDate
						   ,@EndDate
						   ,@UserId
						   ,@UserId)

				SET @Id = SCOPE_IDENTITY()

	END
GO
