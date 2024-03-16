GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Schools_SelectAll]
		

AS
/*
EXECUTE [dbo].[Schools_SelectAll]
*/

BEGIN

SELECT s.[Id]
      ,s.[Name]
	  ,l.[City]
	  ,st.[Name] as State


  FROM [dbo].[Schools] s INNER JOIN [dbo].[Locations] l
  ON s.LocationId = l.Id
  JOIN [dbo].[States] st
  ON st.Id = l.StateId
  ORDER BY s.[Name] ASC;


END


GO
