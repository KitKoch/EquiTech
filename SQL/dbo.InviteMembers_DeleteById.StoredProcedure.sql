GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	
CREATE PROCEDURE [dbo].[InviteMembers_DeleteById]
		@Id INT
AS

/*
	
	DECLARE @Id int = 200
	EXECUTE dbo.[InviteMembers_DeleteById]
			@Id

*/

BEGIN
		DELETE FROM [dbo].[InviteMembers]
		WHERE Id = @Id
END
GO
