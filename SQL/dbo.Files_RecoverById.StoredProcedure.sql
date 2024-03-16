GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Files_RecoverById]
	@Id int
as

/*  ++ testing ++

	declare @id int

	execute dbo.Files_InsertV3
	'testfile', 
	'https://pixabay.com/photos/tree-sunset-clouds-sky-silhouette-736885/', 2, 0, 3, @id output
	
	select * from dbo.Files where Id = @id

	execute dbo.Files_DeleteByIdV2 @id
	execute dbo.Files_RecoverById @id

	select * from dbo.Files

*/

begin

	update dbo.FilesV2 
	set IsDeleted = 0
	where Id = @Id

end
GO
