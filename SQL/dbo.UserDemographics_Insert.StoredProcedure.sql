GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

  CREATE proc [dbo].[UserDemographics_Insert]
					@PreferredName nvarchar(100)
				   ,@Pronunciation nvarchar(100)
				   ,@AboutMe nvarchar(100)
				   ,@GenderId int
				   ,@UserId int

/*
  Execute dbo.UserDemographics_Insert
				    @PreferredName = 'Andi'
				   ,@Pronunciation ='an-dee'
				   ,@AboutMe ='cohort 126, graduated '
				   ,@GenderId = 1
				   ,@UserId = 7
				
*/
As
Begin

INSERT INTO [dbo].[UserDemographics]
				   (PreferredName
				   ,Pronunciation
				   ,AboutMe
				   ,GenderId
				   ,UserId
				   ,DateCreated
				   ,DateModified)

			 VALUES
				   (@PreferredName
				   ,@Pronunciation
				   ,@AboutMe
				   ,@GenderId
				   ,@UserId
				   ,GETUTCDATE()
				   ,GETUTCDATE());

End


GO
