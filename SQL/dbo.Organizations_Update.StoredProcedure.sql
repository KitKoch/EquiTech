GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Organizations_Update]
@OrganizationTypeId int,
@Name nvarchar(200),
@Headline nvarchar(200),
@Description nvarchar(200),
@Logo nvarchar(200),
@LocationId int,
@Phone nvarchar(50),
@SiteUrl nvarchar(225),
@CreatedBy int,
@Id int 
/*---test---
execute dbo.Organizations_Update
1,
"updatedName",
"updatedHeadline",
"updatedDescription",
"updatedLogo",
1,
"updatedPhone",
"updatedSiteUrl",
1,
1


*/
as

begin 

declare @DateModified datetime2(7) = getutcdate()


Update dbo.Organizations


set  [OrganizationTypeId] = @OrganizationTypeId
           ,[Name] = @Name
           ,[Headline] = @Headline
           ,[Description] = @Description
           ,[Logo] = @Logo
           ,[LocationId] = @LocationId
           ,[Phone] = @Phone
           ,[SiteUrl] = @SiteUrl
           ,[DateModified] = @DateModified
           ,[CreatedBy] = @CreatedBy
where Id = @Id
end
GO
