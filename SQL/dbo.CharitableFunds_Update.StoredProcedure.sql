GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CharitableFunds_Update]
				@Id int
				,@Name nvarchar(100)
				,@Description nvarchar(1000)
				,@Url nvarchar(255)
AS

/*
	DECLARE			@Id int = 5
					,@Name nvarchar(100) = 'Charity 5 Updated'
					,@Description nvarchar(1000) = 'Decription Updated'
					,@Url nvarchar(255) = 'http://url.com'

	EXECUTE dbo.CharitableFunds_Update @Id
										,@Name
										,@Description
										,@Url

	EXECUTE dbo.CharitableFunds_Select_ById @Id

*/

BEGIN

		UPDATE [dbo].[CharitableFunds]
		   SET [Name] = @Name
			  ,[Description] = @Description
			  ,[Url] = @Url
			  ,[DateModified] = GETUTCDATE()
		 WHERE [Id] = @Id

END


GO
