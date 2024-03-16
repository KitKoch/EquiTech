GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Surveys_Insert]
					@Name nvarchar(100)
					,@Description nvarchar(2000)
					,@UserId int 
					,@Id int OUTPUT
as

/*----------TEST CODE---------

			Declare @Id int = 0;
			Declare @Name nvarchar(100) = 'Survey1'
								,@Description nvarchar(2000) = 'New Survey that I am testing!'
								,@UserId int = 3

			Execute [dbo].[Surveys_SelectById] 
										@Id 

			Execute [dbo].[Surveys_Insert] 
									@Name 
									,@Description 
									,@UserId 
									,@Id OUTPUT

			Execute [dbo].[Surveys_SelectById] 
										@Id 

						

*/

BEGIN 

	


		INSERT INTO [dbo].[Surveys]
				   ([Name]
				   ,[Description]
				   ,[StatusId]
				   ,[SurveyTypeId]
				   ,[CreatedBy])
			 VALUES
				   (@Name
				   ,@Description
				   ,(Select s.Id
					From [dbo].[SurveyStatus] as s
					Where s.Name = 'Active')
				   ,(Select st.Id
					From [dbo].[SurveyTypes] as st
					Where st.Name = 'Draft')
				   ,@UserId)
		Set @Id = SCOPE_IDENTITY()


END
GO
