GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Podcasts_Search_Page]
	@PageIndex int,
	@PageSize int,
	@Query nvarchar(50)
as

/*
declare @PageIndex int = 0,
		@PageSize int = 5,
		@query nvarchar(50) = 'new'
execute dbo.Podcasts_Search_Page
		@PageIndex,
		@PageSize,
		@Query

*/

begin
	declare @offset int = @PageIndex * @PageSize
SELECT p.[Id]
      ,[Title]
      ,[Description]
      ,[Url]
	  ,pt.[Id]
	  ,pt.[Name]
	  ,[CoverImageUrl]
      ,p.[DateCreated]
      ,p.[DateModified]
      ,u.Id 
	  ,u.FirstName
	  ,u.LastName
	  ,u.Mi
	  ,u.AvatarUrl
      ,[ModifiedBy]
	  ,TotalCount = count(*) over ()
  FROM [dbo].[Podcasts] as p inner join dbo.PodcastTypes as pt
  on p.PodcastTypeId = pt.Id
  inner join [dbo].[Users] as u 
  on u.Id = p.CreatedBy
  WHERE ([Title] LIKE '%' + @Query + '%' OR 
         [Description] LIKE '%' + @Query + '%')
	ORDER BY p.Id
	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY
end
GO
