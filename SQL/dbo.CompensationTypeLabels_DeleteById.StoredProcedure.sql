GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CompensationTypeLabels_DeleteById]
					(@CompensationTypeId int
					,@LabelId int)

AS
/* ----- Test Code -----
	Declare @CompensationTypeId int = 25
					,@LabelId int = 10

	Execute [dbo].[CompensationTypeLabels_DeleteById]
						@CompensationTypeId
						,@LabelId
	
	Select *
	From [dbo].[CompensationTypeLabels]
	Select *
	From [dbo].[CompensationTypes]
	Select *
	From [dbo].[CompensationLabels]

*/

BEGIN


	DELETE FROM [dbo].[CompensationTypeLabels]
		  WHERE @CompensationTypeId = CompensationTypeId AND @LabelId = LabelId



END

GO
