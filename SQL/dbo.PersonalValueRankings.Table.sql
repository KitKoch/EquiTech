GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonalValueRankings](
	[UserId] [int] NOT NULL,
	[PersonalValueId] [int] NOT NULL,
	[Rank] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_PersonalValueRankings] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[PersonalValueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PersonalValueRankings] ADD  CONSTRAINT [DF_PersonalValueRankings_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[PersonalValueRankings] ADD  CONSTRAINT [DF_PersonalValueRankings_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[PersonalValueRankings]  WITH CHECK ADD  CONSTRAINT [FK_PersonalValueRankings_PersonalValues] FOREIGN KEY([PersonalValueId])
REFERENCES [dbo].[PersonalValues] ([Id])
GO
ALTER TABLE [dbo].[PersonalValueRankings] CHECK CONSTRAINT [FK_PersonalValueRankings_PersonalValues]
GO
ALTER TABLE [dbo].[PersonalValueRankings]  WITH CHECK ADD  CONSTRAINT [FK_PersonalValueRankings_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[PersonalValueRankings] CHECK CONSTRAINT [FK_PersonalValueRankings_Users]
GO
USE [Fairly]
GO
/****** Object:  Table [dbo].[PersonalValueRankings]    Script Date: 5/2/2023 9:46:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonalValueRankings](
	[UserId] [int] NOT NULL,
	[PersonalValueId] [int] NOT NULL,
	[Rank] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[Sort] [int] NOT NULL,
 CONSTRAINT [PK_PersonalValueRankings] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[PersonalValueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PersonalValueRankings] ADD  CONSTRAINT [DF_PersonalValueRankings_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[PersonalValueRankings] ADD  CONSTRAINT [DF_PersonalValueRankings_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[PersonalValueRankings]  WITH CHECK ADD  CONSTRAINT [FK_PersonalValueRankings_PersonalValues] FOREIGN KEY([PersonalValueId])
REFERENCES [dbo].[PersonalValues] ([Id])
GO
ALTER TABLE [dbo].[PersonalValueRankings] CHECK CONSTRAINT [FK_PersonalValueRankings_PersonalValues]
GO
ALTER TABLE [dbo].[PersonalValueRankings]  WITH CHECK ADD  CONSTRAINT [FK_PersonalValueRankings_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[PersonalValueRankings] CHECK CONSTRAINT [FK_PersonalValueRankings_Users]
GO
