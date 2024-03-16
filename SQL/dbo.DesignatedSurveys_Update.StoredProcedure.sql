GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[DesignatedSurveys_Update]
			@Name nvarchar(100)
			,@Version nvarchar(100)
			,@WorkflowTypeId int
			,@SurveyId int 
			,@EntityTypeId int
			,@EntityId int
			,@ModifiedBy int 
			,@Id int 
			
AS 

/*
		DECLARE @Id int = 13
			   ,@Name nvarchar(100) = 'Joseph Jop'
			   ,@Version nvarchar(100) = 'Updated Version 3'
			   ,@WorkflowTypeId int = 2
			   ,@SurveyId int = 2
			   ,@EntityTypeId int = 3
			   ,@EntityId int = 3
			   ,@Modifiedby int = 3

		EXECUTE [dbo].[DesignatedSurveys_Update]
				@Name 
				,@Version
				,@WorkflowTypeId
				,@SurveyId
				,@EntityTypeId
				,@EntityId
				,@ModifiedBy
				,@Id 
				
Select * From dbo.DesignatedSurveys
*/

BEGIN

Declare @DateModified datetime2(7) = Getutcdate()
		UPDATE [dbo].[DesignatedSurveys]
		SET [Name] = @Name
			,[Version] = @Version
			,[WorkflowTypeId] = @WorkflowTypeId
			,[SurveyId] = @SurveyId
			,[EntityTypeId] = @EntityTypeId
			,[EntityId] = @EntityId
			,[ModifiedBy] = @ModifiedBy
			,[DateModified] = @DateModified
		Where Id = @Id

END 
GO
