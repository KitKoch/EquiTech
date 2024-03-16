GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExternalLinks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[UrlTypeId] [int] NOT NULL,
	[Url] [nvarchar](255) NOT NULL,
	[EntityId] [int] NULL,
	[EntityTypeId] [int] NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ExternalLinks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ExternalLinks] ADD  CONSTRAINT [DF_ExternalLinks_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[ExternalLinks] ADD  CONSTRAINT [DF_ExternalLinks_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[ExternalLinks]  WITH CHECK ADD  CONSTRAINT [FK_ExternalLinks_UrlTypes] FOREIGN KEY([UrlTypeId])
REFERENCES [dbo].[UrlTypes] ([Id])
GO
ALTER TABLE [dbo].[ExternalLinks] CHECK CONSTRAINT [FK_ExternalLinks_UrlTypes]
GO
ALTER TABLE [dbo].[ExternalLinks]  WITH CHECK ADD  CONSTRAINT [FK_ExternalLinks_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ExternalLinks] CHECK CONSTRAINT [FK_ExternalLinks_Users]
GO
