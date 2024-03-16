GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Threads](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Subject] [nvarchar](255) NULL,
	[Content] [nvarchar](max) NOT NULL,
	[ForumId] [int] NOT NULL,
	[ParentId] [int] NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Threads] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Threads] ADD  CONSTRAINT [DF_Threads_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Threads] ADD  CONSTRAINT [DF_Threads_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Threads] ADD  CONSTRAINT [DF_Threads_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Threads]  WITH CHECK ADD  CONSTRAINT [FK_Threads_Forums] FOREIGN KEY([ForumId])
REFERENCES [dbo].[Forums] ([Id])
GO
ALTER TABLE [dbo].[Threads] CHECK CONSTRAINT [FK_Threads_Forums]
GO
ALTER TABLE [dbo].[Threads]  WITH CHECK ADD  CONSTRAINT [FK_Threads_ParentId_on_Threads_Id] FOREIGN KEY([ParentId])
REFERENCES [dbo].[Threads] ([Id])
GO
ALTER TABLE [dbo].[Threads] CHECK CONSTRAINT [FK_Threads_ParentId_on_Threads_Id]
GO
ALTER TABLE [dbo].[Threads]  WITH CHECK ADD  CONSTRAINT [FK_Threads_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Threads] CHECK CONSTRAINT [FK_Threads_Users]
GO
