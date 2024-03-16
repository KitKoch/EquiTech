GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[JobStatus_SelectAll]

as

/*
 Execute [dbo]. [JobStatus_SelectAll]

*/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[JobStatus]


END


GO
