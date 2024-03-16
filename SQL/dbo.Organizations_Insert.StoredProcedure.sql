GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Organizations_Insert]
@OrganizationTypeId int,
@Name nvarchar(200),
@Headline nvarchar(200),
@Description nvarchar(200),
@Logo nvarchar(200),
@LocationId int,
@Phone nvarchar(50),
@SiteUrl nvarchar(225),
@CreatedBy int,
@Id int OUTPUT


/*--test---
execute dbo.Organizations_Insert
1,
"exName3",
"exHeadline3",
"exDesc3",
"exLogo3",
5,
"exPhone3",
"exSiteUrl3",
1,
0

select *
from dbo.Organizations
*/
as

begin


INSERT INTO [dbo].[Organizations]
           (
            [OrganizationTypeId]
           ,[Name]
           ,[Headline]
           ,[Description]
           ,[Logo]
           ,[LocationId]
           ,[Phone]
           ,[SiteUrl]
           ,[CreatedBy]
		   )
     VALUES
           (@OrganizationTypeId
           ,@Name
           ,@Headline
           ,@Description
           ,@Logo
           ,@LocationId
           ,@Phone
           ,@SiteUrl
           ,@CreatedBy
		   )
SET @Id = SCOPE_IDENTITY()


end
GO
