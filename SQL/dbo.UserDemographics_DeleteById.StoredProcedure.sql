GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[UserDemographics_DeleteById]
 				   @Id int

/*
  Execute dbo.UserDemographics_DeleteById
				  
				   @Id = 1
				
*/
As
Begin

		Delete From dbo.UserDemographics

		Where Id = @Id

End
GO
