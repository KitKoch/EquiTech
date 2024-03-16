GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GoalValues](
	[GoalId] [int] NOT NULL,
	[PersonalValueId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_GoalValues] PRIMARY KEY CLUSTERED 
(
	[GoalId] ASC,
	[PersonalValueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[GoalValues] ADD  CONSTRAINT [DF_GoalValues_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[GoalValues]  WITH CHECK ADD  CONSTRAINT [FK_GoalValues_Goals] FOREIGN KEY([GoalId])
REFERENCES [dbo].[Goals] ([Id])
GO
ALTER TABLE [dbo].[GoalValues] CHECK CONSTRAINT [FK_GoalValues_Goals]
GO
ALTER TABLE [dbo].[GoalValues]  WITH CHECK ADD  CONSTRAINT [FK_GoalValues_PersonalValues] FOREIGN KEY([PersonalValueId])
REFERENCES [dbo].[PersonalValues] ([Id])
GO
ALTER TABLE [dbo].[GoalValues] CHECK CONSTRAINT [FK_GoalValues_PersonalValues]
GO
