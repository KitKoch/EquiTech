GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Jobs_Update_Status]
		 @Id int 


as 

/*


Declare @Id int = 81

execute [dbo].[Jobs_SelectById] @Id

Execute [dbo].[Jobs_Update_Status]
		@Id 

execute [dbo].[Jobs_SelectById] @Id

	


*/


BEGIN

DECLARE @DateModified datetime2(7) = GETUTCDATE();

UPDATE [dbo].[Jobs]
   SET 
	  JobStatusId = 2,
      [DateModified] = @DateModified
      
 WHERE Id = @Id

 END 


GO
