GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[ReferenceTypes_SelectAll]
as
/*
execute dbo.ReferenceTypes_SelectAll
*/

begin


SELECT [Id]
      ,[Name]
  FROM [dbo].[ReferenceTypes]

end
GO
