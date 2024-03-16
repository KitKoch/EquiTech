GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[UserDemographics_SelectById]
 				   @Id int

/*
  Execute dbo.UserDemographics_SelectById
				  
				   @Id = 2
				
*/
As
Begin

             Select		
				    PreferredName
				   ,Pronunciation
				   ,AboutMe
				   ,GenderId
				   ,u.[Id] as userId
				   ,ud.DateCreated
				   ,ud.DateModified

		From [dbo].[UserDemographics] as ud
					inner join dbo.Users as u
						on u.Id = ud.userId

		Where ud.Id = @Id

End
GO
