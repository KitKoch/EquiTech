GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobLocations](
	[JobId] [int] IDENTITY(1,1) NOT NULL,
	[LocationId] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_JobLocations] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC,
	[LocationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobLocations] ADD  CONSTRAINT [DF_JobLocations_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[JobLocations]  WITH CHECK ADD  CONSTRAINT [FK_JobLocations_Jobs] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[JobLocations] CHECK CONSTRAINT [FK_JobLocations_Jobs]
GO
ALTER TABLE [dbo].[JobLocations]  WITH CHECK ADD  CONSTRAINT [FK_JobLocations_Locations] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[JobLocations] CHECK CONSTRAINT [FK_JobLocations_Locations]
GO
ALTER TABLE [dbo].[JobLocations]  WITH CHECK ADD  CONSTRAINT [FK_JobLocations_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[JobLocations] CHECK CONSTRAINT [FK_JobLocations_Users]
GO
