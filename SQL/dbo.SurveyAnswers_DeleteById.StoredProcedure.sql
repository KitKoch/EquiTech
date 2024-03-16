GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SurveyAnswers_DeleteById]
		@Id int

AS

/**-----Test Code----


Declare @Id int = 69
Execute dbo.SurveyAnswers_DeleteById @Id


*/
BEGIN
  
    DELETE FROM [dbo].[SurveyAnswers]
    WHERE Id = @Id;

END
GO
