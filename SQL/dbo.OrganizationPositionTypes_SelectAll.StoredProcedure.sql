GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[OrganizationPositionTypes_SelectAll]

/*--test--
execute dbo.OrganizationPositionTypes_SelectAll
*/

as

begin

select PositionTypeId, Name
from dbo.OrganizationPositionTypes

end
GO
