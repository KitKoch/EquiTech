GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[OrganizationMembers_Insert]
@OrganizationId int,
@UserId int, 
@UserRoleId int,
@PositionType int,
@OrganizationEmail nvarchar(100) = null,
@Id int OUTPUT

/*--test--
execute dbo.OrganizationMembers_Insert
1,
3,
1,
1,
"exOrganization@exOrg.com",
1

select *
from dbo.OrganizationMembers

*/
as

begin

INSERT INTO [dbo].[OrganizationMembers]
           (
           [OrganizationId]
           ,[UserId]
           ,[UserRoleId]
           ,[PositionType]
           ,[OrganizationEmail]
           )
     VALUES
           (
           @OrganizationId
           ,@UserId
           ,@UserRoleId
           ,@PositionType
           ,@OrganizationEmail
           )
set @Id = SCOPE_IDENTITY()



end
GO
