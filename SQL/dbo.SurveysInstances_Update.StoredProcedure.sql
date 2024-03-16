GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveysInstances_Update]
				@SurveyId int
				,@UserId int
				,@Id int 

AS 

/*-------------TEST CODE--------------

	Declare @Id int = 40

	Declare @SurveyId int = 1
			,@UserId int = 6

	Execute [dbo].[SurveysInstances_Update]
			@SurveyId
			,@UserId 
			,@Id 				

*/

BEGIN 

	DECLARE @DateModified datetime2(7) = GETUTCDATE()

	UPDATE [dbo].[SurveysInstances]
		SET	[SurveyId] = @SurveyId
			,[UserId] = @UserId
			,[DateModified] = @DateModified

	WHERE Id = @Id

END 
				
GO
