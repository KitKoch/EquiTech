GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveysInstances_Insert]
					@SurveyId int,
					@UserId int,
					@Id int OUTPUT
as

/*----------TEST CODE---------

		DECLARE @Id int = 0;

		DECLARE	 @SurveyId int = 2,
				 @UserId int = 198
				
		EXEC dbo.SurveysInstances_Insert
			@SurveyId,
		    @UserId,
			@Id OUTPUT

*/

BEGIN 

		INSERT INTO [dbo].[SurveysInstances]
				   ([SurveyId]
				   ,[UserId])
				  
			VALUES
					(@SurveyId
					, @UserId)
					
		SET @Id = SCOPE_IDENTITY()

END
GO
