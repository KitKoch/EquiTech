GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[DesignatedSurveys_Insert]
					 @Name nvarchar(100)
					,@Version nvarchar(100)
					,@WorkflowTypeId int
					,@SurveyId int
					,@EntityTypeId int
					,@EntityId int 
					,@IsDeleted bit
					,@CreatedBy int 
					,@ModifiedBy int
					,@Id int OUTPUT
AS 

/*
	DECLARE			@Id int = 0;

	DECLARE			 @Name nvarchar(100) = 'Josh Faller'
					,@Version nvarchar(100) = 'Original Version'
					,@WorkflowTypeId int = 2
					,@SurveyId int = 3
					,@EntityTypeId int = 3
					,@EntityId int = 3
					,@IsDeleted bit = 1
					,@CreatedBy int = 3		
					,@ModifiedBy int = 8

	EXECUTE dbo.DesignatedSurveys_Insert
					@Name
					,@Version  
					,@WorkflowTypeId 
					,@SurveyId 
					,@EntityTypeId 
					,@EntityId  
					,@IsDeleted
					,@CreatedBy 
					,@ModifiedBy
					,@Id OUTPUT

Select * From dbo.DesignatedSurveys
*/

BEGIN 

		INSERT INTO [dbo].[DesignatedSurveys]
					([Name]
					,[Version]
					,[WorkflowTypeId] 
					,[SurveyId]
					,[EntityTypeId]
					,[EntityId]
					,[IsDeleted]
					,[CreatedBy]
					,[ModifiedBy])
	  
		VALUES
					(@Name
					,@Version
					,@WorkflowTypeId 
					,@SurveyId 
					,@EntityTypeId
					,@EntityId
					,@IsDeleted
					,@CreatedBy
					,@ModifiedBy)

		SET @Id = SCOPE_IDENTITY()


END
GO
