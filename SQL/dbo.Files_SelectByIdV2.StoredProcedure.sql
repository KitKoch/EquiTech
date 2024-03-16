GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[Files_SelectByIdV2]
	@FileId int
as

/*  ++ testing ++
	
	execute dbo.Files_SelectById 1
*/

begin

	select f.Id, 
		f.Name, 
		f.Url,
		[FileType] = (
			select ft.Id, ft.[Name]
			from dbo.FileTypes as ft
			where ft.Id = f.FileTypeId
			for json auto, without_array_wrapper
		),
		DateCreated,
		f.FileSize,
		f.Downloaded

	from dbo.FilesV2 as f 
	join dbo.FileTypes as ft
	on f.FileTypeId = ft.Id
	where f.Id = @FileId
end
GO
