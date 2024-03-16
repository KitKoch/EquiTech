GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[CompensationElements_BatchInsert]
	@BatchElements dbo.BatchElements READONLY
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
	From dbo.CompensationPackages

	Select * 
	from dbo.CompensationElements
	Where Id = @Id	

*/

BEGIN

	INSERT INTO [dbo].[CompensationElements]
					   ([CompensationPackageId],
						[CompensationTypeId],
						[CompensationLabelId],
						[NumericValue]) 

				 SELECT	
					be.[CompensationPackageId],
					be.[CompensationTypeId],
					be.[CompensationLabelId],
					be.[NumericValue]

				FROM @BatchElements as be


END
GO
