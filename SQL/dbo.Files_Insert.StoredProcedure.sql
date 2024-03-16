GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Files_Insert]
	@Name nvarchar(100),
	@Url nvarchar(255),
	@FileTypeId int,
	@IsDeleted bit,
	@CreatedBy int,
	@Id int output
as

/*  ++ testing ++
	
	execute dbo.Files_Insert 
	'testfile', 
	'https://pixabay.com/photos/tree-sunset-clouds-sky-silhouette-736885/',
	2,
	0,
	2,
	0

*/

begin

	insert into dbo.Files
	(Name ,
	Url ,
	FileTypeId ,
	IsDeleted ,
	CreatedBy) values
	(@Name,
	@Url,
	@FileTypeId,
	@IsDeleted,
	@CreatedBy)

	SET @Id = SCOPE_IDENTITY()

end
GO
