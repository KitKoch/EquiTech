GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[PersonalValueRankings_InsertV2]
					@UserId int
				   ,@PersonalValueId int
				   ,@Rank int
				   ,@Sort int
as 
/*  -------------------- TEST CODE -----------------------
	DECLARE @UserId int = 208
			,@PersonalValueId int =7
			,@Rank int = 1
			,@Sort int = 3

	EXECUTE dbo.PersonalValueRankings_InsertV2
			@UserId 
			,@PersonalValueId 
			,@Rank
			,@Sort

	EXECUTE dbo.PersonalValueRankings_Select_ByUserIdV3
			@UserId
*/
BEGIN

INSERT INTO [dbo].[PersonalValueRankings]
           ([UserId]
           ,[PersonalValueId]
           ,[Rank]
		   ,[Sort])
     VALUES
           (@UserId
           ,@PersonalValueId
           ,@Rank
		   ,@Sort)
END


GO
