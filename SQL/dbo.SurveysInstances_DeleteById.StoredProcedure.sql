GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SurveysInstances_DeleteById]
		 @Id int
	
AS

/*

	DECLARE @Id int = 35

	EXECUTE [dbo].[SurveysInstances_DeleteById] @Id								
					
*/
BEGIN

	DELETE FROM dbo.SurveyAnswers
	WHERE [InstanceId]= @Id

    DELETE FROM [dbo].[SurveysInstances]
    WHERE [Id] = @Id 



END
GO
