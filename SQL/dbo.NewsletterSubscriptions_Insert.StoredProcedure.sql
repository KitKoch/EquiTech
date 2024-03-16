GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
													
CREATE proc					[dbo].[NewsletterSubscriptions_Insert]
							@Email nvarchar(255)
							,@IsSubscribed bit
as
/*--TestCode

	SELECT TOP 100			[Email]
							,[IsSubscribed]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[NewsletterSubscriptions]

	DECLARE					@Email nvarchar(255) = 'email123@domain123.net'
							,@IsSubscribed bit = 1

	EXECUTE					[dbo].[NewsletterSubscriptions_Insert]
							@Email
							,@IsSubscribed

	SELECT TOP 100			[Email]
							,[IsSubscribed]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[NewsletterSubscriptions]

*/

BEGIN


	INSERT INTO				[dbo].[NewsletterSubscriptions]
							([Email]
							,[IsSubscribed])

	VALUES					(@Email
							,@IsSubscribed)

END
GO
