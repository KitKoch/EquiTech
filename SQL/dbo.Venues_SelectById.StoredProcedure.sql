GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Venues_SelectById]
				@Id int

AS

/*

DECLARE @Id int = 15
EXECUTE dbo.Venues_SelectById @Id

*/


BEGIN

	SELECT
		Id
		,[Name]
		,[Description]
		,LocationId
		,[Url]
		,CreatedBy
		,ModifiedBy
		,DateCreated
		,DateModified

	FROM dbo.Venues
	WHERE Id = @Id

END
GO
