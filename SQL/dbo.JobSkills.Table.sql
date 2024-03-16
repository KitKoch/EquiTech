GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobSkills](
	[JobId] [int] NOT NULL,
	[SkillId] [int] NOT NULL,
	[ExperienceLevelId] [int] NOT NULL,
	[YearsRangeStart] [int] NOT NULL,
	[YearsRangeEnd] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_JobSkills] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC,
	[SkillId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobSkills] ADD  CONSTRAINT [DF_JobSkills_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[JobSkills] ADD  CONSTRAINT [DF_JobSkills_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[JobSkills]  WITH CHECK ADD  CONSTRAINT [FK_JobSkills_ExperienceLevels] FOREIGN KEY([ExperienceLevelId])
REFERENCES [dbo].[ExperienceLevels] ([Id])
GO
ALTER TABLE [dbo].[JobSkills] CHECK CONSTRAINT [FK_JobSkills_ExperienceLevels]
GO
ALTER TABLE [dbo].[JobSkills]  WITH CHECK ADD  CONSTRAINT [FK_JobSkills_Jobs] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[JobSkills] CHECK CONSTRAINT [FK_JobSkills_Jobs]
GO
ALTER TABLE [dbo].[JobSkills]  WITH CHECK ADD  CONSTRAINT [FK_JobSkills_Skills] FOREIGN KEY([SkillId])
REFERENCES [dbo].[Skills] ([Id])
GO
ALTER TABLE [dbo].[JobSkills] CHECK CONSTRAINT [FK_JobSkills_Skills]
GO
