GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Surveys_DeleteById]
				@Id int

as 

/*--------------TEST CODE------------

	Declare @Id int = 4

	Execute [dbo].[Surveys_DeleteById]
							@Id 

	Execute [dbo].[Surveys_SelectById] 
										@Id 

*/


BEGIN 



	DELETE FROM [dbo].[Surveys]
		  WHERE Id = @Id 




END 
GO
