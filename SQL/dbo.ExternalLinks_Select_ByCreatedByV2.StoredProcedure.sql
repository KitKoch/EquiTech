GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[ExternalLinks_Select_ByCreatedByV2]
					@PageIndex int 
					,@PageSize int
					,@CreatedBy int 
						
as

/*
Declare @PageIndex int = 0
				,@PageSize int = 10
				,@CreatedBy int = 205
Execute [dbo].[ExternalLinks_Select_ByCreatedByV2]
				@PageIndex 
				,@PageSize
				,@CreatedBy 


Select *
from dbo.externalLinks
WHERE UserId = 205
select *
from dbo.Urltypes

Select *
from dbo.users
*/


BEGIN

Declare @offSet int = @PageIndex * @PageSize 

SELECT e.[Id]
      ,e.[UserId]
	  ,u.[FirstName]
	  ,u.[LastName]
	  ,u.[Mi]
	  ,u.[AvatarUrl]
	  ,t.[Id] as UrlTypeId
	  ,t.[Name] as UrlTypeName
	  ,e.[Url]
	  ,CASE WHEN e.[EntityId] = 0 THEN NULL ELSE e.[EntityId] END as EntityId
	  ,et.[Id] as EntityTypeId
	  ,et.[Name] as EntityTypeName
      ,e.[DateCreated]
      ,e.[DateModified]
	  ,TotalCount = COUNT(1) OVER()
  FROM [dbo].[ExternalLinks] as e inner join dbo.UrlTypes as t
						on e.UrlTypeId = t.Id
								inner join dbo.Users as u 
						on e.UserId = u.Id
								left join dbo.EntityTypes as et
						on e.EntityId = et.Id
	Where u.Id = @CreatedBy
	Order by e.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	
END
GO
