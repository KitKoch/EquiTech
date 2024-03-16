GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CharitableFunds_SelectAll]

AS

/*

	EXECUTE dbo.[CharitableFunds_SelectAll]

*/

BEGIN

	SELECT		cf.[Id]
				,cf.[Name]

	FROM		[dbo].[CharitableFunds] as cf

	Where		isDeleted = 0

END


GO
