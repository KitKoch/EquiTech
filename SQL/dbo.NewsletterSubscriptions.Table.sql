GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewsletterSubscriptions](
	[Email] [nvarchar](255) NOT NULL,
	[IsSubscribed] [bit] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_NewsletterSubscriptions] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[NewsletterSubscriptions] ADD  CONSTRAINT [DF_NewsletterSubscriptions_IsSubscribed]  DEFAULT ((1)) FOR [IsSubscribed]
GO
ALTER TABLE [dbo].[NewsletterSubscriptions] ADD  CONSTRAINT [DF_NewsletterSubscriptions_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[NewsletterSubscriptions] ADD  CONSTRAINT [DF_NewsletterSubscriptions_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
USE [Fairly]
GO
/****** Object:  Table [dbo].[NewsletterSubscriptions]    Script Date: 02-May-23 1:34:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewsletterSubscriptions](
	[Email] [nvarchar](255) NOT NULL,
	[IsSubscribed] [bit] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_NewsletterSubscriptions] PRIMARY KEY CLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[NewsletterSubscriptions] ADD  CONSTRAINT [DF_NewsletterSubscriptions_IsSubscribed]  DEFAULT ((1)) FOR [IsSubscribed]
GO
ALTER TABLE [dbo].[NewsletterSubscriptions] ADD  CONSTRAINT [DF_NewsletterSubscriptions_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[NewsletterSubscriptions] ADD  CONSTRAINT [DF_NewsletterSubscriptions_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
