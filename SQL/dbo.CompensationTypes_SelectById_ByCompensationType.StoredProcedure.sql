GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[CompensationTypes_SelectById_ByCompensationType]
					@Id int

	
as

/* ----- Test Code -----
	DECLARE @Id int = 2

	Execute [dbo].[CompensationTypes_SelectById_ByCompensationType]
							@Id
	

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
Where ct.Id = @Id

END
GO
