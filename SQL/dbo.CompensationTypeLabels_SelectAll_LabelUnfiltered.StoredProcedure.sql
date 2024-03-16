GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[CompensationTypeLabels_SelectAll_LabelUnfiltered]

	
as

/* ----- Test Code -----
	
	Execute [dbo].[CompensationTypeLabels_SelectAll_LabelUnfiltered]
	

*/

BEGIN

Select 
		TypeId = ct.Id
		,CompensationType = ct.Name
		,Labels = (
						Select	cl.Id
								,cl.Name
								,col3 = cl.Description
						From dbo.CompensationLabels as cl inner join dbo.CompensationTypeLabels as ctl
							on ctl.LabelId = cl.Id
						Where ctl.CompensationTypeId = ct.Id

						For JSON AUTO)
		
		From dbo.CompensationTypes as ct

END
GO
