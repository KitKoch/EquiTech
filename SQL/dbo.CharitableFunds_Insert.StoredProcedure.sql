GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[CharitableFunds_Insert]
					@Name nvarchar(100)
				   ,@Description nvarchar(1000)
				   ,@Url nvarchar(255)
				   ,@CreatedBy int

				   ,@Id int OUTPUT

as
/*

	DECLARE			@Name nvarchar(100)			= 'Charitable Fund 5'
				   ,@Description nvarchar(1000) = 'This is a description'
				   ,@Url nvarchar(255)			= 'http://url.com'
				   ,@CreatedBy int				= '202'
				   ,@Id int;

	EXECUTE dbo.CharitableFunds_Insert
					@Name
				    ,@Description
				    ,@Url
				    ,@CreatedBy
					,@Id OUTPUT

		EXECUTE dbo.CharitableFunds_Select_ById
				@Id

*/

BEGIN

	INSERT INTO [dbo].[CharitableFunds]
				   ([Name]
				   ,[Description]
				   ,[Url]
				   ,[CreatedBy])
     VALUES
					(@Name
				    ,@Description
				    ,@Url
				    ,@CreatedBy)
	SET				@Id = SCOPE_IDENTITY()
END

GO
