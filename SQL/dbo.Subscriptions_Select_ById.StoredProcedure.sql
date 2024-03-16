GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Subscriptions_Select_ById]
				@Id int 

AS

/*------TEST CODE------

declare @Id int = 7
EXECUTE [dbo].[Subscriptions_Select_ById]
							@Id


*/

BEGIN 


SELECT s.[Id]
      ,[SessionId]
      ,[SubscriptionId]
      ,sp.Id
	  ,sp.ProductId
	  ,sp.PriceId
	  ,sp.Amount
	  ,sp.[Name]
      ,u.Id
	  ,u.FirstName
	  ,u.LastName
	  ,u.Mi
	  ,u.AvatarUrl
      ,[CustomerId]
      ,[Status]
      ,s.[DateCreated]
  FROM [dbo].[Subscriptions] as s
  inner join dbo.Users as u
  on s.UserId = u.Id
  inner join dbo.StripeProducts as sp
  on s.StripeProductId = sp.Id
  WHERE s.Id = @Id





END
GO
