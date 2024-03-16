GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationElements_SelectById]

	@CompElementId int

	as

/* ----- Test Code -----
	
	Execute [dbo].[CompensationElements_SelectById]
	@CompElementId = 5

	Select * 
	From dbo.CompensationElements

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

					WHERE mt.Id = @CompElementId
					
END
GO
