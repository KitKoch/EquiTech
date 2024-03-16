GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[ApplicationStatus_SelectAll]

as

/*

Execute [dbo].[ApplicationStatus_SelectAll]

*/


BEGIN


SELECT [Id]
      ,[Name]
  FROM [dbo].[ApplicationStatus]


END

GO
