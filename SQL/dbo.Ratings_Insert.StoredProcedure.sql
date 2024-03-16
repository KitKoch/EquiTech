GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Ratings_Insert]
					@Rating tinyint
					,@CommentId int
					,@EntityTypeId int
					,@EntityId int
					,@CreatedBy int
					,@Id int OUTPUT

as

/*

Declare @Id int = 0
		,@Rating tinyint = 3
		,@CommentId int = 16
		,@EntityTypeId int = 3
		,@EntityId int = 3
		,@CreatedBy int = 10

Execute [dbo].[Ratings_Insert]
					@Rating 
					,@CommentId 
					,@EntityTypeId 
					,@EntityId 
					,@CreatedBy 
					,@Id
				
*/


BEGIN

declare @datenow datetime2 = getutcdate()

INSERT INTO [dbo].[Ratings]
           ([Rating]
           ,[CommentId]
           ,[EntityTypeId]
           ,[EntityId]
           ,[CreatedBy]
           ,[DateCreated]
           ,[ModifiedBy]
           ,[DateModified])
     VALUES
           (@Rating 
			,@CommentId 
			,@EntityTypeId 
			,@EntityId
			,@CreatedBy
			,@datenow
			,@CreatedBy
			,@datenow
			)
			Set @Id = SCOPE_IDENTITY();

END
GO
