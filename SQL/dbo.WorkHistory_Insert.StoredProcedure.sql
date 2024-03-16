GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
											
CREATE PROC					[dbo].[WorkHistory_Insert]
							@CompanyName NVARCHAR(100)
							,@CompanyContact NVARCHAR(200)
							,@CompanyEmail NVARCHAR(255)
							,@CompanyPhone NVARCHAR(20)
							,@LocationId INT
							,@UserId INT
							,@IndustryId INT
							,@StartDate DATETIME2
							,@EndDate DATETIME2 = null
							,@Id INT OUTPUT

AS
/*--TestCode







	SELECT TOP 100			[Id]
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

	DECLARE					@CompanyName nvarchar(100) = 'CompanyName123'
							,@CompanyContact nvarchar(200) = 'CompanyContact123'
							,@CompanyEmail nvarchar(255) = 'email123@domain123.net'
							,@CompanyPhone nvarchar(20) = '(123)123-1234'
							,@LocationId int = 10
							,@UserId int = 6
							,@IndustryId int = 1
							,@StartDate datetime2 = '2023-04-21 17:45:47.5033333'
							,@EndDate datetime2 = '2023-04-26 17:45:47.5033333'
							,@Id int

	EXECUTE					[dbo].[WorkHistory_Insert]
							@CompanyName
							,@CompanyContact
							,@CompanyEmail
							,@CompanyPhone
							,@LocationId
							,@UserId
							,@IndustryId
							,@StartDate
							,@EndDate
							,@Id OUTPUT

	SELECT TOP 100			[Id]
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







*/

BEGIN


	INSERT INTO				[dbo].[WorkHistory]
							([CompanyName]
							,[CompanyContact]
							,[CompanyEmail]
							,[CompanyPhone]
							,[LocationId]
							,[UserId]
							,[IndustryId]
							,[StartDate]
							,[EndDate])

	VALUES					(@CompanyName
							,@CompanyContact
							,@CompanyEmail
							,@CompanyPhone
							,@LocationId
							,@UserId
							,@IndustryId
							,@StartDate
							,@EndDate)

	SET						@Id = SCOPE_IDENTITY()


END
GO
