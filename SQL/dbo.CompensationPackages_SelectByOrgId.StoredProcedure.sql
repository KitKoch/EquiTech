GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationPackages_SelectByOrgId]

	@PageIndex int,
	@PageSize int,
	@OrgId int

	as

/* ----- Test Code -----
	
	Declare @PageIndex int = 0,
			@PageSize int = 10,
			@OrgId int = 1
	Execute [dbo].[CompensationPackages_SelectByOrgId]
			
			@PageIndex,
			@PageSize,
			@OrgId
			

*/

BEGIN

Declare @offset int = @PageIndex * @PageSize

	 SELECT

	 mt.[Id],
	 mt.[Name] as CompPackageName,
	 mt.[Description],
	 mt.[OrgId],

	 o.[Name] as OrgName,
	 mt.[CreatedBy] ,
	 mt.[ModifiedBy],

	 TotalCount = COUNT(1) OVER()
	 
	 from [dbo].[CompensationPackages] as mt
	 INNER JOIN Users c ON mt.CreatedBy = c.Id
	 INNER JOIN Users m ON mt.ModifiedBy = m.Id 
	 INNER JOIN Organizations o on o.Id = mt.OrgId
	 Where @OrgId = mt.OrgId
	

	 Order by mt.[Id]
	
	 OFFSET @offset Rows
	 Fetch Next @PageSize Rows ONLY


END
GO
