GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	CREATE PROC [dbo].[Newsletters_Delete_ById]
									  @Id int								
	as
/*	
		DECLARE  @Id int = 2
				,@PageIndex int	= 0
				,@PageSize int = 5	

		EXECUTE dbo.Newsletters_SelectAll
									 @PageIndex 	
									,@PageSize 		

		EXECUTE dbo.Newsletters_Delete_ById
										@Id 		

		EXECUTE dbo.Newsletters_SelectAll
									 @PageIndex 	
									,@PageSize 		

*/
	BEGIN
		
			DELETE FROM [dbo].[Newsletters]
				  WHERE Id = @Id

	END
GO
