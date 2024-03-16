GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Teams_DelTeamMembers]
						@UserId int,
						@TeamId int,
						@CreatedBy int

AS

/*

Declare @UserId int = 222
		,@TeamId int = 40
		,@CreatedBy int = 222

Execute [dbo].[Teams_DelTeamMembers]
		@UserId
		,@TeamId
		,@CreatedBy
				

SELECT * 
FROM dbo.TeamMembers

*/

BEGIN

DECLARE @datenow datetime2 = getutcdate()

DELETE FROM dbo.TeamMembers
where UserId = @UserId and TeamId = @TeamId


END
GO
