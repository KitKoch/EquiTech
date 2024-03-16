GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Podcasts_SelectbyCreatedBy_Page]
	@PageIndex int,
	@PageSize int,
	@UserId int
as

/*
execute dbo.Podcasts_SelectbyCreatedBy_Page
0,5,6
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
	where CreatedBy = @UserId
	ORDER BY p.Id
	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY
end
GO
