GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Forums](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](4000) NOT NULL,
	[ForumCategoryId] [int] NOT NULL,
	[IsPrivate] [bit] NOT NULL,
	[IsClosed] [bit] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Forums] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Forums] ADD  CONSTRAINT [DF_Forums_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Forums] ADD  CONSTRAINT [DF_Forums_DateAdded]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Forums]  WITH CHECK ADD  CONSTRAINT [FK_Forums_ForumCategories] FOREIGN KEY([ForumCategoryId])
REFERENCES [dbo].[ForumCategories] ([Id])
GO
ALTER TABLE [dbo].[Forums] CHECK CONSTRAINT [FK_Forums_ForumCategories]
GO
