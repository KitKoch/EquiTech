GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[FileTypes_SelectAll]

as

/*  ++ testing ++
	
	execute dbo.FileTypes_SelectAll

*/

begin

	select Id, [Name]
	from dbo.FileTypes

end
GO
