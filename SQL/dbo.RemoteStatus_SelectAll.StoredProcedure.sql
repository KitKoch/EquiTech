GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE Proc [dbo].[RemoteStatus_SelectAll]

as

/*

Execute [dbo].[RemoteStatus_SelectAll]

*/

BEGIN

SELECT [Id]
      ,[Name]
  FROM [dbo].[RemoteStatus]


END



GO
