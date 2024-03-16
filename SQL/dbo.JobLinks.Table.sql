GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobLinks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UniqueCode] [varchar](64) NOT NULL,
	[JobId] [int] NOT NULL,
	[TouchCounter] [int] NOT NULL,
	[CompleteCounter] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_JobLinks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobLinks] ADD  CONSTRAINT [DF_JobLinks_TouchCounter]  DEFAULT ((0)) FOR [TouchCounter]
GO
ALTER TABLE [dbo].[JobLinks] ADD  CONSTRAINT [DF_JobLinks_CompleteCounter]  DEFAULT ((0)) FOR [CompleteCounter]
GO
ALTER TABLE [dbo].[JobLinks] ADD  CONSTRAINT [DF_JobLinks_IsActive]  DEFAULT ((0)) FOR [IsActive]
GO
ALTER TABLE [dbo].[JobLinks] ADD  CONSTRAINT [DF_JobLinks_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[JobLinks] ADD  CONSTRAINT [DF_JobLinks_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[JobLinks] ADD  CONSTRAINT [DF_JobLinks_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[JobLinks]  WITH CHECK ADD  CONSTRAINT [FK_JobLinks_Jobs] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[JobLinks] CHECK CONSTRAINT [FK_JobLinks_Jobs]
GO
ALTER TABLE [dbo].[JobLinks]  WITH CHECK ADD  CONSTRAINT [FK_JobLinks_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[JobLinks] CHECK CONSTRAINT [FK_JobLinks_Users]
GO
ALTER TABLE [dbo].[JobLinks]  WITH CHECK ADD  CONSTRAINT [FK_JobLinks_Users1] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[JobLinks] CHECK CONSTRAINT [FK_JobLinks_Users1]
GO
