GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[FAQs_Insert]
	@Questions nvarchar(255)
    ,@Answer nvarchar(2000)
    ,@CategoryId int	
    ,@SortOrder int 
    ,@userId int
	,@Id int OUTPUT

AS

/*

DECLARE @Id int = 0;

DECLARE
	@Questions nvarchar(255) = 'Test Question for frequently asked question'
    ,@Answer nvarchar(2000) = 'Answer for frequently asked question'
    ,@CategoryId int = 1
    ,@SortOrder int = 1
    ,@userId int = 8

EXECUTE [dbo].[FAQs_Insert]
	@Questions
	,@Answer
	,@CategoryId
	,@SortOrder
	,@userId
	,@Id OUTPUT	
	
EXECUTE [dbo].[FAQs_SelectById] @Id

*/

BEGIN

	INSERT INTO [dbo].[FAQs]
			   ([Questions]
			   ,[Answer]
			   ,[CategoryId]
			   ,[SortOrder]
			   ,[CreatedBy]
			   ,[ModifiedBy])
		 VALUES
			   (@Questions
			   ,@Answer
			   ,@CategoryId
			   ,@SortOrder
			   ,@userId
			   ,@userId)

			   Set @Id = SCOPE_IDENTITY()

END


GO
