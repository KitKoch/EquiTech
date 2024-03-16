GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Venues_Delete_ById]

				@Id int
as


/* -----TEST CODE-----

DECLARE @Id int = 5

Execute dbo.Venues_Delete_ById 
			@Id

*/ -----TEST CODE-----



BEGIN

	DELETE
		FROM dbo.Venues
		WHERE Id = @Id

END
GO
