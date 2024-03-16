GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Ratings_Select_ById]
						@Id int

as

/*

Declare @Id int = 3;
Execute [dbo].[Ratings_Select_ById]
							@Id

*/


BEGIN


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
  FROM [dbo].[Ratings] as r
  inner join dbo.EntityTypes as e on r.EntityTypeId = e.Id
  inner join dbo.Users as u on r.CreatedBy = u.Id
	Where r.Id = @Id


END
GO
