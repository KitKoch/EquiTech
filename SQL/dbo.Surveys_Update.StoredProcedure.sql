GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Surveys_Update]
					@Name nvarchar(100)
					,@Description nvarchar(2000)
					,@StatusId int
					,@Id int 
as 

/*-------------TEST CODE--------------

		Declare @Id int = 1
					Declare @Name nvarchar(100) = 'Survey2'
										,@Description nvarchar(2000) = 'New Survey that I am testing update!'

					Execute [dbo].[Surveys_SelectById] 
												@Id 

					Execute [dbo].[Surveys_Update] 
											@Name 
											,@Description 
											,@Id 

					Execute [dbo].[Surveys_SelectById] 
												@Id 

*/

BEGIN 



		UPDATE [dbo].[Surveys]
		   SET [Name] = @Name
		      ,[StatusId] = @StatusId
			  ,[Description] = @Description
			  ,[DateModified] = GETUTCDATE()
		 WHERE Id = @Id




END 
				
GO
