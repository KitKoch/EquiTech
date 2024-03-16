GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[GoalValues_Delete]
					@Id int

as
/* ---------- Test Code ----------

	Declare @Id int = 10

	EXecute dbo.Goals_Select_ById @Id

	Execute dbo.GoalValues_Delete @Id

	EXecute dbo.Goals_Select_ById @Id

*/

BEGIN

	DELETE FROM dbo.GoalValues
	WHERE GoalValues.GoalId = @Id

END
GO
