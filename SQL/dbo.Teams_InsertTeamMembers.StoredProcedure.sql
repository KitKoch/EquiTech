GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Teams_InsertTeamMembers]
						@UserId int,
						@TeamId int,
						@CreatedBy int

AS

/*

Declare @UserId int = 2
		,@TeamId int = 4
		,@CreatedBy int = 3

Execute [dbo].[Teams_InsertTeamMembers]
		@UserId
		,@TeamId
		,@CreatedBy
				

SELECT * 
FROM dbo.TeamMembers

*/

BEGIN

DECLARE @datenow datetime2 = getutcdate()

INSERT INTO dbo.TeamMembers
			(
				UserId
				,TeamId
				,CreatedBy
				,DateCreated
			)
		VALUES
			(
				@UserId
				,@TeamId
				,@CreatedBy
				,@datenow
				)


END
GO
