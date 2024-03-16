GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[UsersEducation_AndDegrees_Insert]
								 @UserId int
								,@SchoolId Int = null
								,@EducationLevelId int
								,@Description nvarchar(500)
								,@StartDate datetime2
								,@EndDate datetime2 = null
								,@BatchDegrees dbo.BatchDegrees READONLY
								,@Id int OUTPUT
	as
/*------------ TEST CODE ------------

		DECLARE  @UserId int = 208
				,@SchoolId Int = 3
				,@EducationLevelId int = 3
				,@Description nvarchar(500) = 'This is a Basic DESCRIPTION'
				,@StartDate datetime2 = getutcdate()
				,@EndDate datetime2 = getutcdate()
				,@Degrees dbo.BatchDegrees
				,@Id int 

		INSERT INTO @Degrees
							([Name])
		Values('Mechanical Engineer')

		EXECUTE dbo.[UsersEducation_AndDegrees_Insert]
								 @UserId 
								,@SchoolId 
								,@EducationLevelId
								,@Description 
								,@StartDate 
								,@EndDate 
								,@Degrees
								,@Id output

		EXECUTE dbo.UsersEducation_Select_ByUserId_V2
											@UserId
*/
	BEGIN
				
				INSERT INTO [dbo].[Degrees]
								   ([Name])
					SELECT [Name]
					FROM @BatchDegrees as bd
					WHERE NOT EXISTS (	
										SELECT 1
										FROM dbo.Degrees as d
										WHERE d.[Name] = bd.[Name]
										)

				INSERT INTO [dbo].[UsersEducation]
						   ([SourceId]
						   ,[EducationalLevelId]
						   ,[DegreeId]
						   ,[Description]
						   ,[StartDate]
						   ,[EndDate]
						   ,[CreatedBy]
						   ,[ModifiedBy])
					 SELECT
						    @SchoolId
						   ,@EducationLevelId
						   ,d.Id
						   ,@Description
						   ,@StartDate
						   ,@EndDate
						   ,@UserId
						   ,@UserId
					FROM dbo.Degrees as d 
						inner join @BatchDegrees as bd
								on d.[Name] = bd.[Name]
					WHERE d.[Name] = bd.[Name]

				SET @Id = SCOPE_IDENTITY()

	END
GO
