GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationElements_SelectByCompPackageId]

	@CompPackageId int

	as

/* ----- Test Code -----
	
	Execute [dbo].[CompensationElements_SelectByCompPackageId]
	@CompPackageId = 3

*/

BEGIN
SELECT

	mt.[Id],

	cp.[OrgId],
	cp.[CreatedBy],
	cp.[ModifiedBy],
	cp.[IsDeleted],
	cl.[Description],
	mt.[NumericValue],

	mt.[CompensationPackageId],
	cp.[Name],
	mt.[CompensationLabelId],
	cl.[Name],
	mt.[CompensationTypeId],
	ct.[Name]

	FROM dbo.[CompensationElements] as mt 
					INNER JOIN dbo.[CompensationPackages] as cp
					ON cp.[Id] = mt.[CompensationPackageId]
					INNER JOIN dbo.[CompensationTypes] as ct
					ON ct.[Id] = mt.[CompensationTypeId]
					INNER JOIN dbo.[CompensationLabels] as cl
					ON cl.[Id] = mt.[CompensationLabelId]

					WHERE mt.[CompensationPackageId] = @CompPackageId
					
END
GO
