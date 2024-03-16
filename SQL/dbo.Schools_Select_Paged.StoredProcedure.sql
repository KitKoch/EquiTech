GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Schools_Select_Paged]
		@PageIndex int
		,@PageSize int

AS

BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT s.[Id]
      ,s.[Name]
      ,l.[LineOne] as Address1
	  ,l.[LineTwo] as Address2
	  ,l.[City]
	  ,st.[Name] as State
	  ,l.[Zip]
      ,s.[isDeleted]
      ,s.[isVerified]
	  ,u.Id
	  ,u.FirstName
	  ,u.LastName
	  ,u.AvatarUrl
	  ,uu.Id
	  ,uu.FirstName
	  ,uu.LastName
	  ,uu.AvatarUrl
      ,s.[DateCreated]
      ,s.[DateModified]

  FROM [dbo].[Schools] s INNER JOIN [dbo].[Locations] l
  ON s.LocationId = l.Id
  JOIN [dbo].[States] st
  ON st.Id = l.StateId
  JOIN [dbo].[Users] u
  ON s.CreatedBy = u.Id 
  JOIN [dbo].[Users] uu
  ON s.ModifiedBy = uu.Id

  ORDER BY s.Id
	  OFFSET @offSet ROWS
	  FETCH NEXT @PageSize ROWS ONLY
  


END


GO
