GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Ratings_Update]
					@Id int
					,@Rating tinyint
					,@CommentId int
					,@EntityTypeId int
					,@EntityId int
					,@ModifiedBy int

as

/*

Declare @Id int = 5
		,@Rating tinyint = 5
		,@CommentId int = 16
		,@EntityTypeId int = 3
		,@EntityId int = 3
		,@ModifiedBy int = 3

Execute [dbo].[Ratings_Update]
					@Id
					,@Rating 
					,@CommentId 
					,@EntityTypeId 
					,@EntityId 
					,@ModifiedBy 

*/


BEGIN

declare @datenow datetime2 = getutcdate()

UPDATE [dbo].[Ratings]
   SET [Rating] = @Rating
      ,[CommentId] = @CommentId
      ,[EntityTypeId] = @EntityTypeId
      ,[EntityId] = @EntityId
      ,[ModifiedBy] = @ModifiedBy
      ,[DateModified] = @datenow
 WHERE Id = @Id

 END

GO
