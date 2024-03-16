GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[BlogTypes_SelectAll]

as

/*
 Execute [dbo]. [BlogTypes_SelectAll]

*/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].BlogTypes


END
GO
