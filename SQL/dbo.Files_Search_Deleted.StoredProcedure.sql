GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Files_Search_Deleted]
	@PageIndex int,
	@PageSize int,
	@Query nvarchar(128),
	@IsSorting bit,
	@SortingType int,
	@IsAscending bit,
	@UserId int,
	@FileType int,
	@Extension nvarchar(10)

as

/*  ++ testing ++

	DECLARE 
		@PageIndex int = 0,
		@PageSize int = 10,
		@Query nvarchar(128) =  '',
		@IsSorting bit =  1,
		@SortingType int = 0,
		@IsAscending bit = 0,
		@UserId int = 0,
		@FileType int = 0,
		@Extension nvarchar = 'WEBP'

	execute dbo.Files_Search_V2 
		@PageIndex ,
		@PageSize ,
		@Query ,
		@IsSorting ,
		@SortingType ,
		@IsAscending ,
		@UserId ,
		@FileType ,
		@Extension 												

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
		DateCreated,
		f.FileSize,
		f.Downloaded,
		TotalCount = count(*) over()

	from dbo.FilesV2 as f 
	join dbo.FileTypes as ft
	on f.FileTypeId = ft.Id
	where 
	(
		(
			@UserId > 0 
			and 
			(	f.IsDeleted = 1 
				and
				f.Name like '%' + @Query + '%' 
				and 
				f.CreatedBy = @UserId
			)
		) 
		or
		(
			@UserId = 0 
			and 
			(	f.IsDeleted = 1 
				and
				f.Name like '%' + @Query + '%'
	)	)	)
	and 
	(
		(	@FileType = 1 
			and 
			(	f.Name like '%'+'png'+'%' 
				or f.Name like '%'+'jpg'+'%' 
				or f.Name like '%'+'jpeg'+'%' 
				or f.Name like '%'+'gif'+'%' 
				or f.Name like '%'+'webp'+'%' 
				or f.Name like '%'+'svg'+'%'
		)	) 
		or
		(	@FileType = 2 
			and 
			(	f.Name like '%'+'txt'+'%' 
				or f.Name like '%'+'xls'+'%' 
				or f.Name like '%'+'doc'+'%' 
				or f.Name like '%'+'pdf'+'%'
		)	) 
		or 
		(	@FileType = 3 
			and 
			(	f.Name like '%'+'csv'+'%' 
				or f.Name like '%'+'html'+'%' 
				or f.Name like '%'+'json'+'%' 
				or f.Name like '%'+'ppt'+'%' 
				or f.Name like '%'+'sql'+'%'
		)	) 
		or 
		(	@FileType = 0 
			and f.Name like '%' + '' + '%'
		)
	)
	and
	(	
		(	f.Name like '%'+ '.' + @Extension + '%'
	)	)

	order by
	(case when @IsSorting = 0 
		then f.Id end),
	(case when @IsAscending = 1 and @SortingType = 1 
		then f.Name end) ASC,
	(case when @IsAscending = 1 and @SortingType = 2 
		then convert(time, f.DateCreated)end) asc,
	(case when @IsAscending = 1 and @SortingType = 3 
		then f.FileSize end) asc,
	(case when @IsAscending = 1 and @SortingType = 4 
		then f.Downloaded end) asc,
	(case when @IsAscending = 0 and @SortingType = 1 
		then f.Name end) desc,
	(case when @IsAscending = 0 and @SortingType = 2 
		then convert(time, f.DateCreated) end) desc,
	(case when @IsAscending = 0 and @SortingType = 3 
		then f.FileSize end) desc,
	(case when @IsAscending = 0 and @SortingType = 4 
		then f.Downloaded end) desc
	
	offset @offset rows
	fetch next @PageSize rows only
end
GO
