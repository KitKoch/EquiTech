GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[CompensationTypesLabel_Insert]
								(@CompensationTypeId int
								,@LabelId int)



AS

/* ----- Test Code -----
	Declare @CompensationTypeId int = 3
			,@LabelId int = 3
	
	Execute [dbo].[CompensationTypesLabel_Insert]
			@CompensationTypeId
			,@LabelId
	
	Select *
	From [dbo].[CompensationTypeLabels]

	Select *
	From [dbo].[CompensationTypes]


	

*/

BEGIN




INSERT INTO [dbo].[CompensationTypeLabels]
           ([CompensationTypeId]
           ,[LabelId])
     VALUES
           (@CompensationTypeId
           ,@LabelId)



END
GO
