GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[CompensationTypes_SelectAll_ByCompensationType]

	
as

/* ----- Test Code -----
	
	Execute [dbo].[CompensationTypes_SelectAll_ByCompensationType]
	


*/

BEGIN

Select 
		TypeId = ct.Id
		,CompensationType = ct.Name
		,Label =cl.Name
		,Description =cl.Description

	From dbo.CompensationTypeLabels as ctl inner join dbo.CompensationTypes as ct
		on ctl.CompensationTypeId = ct.Id
	inner join dbo.CompensationLabels as cl
		on ctl.LabelId = cl.Id

END
GO
