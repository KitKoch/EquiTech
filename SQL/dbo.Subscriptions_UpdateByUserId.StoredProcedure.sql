GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Subscriptions_UpdateByUserId]
				@StripeProductId int,
				@UserId int

AS

/*------TEST CODE------

declare 
		@StripeProductId int  = 1 ,
		@UserId int  = 8

EXECUTE [dbo].[Subscriptions_UpdateByUserId]
		@StripeProductId,
		@UserId


*/

BEGIN 

UPDATE		[dbo].Subscriptions
SET			StripeProductId = @StripeProductId
WHERE		[UserId] = @UserId

END
GO
