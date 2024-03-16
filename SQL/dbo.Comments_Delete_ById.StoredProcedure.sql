GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Comments_Delete_ById]
			@Id int,
			@ModifiedBy int

/*

Declare @Id int = 2

Execute dbo.[Comments_Select_ByEntityId] @Id
 Execute dbo.[Comments_Delete_ById] @Id
 Execute dbo.[Comments_Select_ByEntityId] @Id


 SELECT * FROM [dbo].[Comments]

*/

as 


BEGIN

DECLARE @DateModified datetime2(7) = GETUTCDATE();

UPDATE [dbo].[Comments]
	SET	[IsDeleted] = 1
	   ,[DateModified] = @DateModified
	
	WHERE Id = @Id
	and CreatedBy = @ModifiedBy

END


GO
