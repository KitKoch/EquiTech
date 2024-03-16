GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Locations_Delete_ById]
								@Id int

as
/*

Select *
From dbo.Locations


Declare @Id int = 3
Execute [dbo].[Locations_Delete_ById] @Id

Select *
From dbo.Locations

*/


BEGIN

DELETE FROM [dbo].[Locations]
      WHERE Id = @Id

END

GO
