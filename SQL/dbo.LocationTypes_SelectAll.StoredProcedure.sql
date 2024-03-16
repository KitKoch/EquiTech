GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[LocationTypes_SelectAll]

as


/*

Execute [dbo].[LocationTypes_SelectAll]

*/


begin


SELECT [Id]
      ,[Name]
  FROM [dbo].[LocationTypes]

end

GO
