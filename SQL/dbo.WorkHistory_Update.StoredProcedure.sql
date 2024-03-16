GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc					[dbo].[WorkHistory_Update]
							@Id INT
							,@CompanyName NVARCHAR(100)
							,@CompanyContact NVARCHAR(200)
							,@CompanyEmail NVARCHAR(255)
							,@CompanyPhone NVARCHAR(20)
							,@LocationId INT
							,@UserId INT
							,@IndustryId INT
							,@StartDate DATETIME2
							,@EndDate DATETIME2 = null

as
/*--TestCode







	DECLARE					@CompanyName nvarchar(100) = 'CompanyName1234567'
							,@CompanyContact nvarchar(200) = 'CompanyContact123456'
							,@CompanyEmail nvarchar(255) = 'email123@domain12345.net'
							,@CompanyPhone nvarchar(20) = '(123)123-1234'
							,@LocationId int = 10
							,@UserId int = 6
							,@IndustryId int = 1
							,@StartDate datetime2 = '2023-04-21 17:45:47.5033333'
							,@EndDate datetime2 = '2023-04-26 17:45:47.5033333'
							,@Id int = 3

	SELECT					[Id]
							,[CompanyName]
							,[CompanyContact]
							,[CompanyEmail]
							,[CompanyPhone]
							,[LocationId]
							,[UserId]
							,[IndustryId]
							,[StartDate]
							,[EndDate]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[WorkHistory]
	WHERE					Id = @Id

	EXECUTE					[dbo].[WorkHistory_Update]
							@Id
							,@CompanyName
							,@CompanyContact
							,@CompanyEmail
							,@CompanyPhone
							,@LocationId
							,@UserId
							,@IndustryId
							,@StartDate
							,@EndDate

	SELECT					[Id]
							,[CompanyName]
							,[CompanyContact]
							,[CompanyEmail]
							,[CompanyPhone]
							,[LocationId]
							,[UserId]
							,[IndustryId]
							,[StartDate]
							,[EndDate]
							,[DateCreated]
							,[DateModified]

	FROM					[dbo].[WorkHistory]
	WHERE					Id = @Id







*/

BEGIN


	DECLARE					@DateModified datetime2(7) = getutcdate()

	UPDATE					[dbo].[WorkHistory]

	SET						[CompanyName] = @CompanyName
							,[CompanyContact] = @CompanyContact
							,[CompanyEmail] = @CompanyEmail
							,[CompanyPhone] = @CompanyPhone
							,[LocationId] = @LocationId
							,[UserId] = @UserId
							,[IndustryId] = @IndustryId
							,[StartDate] = @StartDate
							,[EndDate] = @EndDate
							,[DateModified] = @DateModified

	WHERE					Id = @Id


END
GO
