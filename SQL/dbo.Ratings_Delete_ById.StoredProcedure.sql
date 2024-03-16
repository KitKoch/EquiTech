GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Ratings_Delete_ById]
					@Id int
					,@UserId int

as

/*

Declare @Id int = 3
		,@UserId int = 3

Execute [dbo].[Ratings_Delete_ById]
					@Id
					,@UserId

*/


BEGIN


UPDATE [dbo].[Ratings]
   SET [ModifiedBy] = @UserId
      ,[DateModified] = GETUTCDATE()
      ,[IsDeleted] = 1
	  
 WHERE Id = @Id
 AND CreatedBy = @UserId

 END
GO
