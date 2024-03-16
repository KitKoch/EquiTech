GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Files_InsertV3]
	@Name nvarchar(100),
	@Url nvarchar(255),
	@FileTypeId int,
	@FileSize int,
	@CreatedBy int,
	@Id int output
as

/*  ++ testing ++
	
	execute dbo.Files_InsertV3 
	'testfile', 
	'https://pixabay.com/photos/tree-sunset-clouds-sky-silhouette-736885/',
	2,
	181000,
	3,
	0

*/

begin

	insert into dbo.FilesV2
	(Name ,
	Url ,
	FileTypeId ,
	FileSize,
	CreatedBy) values
	(@Name,
	@Url,
	@FileTypeId,
	@FileSize,
	@CreatedBy)

	SET @Id = SCOPE_IDENTITY()

end
GO
