GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROC [dbo].[CompensationTypeLabels_DeleteByTypeId]
								 @TypeId int
	as
/*------------ TEST CODE ------------

		DECLARE  @TypeId int = 6

		EXECUTE dbo.[CompensationTypeLabels_DeleteByTypeId]
								@TypeId 



--check the results, where the labels col should be null for the @TypeId
		EXECUTE CompensationTypeLabels_SelectAll_LabelUnfiltered



*/
	BEGIN


	Delete From [dbo].[CompensationTypeLabels]
		Where @TypeId = CompensationTypeId


	END
GO
