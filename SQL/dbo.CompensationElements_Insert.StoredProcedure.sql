GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[CompensationElements_Insert]
	@CompensationPackageId  int,
	@CompensationTypeId int,
	@CompensationLabelId int,
	@NumericValue int,
	@Id int OUTPUT
as

/* ----- Test Code -----
	
	Declare @Id int = 0,

	@CompensationPackageId int = 3, 
	@CompensationTypeId int = 1,
	@CompensationLabelId int = 1,
	@NumericValue int = 5000
	
	Execute [dbo].[CompensationElements_Insert] 

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

	Insert into [dbo].[CompensationElements]
	([CompensationPackageId],
	 [CompensationTypeId],
	 [CompensationLabelId],
	 [NumericValue]) 
	 
	 VALUES

   (@CompensationPackageId,
	@CompensationTypeId,
	@CompensationLabelId,
	@NumericValue)

	SET @Id = SCOPE_IDENTITY()

END
GO
