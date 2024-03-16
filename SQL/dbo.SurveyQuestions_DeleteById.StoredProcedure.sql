GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[SurveyQuestions_DeleteById]
		@Id int


as


/*
Declare @Id int = 2 

Execute [dbo].[SurveyQuestions_Delete_ById] @Id


*/



BEGIN



DELETE FROM [dbo].[SurveyQuestions]
      WHERE Id = @Id



END




GO
