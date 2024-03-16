GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobApplications](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[JobId] [int] NOT NULL,
	[ResumeFileId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[IsWithdrawn] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_JobApplications] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobApplications] ADD  CONSTRAINT [DF_JobApplications_IsWithdrawn]  DEFAULT ((0)) FOR [IsWithdrawn]
GO
ALTER TABLE [dbo].[JobApplications] ADD  CONSTRAINT [DF_JobApplications_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[JobApplications] ADD  CONSTRAINT [DF_JobApplications_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[JobApplications]  WITH CHECK ADD  CONSTRAINT [FK_JobApplications_ApplicationStatus] FOREIGN KEY([StatusId])
REFERENCES [dbo].[ApplicationStatus] ([Id])
GO
ALTER TABLE [dbo].[JobApplications] CHECK CONSTRAINT [FK_JobApplications_ApplicationStatus]
GO
ALTER TABLE [dbo].[JobApplications]  WITH CHECK ADD  CONSTRAINT [FK_JobApplications_Jobs] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[JobApplications] CHECK CONSTRAINT [FK_JobApplications_Jobs]
GO
ALTER TABLE [dbo].[JobApplications]  WITH CHECK ADD  CONSTRAINT [FK_JobApplications_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[JobApplications] CHECK CONSTRAINT [FK_JobApplications_Users]
GO
