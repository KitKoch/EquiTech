GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[StripeProducts_SelectAll]
							

as



/*------TEST CODE------


Execute [dbo].[StripeProducts_SelectAll]

*/



BEGIN



SELECT [Id]
      ,[ProductId]
      ,[PriceId]
      ,[Amount]
      ,[Name]
  FROM [dbo].[StripeProducts]




END
GO
