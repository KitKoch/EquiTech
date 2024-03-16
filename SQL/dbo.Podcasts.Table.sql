GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Podcasts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[Url] [nvarchar](200) NOT NULL,
	[PodcastTypeId] [int] NOT NULL,
	[CoverImageUrl] [nvarchar](200) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
 CONSTRAINT [PK_Podcasts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Podcasts] ADD  CONSTRAINT [DF_Podcasts_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Podcasts]  WITH CHECK ADD  CONSTRAINT [FK_Podcasts_PodcastTypes] FOREIGN KEY([PodcastTypeId])
REFERENCES [dbo].[PodcastTypes] ([Id])
GO
ALTER TABLE [dbo].[Podcasts] CHECK CONSTRAINT [FK_Podcasts_PodcastTypes]
GO
ALTER TABLE [dbo].[Podcasts]  WITH CHECK ADD  CONSTRAINT [FK_Podcasts_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Podcasts] CHECK CONSTRAINT [FK_Podcasts_Users]
GO
ALTER TABLE [dbo].[Podcasts]  WITH CHECK ADD  CONSTRAINT [FK_Podcasts_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Podcasts] CHECK CONSTRAINT [FK_Podcasts_Users1]
GO
