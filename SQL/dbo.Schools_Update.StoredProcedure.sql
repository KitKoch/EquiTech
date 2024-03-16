GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Schools_Update]
	@Name nvarchar(100)
	,@LocationId int
	,@ModifiedBy int
	,@Id int

AS

/*
	DECLARE
			@Name nvarchar(100) = 'Updated'
			,@LocationId int = 5
			,@ModifiedBy int = 3
			,@Id int = 3
		
			

	Execute dbo.Schools_Update
			@Name
			,@LocationId
			,@ModifiedBy
			,@Id
*/

BEGIN

DECLARE @DateModified datetime2(7) = GETUTCDATE()

UPDATE [dbo].[Schools]



   SET [Name] = @Name
      ,[LocationId] = @LocationId
      ,[ModifiedBy] = @ModifiedBy
      ,[DateModified] = @DateModified

 WHERE [Id] = @Id

 END



GO
