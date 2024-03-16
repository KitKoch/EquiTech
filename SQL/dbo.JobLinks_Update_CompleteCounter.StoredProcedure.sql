GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[JobLinks_Update_CompleteCounter]
		 @Id int 
		 


as 

/*
TEST CODE	

Select * from dbo.Joblinks where Id = 3


Declare @Id int = 3
		

Execute [dbo].[JobLinks_Update_CompleteCounter] @Id
												

Select * from dbo.Joblinks WHERE Id = @Id

*/


BEGIN


Declare @CurrentCompleteCounter int = (SELECT CompleteCounter
								from dbo.JobLinks
								WHERE id = @Id)

UPDATE dbo.JobLinks
   SET 
	  CompleteCounter = @CurrentCompleteCounter+1      
      
 WHERE Id = @Id

 END 
GO
