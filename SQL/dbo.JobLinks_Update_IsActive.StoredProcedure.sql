GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobLinks_Update_IsActive]
		 @Id int 
		 ,@IsActive bit
		 ,@UserId int


as 

/*
TEST CODE	


Select *
from dbo.JobLinks

*/


BEGIN

DECLARE @DateModified datetime2(7) = GETUTCDATE();

UPDATE dbo.JobLinks
   SET 
	  IsActive = @IsActive,
      [DateModified] = @DateModified,
	  ModifiedBy = @UserId
      
 WHERE Id = @Id

 END 
GO
