GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[Donations_Select_ByCreatedBy_Paginated]
					@CreatedById int
					,@PageIndex int
					,@PageSize int
 AS

 /*

	DECLARE @CreatedById int = '202'
			,@PageIndex int = '0'
			,@PageSize int = '4'

 
	EXECUTE dbo.Donations_Select_ByCreatedBy_Paginated
			@CreatedById
			,@PageIndex
			,@PageSize
 
 */

 BEGIN

 Declare @Offset int = @PageSize * @PageIndex

	SELECT d.[Id]
		  ,cf.Id
		  ,cf.Name
		  ,cf.Description
		  ,cf.Url
		  ,d.[OrderId]
		  ,d.[UnitCost]
		  ,u.Id
		  ,u.[FirstName]
		  ,u.[LastName]
		  ,u.[Mi]
		  ,u.[AvatarUrl]
		  ,d.[DateCreated]
		  ,TotalCount = count(1) over()
	  FROM [dbo].[Donations] as d
				inner JOIN dbo.CharitableFunds as cf on d.CharitableFundId = cf.Id
				inner JOIN dbo.Users as u on d.CreatedBy = u.Id
	  Where d.[CreatedBy] = @CreatedById

	ORDER by d.Id
	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS only

END


GO
