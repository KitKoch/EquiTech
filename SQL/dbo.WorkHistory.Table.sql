GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkHistory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [nvarchar](100) NOT NULL,
	[CompanyContact] [nvarchar](200) NOT NULL,
	[CompanyEmail] [nvarchar](255) NOT NULL,
	[CompanyPhone] [nvarchar](20) NOT NULL,
	[LocationId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[IndustryId] [int] NOT NULL,
	[StartDate] [datetime2](7) NOT NULL,
	[EndDate] [datetime2](7) NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_WorkHistory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[WorkHistory] ADD  CONSTRAINT [DF_WorkHistory_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[WorkHistory] ADD  CONSTRAINT [DF_WorkHistory_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[WorkHistory]  WITH CHECK ADD  CONSTRAINT [FK_WorkHistory_Industries] FOREIGN KEY([IndustryId])
REFERENCES [dbo].[Industries] ([Id])
GO
ALTER TABLE [dbo].[WorkHistory] CHECK CONSTRAINT [FK_WorkHistory_Industries]
GO
ALTER TABLE [dbo].[WorkHistory]  WITH CHECK ADD  CONSTRAINT [FK_WorkHistory_Locations] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[WorkHistory] CHECK CONSTRAINT [FK_WorkHistory_Locations]
GO
ALTER TABLE [dbo].[WorkHistory]  WITH CHECK ADD  CONSTRAINT [FK_WorkHistory_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[WorkHistory] CHECK CONSTRAINT [FK_WorkHistory_Users]
GO
