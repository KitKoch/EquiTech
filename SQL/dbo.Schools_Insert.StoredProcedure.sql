GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Schools_Insert]
			@Name nvarchar(100)
			,@LocationId int
			,@LogoUrl nvarchar(100)
			,@CreatedBy int

			,@Id int OUTPUT

AS
/*
DECLARE 
			@Name nvarchar(100) = 'Other'
			,@LocationId int = 12
			,@LogoUrl nvarchar(100) = 'Nourl'
			,@CreatedBy int = 3
			,@Id int = 1

EXECUTE [dbo].[Schools_Insert]
			@Name
			,@LocationId
			,@LogoUrl 
			,@CreatedBy
			,@Id OUTPUT
			
*/

BEGIN


INSERT INTO [dbo].[Schools]
           ([Name]
           ,[LocationId]
		   ,[LogoUrl]
           ,[CreatedBy]
           ,[ModifiedBy]
		   )

	   VALUES
           (@Name
			,@LocationId
			,@LogoUrl
			,@CreatedBy
			,@CreatedBy
			)


	   SET @Id = SCOPE_IDENTITY()
END


GO
