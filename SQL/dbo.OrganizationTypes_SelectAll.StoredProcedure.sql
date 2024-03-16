GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationTypes_SelectAll]
/*--test--
execute dbo.OrganizationTypes_SelectAll
*/
as

begin 

SELECT [Id]
      ,[Name]
  FROM [dbo].[OrganizationTypes]

end



GO
