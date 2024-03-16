GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[JobLinks_Update_TouchCounter]
		 @Id int 
		 


as 

/*
TEST CODE	

Select * from dbo.Joblinks where Id = 3


Declare @Id int = 3		

Execute [dbo].[JobLinks_Update_TouchCounter] @Id
											

Select * from dbo.Joblinks WHERE Id = @Id

*/


BEGIN


Declare @CurrentTouchCounter int = (SELECT TouchCounter
								from dbo.JobLinks
								WHERE id = @Id)

UPDATE dbo.JobLinks
   SET 
	  TouchCounter = @CurrentTouchCounter+1     
	 
      
 WHERE Id = @Id

 END 
GO
