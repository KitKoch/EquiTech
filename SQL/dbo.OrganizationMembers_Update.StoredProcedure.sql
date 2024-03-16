GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[OrganizationMembers_Update]
@OrganizationId int,
@UserId int, 
@UserRoleId int,
@PositionType int,
@OrganizationEmail nvarchar(100),
@Id int

/*---test---
execute dbo.OrganizationMembers_Update


*/
as

begin

Update  [dbo].OrganizationMembers
set			
           [OrganizationId] = @OrganizationId
           ,[UserId] = @UserId
           ,[UserRoleId] = @UserRoleId
           ,[PositionType] = @PositionType
           ,[OrganizationEmail] = @OrganizationEmail

where Id = @Id
   
end
GO
