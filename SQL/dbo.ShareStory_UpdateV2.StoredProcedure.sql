GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ShareStory_UpdateV2]
						@Name nvarchar(50)
						,@Email nvarchar(50)
						,@Story nvarchar(3000)
						,@CreatedBy int
						,@FileId int 
						,@Id int
AS
/*		~~ TEST ~~

		DECLARE @Id int = 47
			,@Name nvarchar(50) = 'UPDATED NAME'
			,@Email nvarchar(50) = 'UPDATE@EMAIL.COM'
			,@Story nvarchar(3000) = 'UPDATED STORY VIA STORY, UPDATED STORY VIA STORY'
			,@CreatedBy int = 8
			,@FileId int = 6
			
	EXECUTE [dbo].[ShareStory_UpdateV2] 
			@Name
			,@Email
			,@Story 
			,@CreatedBy
			,@FileId
			,@Id  

DECLARE @Id int = 47
EXECUTE [dbo].[ShareStory_Select_ByIdV2] @Id

*/

BEGIN 
			Declare @DateNow datetime2(7) = GETUTCDATE();
			UPDATE [dbo].[ShareStory]
			   SET [Name] = @Name
				  ,[Email] = @Email
				  ,[Story] = @Story
				  ,[DateModified] = @DateNow
				  ,[FileId] = @FileId
END
GO
