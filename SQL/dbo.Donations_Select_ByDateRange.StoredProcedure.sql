GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[Donations_Select_ByDateRange]
					@StartDate datetime2(7)
					,@EndDate datetime2(7)
 AS

 /*

	DECLARE @StartDate datetime2(7) = '2023/03/23'
			,@EndDate datetime2(7) = '2023/04/26'
 
	EXECUTE dbo.Donations_Select_ByDateRange
			@StartDate
			,@EndDate
 
 */

 BEGIN

SELECT	d.[Id]
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
  Where d.[DateCreated] BETWEEN @StartDate and @EndDate 

END


GO
