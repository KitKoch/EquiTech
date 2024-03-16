GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE PROC [dbo].[Donations_Insert]
				@CharitableFundId int
				,@OrderId nvarchar(100)
				,@UnitCost int
				,@CreatedBy int
				,@Id int OUTPUT

 AS

 /*

	DECLARE		@CharitableFundId int = 1
				,@OrderId nvarchar(100) = '1'
				,@UnitCost int = 1000
				,@CreatedBy int = 202
				,@Id int;
 
	Execute dbo.Donations_Insert
				@CharitableFundId
				,@OrderId
				,@UnitCost
				,@CreatedBy
				,@Id OUTPUT
 
 */

 BEGIN

	INSERT INTO [dbo].[Donations]
			   ([CharitableFundId]
			   ,[OrderId]
			   ,[UnitCost]
			   ,[CreatedBy])
		 VALUES
			   (@CharitableFundId
			   ,@OrderId
			   ,@UnitCost
			   ,@CreatedBy)
		SET @Id = SCOPE_IDENTITY()

END

GO
