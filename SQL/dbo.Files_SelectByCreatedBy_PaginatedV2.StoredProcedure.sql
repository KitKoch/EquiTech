GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Files_SelectByCreatedBy_PaginatedV2]
	@PageIndex int,
	@PageSize int,
	@UserId int
as

/*  ++ testing ++
	
	execute dbo.Files_SelectByCreatedBy_PaginatedV2
	0, 10, 3

*/

begin
	declare @offset int = @PageIndex * @PageSize

	select f.Id, 
		f.Name, 
		f.Url,
		[FileType] = (
			select ft.Id, ft.[Name]
			from dbo.FileTypes as ft
			where ft.Id = f.FileTypeId
			for json auto, without_array_wrapper
		),
		f.DateCreated,
		f.FileSize,
		f.Downloaded,
		TotalCount = count(*) over ()

	from dbo.FilesV2 as f 
	join dbo.FileTypes as ft
	on f.FileTypeId = ft.Id
	
	where f.CreatedBy = @UserId and f.IsDeleted = 0
	order by f.DateCreated
	offset @offset rows
	fetch next @PageSize rows only

end
GO
