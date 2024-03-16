GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Subscriptions_Insert]
				@SessionId nvarchar(150),
				@SubscriptionId nvarchar(50),
				@StripeProductId int,
				@UserId int,
				@CustomerId nvarchar(50),
				@Id int OUTPUT

AS

/*------TEST CODE------

declare @SessionId nvarchar(150) = 'test_id',
		@SubscriptionId nvarchar(50) = 'test_id',
		@StripeProductId int  = 1 ,
		@UserId int  = 1,
		@CustomerId nvarchar(50) = 'test_id'

EXECUTE [dbo].[Subscriptions_Insert]
		@SubscriptionId,
		@StripeProductId,
		@UserId,
		@CustomerId

select*
from dbo.Subscriptions

truncate table dbo.Subscriptions

*/

BEGIN 

INSERT INTO [dbo].[Subscriptions]
           ([SessionId]
		   ,[SubscriptionId]
           ,[StripeProductId]
           ,[UserId]
           ,[CustomerId])
     VALUES
           (@SessionId
		   ,@SubscriptionId
           ,@StripeProductId
           ,@UserId
           ,@CustomerId)

			Set @Id = SCOPE_IDENTITY()

END
GO
