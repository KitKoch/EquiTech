GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[CompensationElements_Update]
	@CompensationPackageId  int,
	@CompensationTypeId int,
	@CompensationLabelId int,
	@NumericValue int,
	@Id int OUTPUT
as

/* ----- Test Code -----
	
	Declare @Id int = 4,

	@CompensationPackageId int = 3, 
	@CompensationTypeId int = 1,
	@CompensationLabelId int = 1,
	@NumericValue int = 1,
	
	Execute [dbo].[CompensationElements_Update] 

	@CompensationPackageId, 
	@CompensationTypeId, 
	@CompensationLabelId, 
	@NumericValue,
	@Id OUTPUT
	

	Select * 
	from dbo.CompensationElements
	Where Id = @Id	

*/

BEGIN

UPDATE [dbo].[CompensationElements]

SET

	 [CompensationPackageId] = @CompensationPackageId,
	 [CompensationTypeId] = @CompensationTypeId,
	 [CompensationLabelId] = @CompensationLabelId,
	 [NumericValue] = @NumericValue
	
	 
Where [Id] = @Id

END
GO
