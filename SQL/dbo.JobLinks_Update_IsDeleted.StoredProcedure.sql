GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[JobLinks_Update_IsDeleted]
		 @Id int 
		,@UserId int
		,@IsDeleted bit


as 

/*
TEST CODE	

select *
from dbo.joblinks

*/


BEGIN

DECLARE @DateModified datetime2(7) = GETUTCDATE();

UPDATE dbo.JobLinks
   SET 
	  IsDeleted = @IsDeleted,
      [DateModified] = @DateModified,
	  ModifiedBy = @UserId
      
 WHERE Id = @Id

 END 
GO
