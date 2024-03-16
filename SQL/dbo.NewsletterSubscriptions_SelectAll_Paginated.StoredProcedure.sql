GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

														
CREATE proc					[dbo].[NewsletterSubscriptions_SelectAll_Paginated]
							@FilterMode int
							,@PageIndex int
							,@PageSize int
as
/*--TestCode

	DECLARE					@FilterMode int = 5
							,@PageIndex int = 0
							,@PageSize int = 10

	EXECUTE					[dbo].[NewsletterSubscriptions_SelectAll_Paginated]
							@FilterMode
							,@PageIndex
							,@PageSize

*/

DECLARE					@offset int = @PageIndex * @PageSize

IF (@FilterMode = 5)

BEGIN

	SELECT					[Email]
							,[IsSubscribed]
							,[DateCreated]
							,[DateModified]
							,TotalCount = Count(1) OVER()

	FROM					[dbo].[NewsletterSubscriptions]	
	
	ORDER BY				[DateCreated] DESC

	OFFSET					@offset Rows

	FETCH NEXT				@PageSize Rows ONLY

END

ELSE IF (@FilterMode = 2)

BEGIN

	SELECT					[Email]
							,[IsSubscribed]
							,[DateCreated]
							,[DateModified]
							,TotalCount = Count(1) OVER()

	FROM					[dbo].[NewsletterSubscriptions]

	WHERE					[IsSubscribed] = 1
	
	ORDER BY				[DateCreated] DESC

	OFFSET					@offset Rows

	FETCH NEXT				@PageSize Rows ONLY

END

ELSE IF (@FilterMode = 3)

BEGIN

	SELECT					[Email]
							,[IsSubscribed]
							,[DateCreated]
							,[DateModified]
							,TotalCount = Count(1) OVER()

	FROM					[dbo].[NewsletterSubscriptions]

	WHERE					[IsSubscribed] = 0
	
	ORDER BY				[DateCreated] DESC

	OFFSET					@offset Rows

	FETCH NEXT				@PageSize Rows ONLY

END
GO
