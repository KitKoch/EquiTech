GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Comments_Update]
		 @Subject nvarchar(50) 
		,@Text nvarchar(3000) 
		,@ParentId int 
		,@EntityTypeId int 
		,@EntityId int
		,@ModifiedBy int
		,@Id int



/* -----TEST CODE------

Declare @Id int = 9
Declare @ModifiedBy int = 8

Declare @Subject nvarchar(50) = 'CommentsSubjectNew'
		,@Text nvarchar(3000) = 'CommentsTextNew'
		,@ParentId int = 1
		,@EntityTypeId int = 2
		,@EntityId int = 2
		,@CreatedBy int = 8

Select *
From [dbo].[Comments]
Where Id = @Id								
		
Execute [dbo].[Comments_Update]
	     @Subject
		,@Text
		,@ParentId
		,@EntityTypeId
		,@EntityId
		,@CreatedBy
		,@Id 

Select c.Id
From [dbo].[Comments]
Where Id = @Id
*/

as

BEGIN

DECLARE @DateModified datetime2(7) = GETUTCDATE();

UPDATE [dbo].[Comments]
   SET [Subject] = @Subject
      ,[Text] = @Text
      ,[ParentId] = @ParentId
      ,[EntityTypeId] = @EntityTypeId
      ,[EntityId] = @EntityId
	  ,[DateModified] = @DateModified

 WHERE Id = @Id
 and CreatedBy = @ModifiedBy

END
GO
