GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Appointments_Confirmation_Update]
						@Id int




/*-----Test Code----


	Declare @Id int = '3';

	Execute [dbo].[Appointments_Confirmation_Update] @Id

	Select *
	From dbo.appointments

*/


as

BEGIN

	Declare @datMod datetime2(7) = getutcdate();

	Update dbo.Appointments
			Set [IsConfirmed] = 1


	Where Id = @Id


END
GO
