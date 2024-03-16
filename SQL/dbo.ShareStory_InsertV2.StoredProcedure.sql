GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[ShareStory_InsertV2]
				 @Name nvarchar(50) 
			   ,@Email nvarchar(50) 
			   ,@Story nvarchar(3000)
			   ,@CreatedBy int
			   ,@FileId int = null
			   ,@Id int OUTPUT

AS
/*		~Test~
	DECLARE @Id int = 0;
	DECLARE 
			 @Name nvarchar(50) = 'This is Story 1'
			   ,@Email nvarchar(50)= 'Story1@email.com'
			   ,@Story nvarchar(3000) ='This is the story in long form, This is the story in long form'
			   ,@CreatedBy int = 8
			   ,@FileId int = 9

	Execute [dbo].[ShareStory_InsertV2]
									@Name
								   ,@Email
								   ,@Story
								   ,@CreatedBy
								   ,@FileId
									,@Id OUTPUT
	 select * 
	from dbo.sharestory
*/
BEGIN


INSERT INTO dbo.ShareStory
           ([Name]
			,[Email]
			,[Story]
			,[FileId]
			,[CreatedBy])
     VALUES
				(@Name
			   ,@Email
			   ,@Story
			   ,@FileId
			   ,@CreatedBy)
			SET @Id = SCOPE_IDENTITY()
END
GO
