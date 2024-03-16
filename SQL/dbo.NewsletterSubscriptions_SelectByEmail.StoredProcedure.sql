GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
														
CREATE proc					[dbo].[NewsletterSubscriptions_SelectByEmail]
							@Email nvarchar(255)
as
/*--TestCode

	DECLARE					@Email nvarchar(255) = 'LoveHumans364u75j7@earthlink.net';
	EXECUTE					[dbo].[NewsletterSubscriptions_SelectByEmail] @Email

*/

BEGIN
							
	SELECT					[Email]
							,[IsSubscribed]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[NewsletterSubscriptions]
	WHERE					Email = @Email

END
GO
