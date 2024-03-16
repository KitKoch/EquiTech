GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationTypeLabels_SelectById]
					@Id int

	
as

/* ----- Test Code -----
	DECLARE @Id int = 2

	Execute [dbo].[CompensationTypeLabels_SelectById]
							@Id
	

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
Where ct.Id = @Id

END
GO
