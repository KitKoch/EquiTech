GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Appointments_Delete]
						@Id int




/*-----Test Code----


	Declare @Id int = '7'
			,@StatusTypesId int = '1'

	Execute dbo.Appointments_Delete @StatusTypesId, @ModifiedBy, @Id

	Select	*
	From dbo.Appointments

*/


as

BEGIN

	Declare @datMod datetime2(7) = getutcdate();

	Update dbo.Appointments
			Set [StatusTypesId] = 5


	Where Id = @Id


END
GO
