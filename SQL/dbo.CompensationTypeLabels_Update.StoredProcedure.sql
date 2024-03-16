GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[CompensationTypeLabels_Update]
				(@CompensationTypeId int
				,@LabelId int)
AS
/*


Declare @CompensationTypeId int = 25
		,@LabelId int = 10

	Execute [dbo].[CompensationTypeLabels_DeleteById]
						@CompensationTypeId
						,@LabelId

	Select *
	From [dbo].[CompensationTypeLabels]


*/


BEGIN

UPDATE [dbo].[CompensationTypeLabels]
   SET [CompensationTypeId] = @CompensationTypeId
      ,[LabelId] = @LabelId
 WHERE @CompensationTypeId = [CompensationTypeId]

 END

GO
