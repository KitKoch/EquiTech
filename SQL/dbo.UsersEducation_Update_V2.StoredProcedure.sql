GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	
	CREATE PROC [dbo].[UsersEducation_Update_V2]
								 @UserId int
								,@SchoolId Int
								,@EducationLevelId int
								,@BatchDegrees dbo.BatchDegrees READONLY
								,@Description nvarchar(500)
								,@StartDate datetime2
								,@EndDate datetime2
								,@Id int 
	as
/*------------ TEST CODE ------------

		DECLARE  @UserId int = 3
				,@SchoolId Int = 3
				,@EducationLevelId int = 3
				,@Degrees dbo.BatchDegrees
				,@Description nvarchar(500) = 'This is a Basic DESCRIPTION'
				,@StartDate datetime2 = getutcdate()
				,@EndDate datetime2 = getutcdate()
				,@Id int = 2

		INSERT INTO @Degrees
							([Name])
		Values('Mechanical Engineer')

		EXECUTE dbo.UsersEducation_Select_ById_V2
												@Id 

		EXECUTE dbo.UsersEducation_Update_V2
								 @UserId 
								,@SchoolId 
								,@EducationLevelId 
								,@Degrees 
								,@Description 
								,@StartDate 
								,@EndDate 
								,@Id  

		EXECUTE dbo.UsersEducation_Select_ById_V2
												@Id
*/
	BEGIN

			DECLARE @DateNow datetime2 = GETUTCDATE()

			INSERT INTO [dbo].[Degrees]
								   ([Name])
					SELECT [Name]
					FROM @BatchDegrees as bd
					WHERE NOT EXISTS (	
										SELECT 1
										FROM dbo.Degrees as d
										WHERE d.[Name] = bd.[Name]
										)
			DECLARE @DegreeId int = (
										SELECT d.Id
										FROM dbo.Degrees as d 
												inner join @BatchDegrees as bd
													on d.[Name] = bd.[Name]
										WHERE d.[Name] = bd.[Name]
									)


			UPDATE [dbo].[UsersEducation]
			   SET [SourceId] = @SchoolId
				  ,[EducationalLevelId] = @EducationLevelId
				  ,[DegreeId] = @DegreeId
				  ,[Description] = @Description
				  ,[StartDate] = @StartDate
				  ,[EndDate] = @EndDate
				  ,[ModifiedBy] = @UserId
				  ,[DateModified] = @DateNow
			 WHERE Id = @Id

END
GO
