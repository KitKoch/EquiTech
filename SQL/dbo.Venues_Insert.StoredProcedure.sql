GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Venues_Insert]
					@Name nvarchar(255)
					,@Description nvarchar(4000)
					,@LocationId int
					,@Url nvarchar(255)
					,@CreatedBy int
					,@ModifiedBy int
					,@Id int OUTPUT

/* -----TEST CODE-----

DECLARE
	@Name nvarchar(255) = 'Allegiant Stadium'
	,@Description nvarchar(4000) = 'Stadium for sports, this is one of the newer statidum located in Las Vegas'
	,@LocationId int = 6
	,@Url nvarchar(255)= 'https://www.allegiantstadium.com/'
	,@CreatedBy int = 2
	,@ModifiedBy int = 2
	,@Id int = 0

EXECUTE dbo.Venues_Insert
	@Name
	,@Description
	,@LocationId
	,@Url
	,@CreatedBy
	,@ModifiedBy
	,@Id OUTPUT

*/-----TEST CODE-----

AS


BEGIN

	INSERT INTO dbo.Venues
			([Name]
			,[Description]
			,LocationId
			,[Url]
			,CreatedBy
			,ModifiedBy)

		VALUES
			(@Name
			,@Description
			,@LocationId
			,@Url
			,@CreatedBy
			,@ModifiedBy)
		SET @Id = SCOPE_IDENTITY();

END
GO
