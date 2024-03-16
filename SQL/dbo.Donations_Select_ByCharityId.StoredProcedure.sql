GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 CREATE PROC [dbo].[Donations_Select_ByCharityId]
					@CharityId int
 AS

 /*

	DECLARE @CharityId int = '1'

 
	EXECUTE dbo.Donations_Select_ByCharityId
			@CharityId
 
 */

 BEGIN

SELECT		 d.[Id]
			,cf.Id
			,cf.Name
			,cf.Description
			,cf.Url
			,d.[OrderId]
			,d.[UnitCost]
			,u.[Id]
			,u.[FirstName]
			,u.[LastName]
			,u.[Mi]
			,u.[AvatarUrl]
			,d.[DateCreated]
  FROM [dbo].[Donations] as d
			inner JOIN dbo.CharitableFunds as cf on d.CharitableFundId = cf.Id
			inner JOIN dbo.Users as u on d.CreatedBy = u.Id
  Where [CharitableFundId] = @CharityId

END


GO
