GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[JobWageTypes_SelectAll]

as

/**/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[JobWageTypes]

END



GO
