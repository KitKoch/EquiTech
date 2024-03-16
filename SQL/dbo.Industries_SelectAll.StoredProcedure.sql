GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[Industries_SelectAll] 
	
AS

/******************Test Code********************

	EXECUTE [dbo].[Industries_SelectAll]

*******************Test Code********************/

BEGIN

	SELECT Id,
		   Name

	FROM [dbo].[Industries]

END

GO
