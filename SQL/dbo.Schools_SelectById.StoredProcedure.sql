GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[Schools_SelectById]
		@Id int

AS
/*
DECLARE @Id int = 3
EXECUTE [dbo].[Schools_SelectById]
	@Id
*/

BEGIN

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
  WHERE s.[Id] = @Id


END


GO
