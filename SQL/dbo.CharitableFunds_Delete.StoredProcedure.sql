GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CharitableFunds_Delete]
				@Id int
				,@IsDeleted bit
AS
/*
	DECLARE			@Id int = 5
					,@IsDeleted bit = 'False'

	EXECUTE dbo.CharitableFunds_Delete @Id
										,@IsDeleted

	EXECUTE dbo.CharitableFunds_Select_ById @Id

*/

BEGIN

		UPDATE [dbo].[CharitableFunds]
		   SET [isDeleted] = @IsDeleted
			  ,[DateModified] = GETUTCDATE()
		 WHERE [Id] = @Id

END


GO
