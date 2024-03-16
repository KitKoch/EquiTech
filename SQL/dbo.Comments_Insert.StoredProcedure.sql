GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Comments_Insert]
            
			@Subject nvarchar(50)
		   ,@Text nvarchar(3000)
		   ,@ParentId int
		   ,@EntityTypeId int
		   ,@EntityId int
		   ,@CreatedBy int
		   ,@Id int OUTPUT

/*

Declare @Id int = 0

Declare  @Subject nvarchar(50) = 'CommentsSubject'
		,@Text nvarchar(3000) = 'CommentsText'
		,@ParentId int = 1
		,@EntityTypeId int = 2
		,@EntityId int = 1
		,@CreatedBy int = 1
		,@IsDeleted bit = 0
		
Execute [dbo].[Comments_Insert]
		
		 @Subject
		,@Text
		,@ParentId
		,@EntityTypeId
		,@EntityId
		,@CreatedBy
		,@IsDeleted

		,@Id OUTPUT

Select @Id

Select *
From [dbo].[Comments]
Where Id = @Id

select *
from dbo.Users
*/

as

BEGIN


INSERT INTO [dbo].[Comments]
           ([Subject]
           ,[Text]
           ,[ParentId]
           ,[EntityTypeId]
           ,[EntityId]
           ,[CreatedBy])
     VALUES
           (@Subject
           ,@Text
           ,@ParentId
           ,@EntityTypeId
           ,@EntityId
           ,@CreatedBy)

SET      @Id = SCOPE_IDENTITY()


END


GO
