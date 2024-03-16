GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Forums_Insert] 
    @Name nvarchar(200)
    ,@Description nvarchar(4000)
    ,@ForumCategoryId int
    ,@IsPrivate bit
    ,@IsClosed bit
	,@Id int OUTPUT
   
AS
/*
DECLARE	@Name nvarchar(200)='juan'
		,@Description nvarchar(4000)='effaf'
		,@ForumCategoryId int = 1
		,@IsPrivate bit = 'false'
		,@IsClosed bit = 'false'
		,@Id int = 1
		
execute dbo.Forums_Insert
			@Name
			,@Description
			,@ForumCategoryId
			,@IsPrivate
			,@IsClosed
			,@Id OUTPUT
		
			SELECT * 
			FROM dbo.Forums
			WHERE Id = @Id
*/
BEGIN
    

    
    INSERT INTO [dbo].[Forums] 
						([Name]
						,[Description]
						,ForumCategoryId
						,IsPrivate
						,IsClosed)
    VALUES (@Name
			,@Description
			,@ForumCategoryId
			,@IsPrivate
			,@IsClosed)

	SET @Id = SCOPE_IDENTITY()

	


END
GO
