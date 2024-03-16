GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create proc [dbo].[CompensationTypeLabels_SelectAll_LabelFiltered]

	
as

/* ----- Test Code -----
	
	Execute [dbo].[CompensationTypeLabels_SelectAll_LabelFiltered]
	


*/

BEGIN

Select 
		TypeId = ct.Id
		,CompensationType = ct.Name
		,LabelId = cl.Id
		,Label =cl.Name
		,Description =cl.Description

	From dbo.CompensationTypeLabels as ctl inner join dbo.CompensationTypes as ct
		on ctl.CompensationTypeId = ct.Id
	inner join dbo.CompensationLabels as cl
		on ctl.LabelId = cl.Id

END
GO
