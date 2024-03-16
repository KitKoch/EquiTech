GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationPackages_SelectById]
	
	@CompPackageId int

	as

/* ----- Test Code -----
	
	Execute [dbo].[CompensationPackages_SelectById]
	@CompPackageId = 3

	Select *
	From dbo.CompensationPackages

*/

BEGIN

	 SELECT

	 mt.[Id],
	 mt.[Name] as CompPackageName,
	 mt.[Description],
	 
	 mt.[OrgId],

	 o.[Name] as OrgName,
	 mt.[CreatedBy],
	 mt.[ModifiedBy],
	 mt.[IsDeleted],
	 mt.[DateCreated],
	 mt.[DateModified]
	 
	 from [dbo].[CompensationPackages] as mt
	 INNER JOIN Users c ON mt.CreatedBy = c.Id
	 INNER JOIN Users m ON mt.ModifiedBy = m.Id 
	 INNER JOIN Organizations o on o.Id = mt.OrgId 

	 WHERE @CompPackageId = mt.[Id]


END
GO
