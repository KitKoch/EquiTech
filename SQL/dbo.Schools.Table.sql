GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schools](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nchar](100) NOT NULL,
	[LocationId] [int] NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[isVerified] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_dbo.Schools] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Schools] ADD  CONSTRAINT [DF_Schools_isDeleted]  DEFAULT ((0)) FOR [isDeleted]
GO
ALTER TABLE [dbo].[Schools] ADD  CONSTRAINT [DF_Schools_isVerified]  DEFAULT ((0)) FOR [isVerified]
GO
ALTER TABLE [dbo].[Schools] ADD  CONSTRAINT [DF_Schools_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Schools] ADD  CONSTRAINT [DF_Schools_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Schools]  WITH CHECK ADD  CONSTRAINT [FK_Schools_Locations] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[Schools] CHECK CONSTRAINT [FK_Schools_Locations]
GO
ALTER TABLE [dbo].[Schools]  WITH CHECK ADD  CONSTRAINT [FK_SchoolsCreated_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Schools] CHECK CONSTRAINT [FK_SchoolsCreated_Users]
GO
ALTER TABLE [dbo].[Schools]  WITH CHECK ADD  CONSTRAINT [FK_SchoolsModified_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Schools] CHECK CONSTRAINT [FK_SchoolsModified_Users1]
GO
