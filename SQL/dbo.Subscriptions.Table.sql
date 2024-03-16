GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subscriptions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SessionId] [nvarchar](150) NOT NULL,
	[SubscriptionId] [nvarchar](50) NOT NULL,
	[StripeProductId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[CustomerId] [nvarchar](50) NOT NULL,
	[Status] [bit] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Subscriptions_1] PRIMARY KEY CLUSTERED 
(
	[SessionId] ASC,
	[SubscriptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Subscriptions] ADD  CONSTRAINT [DF_Subscriptions_Status]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Subscriptions] ADD  CONSTRAINT [DF_Subscriptions_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
