GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Forums_Update]
    @Id int,
    @Name nvarchar(200),
    @Description nvarchar(4000),
    @ForumCategoryId int,
    @IsPrivate bit,
    @IsClosed bit
AS
/*
DECLARE   @Id int = 3
		 ,@Name nvarchar(200) = 'Updated Forum Name'
		 ,@Description nvarchar(4000) = 'Updated Forum Description'
		 ,@ForumCategoryId int = 2
		 ,@IsPrivate bit = 0
		 ,@IsClosed bit = 0

EXEC [dbo].[Forums_Update] 
			@Id
			,@Name
			,@Description
			,@ForumCategoryId
			,@IsPrivate
			,@IsClosed
SELECT *
FROM dbo.Forums

*/
BEGIN
	DECLARE @DateModified datetime2 = getutcdate()

    UPDATE dbo.Forums
    SET [Name] = @Name,
        [Description] = @Description,
        ForumCategoryId = @ForumCategoryId,
        IsPrivate = @IsPrivate,
        IsClosed = @IsClosed,
		DateModified = @DateModified
    WHERE Id = @Id
END
GO
