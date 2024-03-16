GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Venues_Update]
				@Id int
				,@Name nvarchar(255)
				,@Description nvarchar(4000)
				,@LocationId int
				,@Url nvarchar(255)
				,@ModifiedBy int
				
/*

DECLARE
		@Id int = 11
		,@Name nvarchar(255) = 'This is from SMSS'
		,@Description nvarchar(4000) ='SMSS TEST' 
		,@LocationId int = 3
		,@Url nvarchar(255) = 'https://www.allegiantstadium.com/'
		,@ModifiedBy int = 2

EXECUTE dbo.Venues_Update
		@Id
		,@Name
		,@Description
		,@LocationId
		,@Url
		,@ModifiedBy

*/


AS


BEGIN

	DECLARE @Date datetime2 = getutcdate()

	UPDATE dbo.Venues
		SET
			[Name] = @Name
			,[Description] = @Description
			,LocationId = @LocationId
			,[Url] = @Url
			,ModifiedBy = @ModifiedBy
			,DateModified = @Date

		WHERE Id = @Id

END
GO
