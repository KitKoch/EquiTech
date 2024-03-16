GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Ratings_Select_ByCreatedBy]
							@PageIndex int
							,@PageSize int
							,@CreatedBy int

as

/*
Declare @param1 int = 0
		,@param2 int = 5
		,@CreatedBy int = '10'
Execute [dbo].[Ratings_Select_ByCreatedBy]
				@param1
				,@param2
				,@CreatedBy
*/


BEGIN

Declare @offset int = @PageIndex * @PageSize;

SELECT r.[Id]
      ,r.[Rating]
      ,r.[CommentId]
      ,r.[EntityTypeId]
      ,e.[Name] as EntityName
	  ,r.[EntityId]
      ,r.[CreatedBy]
	  ,u.[FirstName]
	  ,u.[LastName]
	  ,u.[Mi]
	  ,u.[AvatarUrl]
      ,r.[DateCreated]
      ,r.[ModifiedBy]
      ,r.[DateModified]
      ,r.[IsDeleted]
	  ,TotalCount = count(1) over()
  FROM [dbo].[Ratings] as r
  inner join dbo.EntityTypes as e on r.EntityTypeId = e.Id
  inner join dbo.Users as u on r.CreatedBy = u.Id
	Where r.CreatedBy = @CreatedBy
	Order by Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY

END
GO
