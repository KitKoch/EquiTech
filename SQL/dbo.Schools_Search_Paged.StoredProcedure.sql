GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Schools_Search_Paged]
		@PageIndex int
		,@PageSize int
		,@Query nvarchar(100)
AS
/*
DECLARE @PageIndex int =0
DECLARE @PageSize int =5
DECLARE @Query nvarchar(100) = 'florida'
EXECUTE [dbo].[Schools_Search_Paged]
		@PageIndex
		,@PageSize
		,@Query
*/

BEGIN

DECLARE @offset int = @PageIndex * @PageSize

SELECT s.[Id]
      ,s.[Name]
	  ,l.[Id]
      ,l.[LineOne]
	  ,l.[LineTwo]
	  ,l.[City]
	  ,st.[Name] as State
	  ,l.[Zip]
	  ,s.[LogoUrl]
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
	  ,TotalCount = COUNT(1) OVER()

  FROM [dbo].[Schools] s INNER JOIN [dbo].[Locations] l
  ON s.LocationId = l.Id
  JOIN [dbo].[States] st
  ON st.Id = l.StateId
  JOIN [dbo].[Users] u
  ON s.CreatedBy = u.Id 
  JOIN [dbo].[Users] uu
  ON s.ModifiedBy = uu.Id
  WHERE (s.[Name] LIKE '%' + @Query + '%' 
		OR l.[City] LIKE '%' + @Query + '%' 
		OR st.[Name] LIKE '%' + @Query + '%')
  ORDER BY s.[Name]
	  OFFSET @offSet ROWS
	  FETCH NEXT @PageSize ROWS ONLY
  


END


GO
