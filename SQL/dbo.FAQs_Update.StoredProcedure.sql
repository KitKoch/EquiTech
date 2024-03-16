GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 CREATE PROC [dbo].[FAQs_Update]

			@Questions nvarchar(255)
			,@Answer nvarchar(2000)
			,@CategoryId int
			,@SortOrder int
			,@userId int
			,@Id int
			
AS

/*

DECLARE @Id int = 16

DECLARE 
	 @Questions nvarchar(255) ='updated again'
	,@Answer nvarchar(2000) = 'updated again'
	,@CategoryId int = 2
	,@SortOrder int = 2
	,@userId int = 8

EXECUTE [dbo].[FAQs_SelectById] @Id

EXECUTE dbo.FAQs_Update
	@Questions
	,@Answer
	,@CategoryId
	,@SortOrder
	,@userId
	,@Id

EXECUTE [dbo].[FAQs_SelectById] @Id

*/

BEGIN

UPDATE [dbo].[FAQs]

   SET [Questions] = @Questions
      ,[Answer] = @Answer
      ,[CategoryId] = @CategoryId
      ,[SortOrder] = @SortOrder
      ,[ModifiedBy] = @userId
	  ,[DateModified] = GETUTCDATE()

 WHERE Id = @Id

END
GO
