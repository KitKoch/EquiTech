GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobEducationRequirements](
	[JobId] [int] NOT NULL,
	[EducationRequirementId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
 CONSTRAINT [PK_JobEducationRequirements] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC,
	[EducationRequirementId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobEducationRequirements] ADD  CONSTRAINT [DF_JobEducationRequirements_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[JobEducationRequirements]  WITH CHECK ADD  CONSTRAINT [FK_JobEducationRequirements_EducationRequirements] FOREIGN KEY([EducationRequirementId])
REFERENCES [dbo].[EducationRequirements] ([Id])
GO
ALTER TABLE [dbo].[JobEducationRequirements] CHECK CONSTRAINT [FK_JobEducationRequirements_EducationRequirements]
GO
ALTER TABLE [dbo].[JobEducationRequirements]  WITH CHECK ADD  CONSTRAINT [FK_JobEducationRequirements_Jobs] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[JobEducationRequirements] CHECK CONSTRAINT [FK_JobEducationRequirements_Jobs]
GO
