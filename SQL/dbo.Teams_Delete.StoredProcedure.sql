GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Teams_Delete]
		@Id int


as

/* ---------------TEST-------------
	Declare @Id int = 4
	
	 Execute [dbo].[Teams_SelectById] @Id
	 SELECT * FROM dbo.TeamMembers

	 Execute [dbo].[Teams_Delete] @Id


	 Execute [dbo].[Teams_SelectById] @Id
	 SELECT * FROM dbo.TeamMembers


*/

BEGIN

DELETE FROM [dbo].[TeamMembers]
WHERE TeamId = @Id

DELETE FROM [dbo].[Teams]
WHERE Id = @Id




END
GO
