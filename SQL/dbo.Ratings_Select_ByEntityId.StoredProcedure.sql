GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Ratings_Select_ByEntityId]
							@PageIndex int
							,@PageSize int
							,@EntityTypeId int
							,@EntityId int

as

/*
Declare @param1 int = 0
		,@param2 int = 5
		,@EntityTypeId int = 3
		,@EntityId int = 3

Execute [dbo].[Ratings_Select_ByEntityId]
				@param1
				,@param2
				,@EntityTypeId
				,@EntityId
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
	Where r.[EntityTypeId] = @EntityTypeId
	And r.[EntityId] = @EntityId
	Order by DateCreated DESC
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY


END
GO
