GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[JobTypes_SelectAll]

as

/*

Execute [dbo].[JobType_SelectAll]

*/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[JobTypes]

END



GO
