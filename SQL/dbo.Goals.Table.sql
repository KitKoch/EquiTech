GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Goals](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Statement] [nvarchar](500) NOT NULL,
	[PreferenceId] [int] NOT NULL,
	[Priority] [int] NOT NULL,
	[YearsToGoal] [int] NOT NULL,
	[IsCompleted] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Goals] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Goals] ADD  CONSTRAINT [DF_Goals_YearsToGoal]  DEFAULT ((1)) FOR [YearsToGoal]
GO
ALTER TABLE [dbo].[Goals] ADD  CONSTRAINT [DF_Goals_IsCompleted]  DEFAULT ((0)) FOR [IsCompleted]
GO
ALTER TABLE [dbo].[Goals] ADD  CONSTRAINT [DF_Goals_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Goals] ADD  CONSTRAINT [DF_Goals_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Goals] ADD  CONSTRAINT [DF_Goals_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Goals]  WITH CHECK ADD  CONSTRAINT [FK_Goals_CandidatePreferences] FOREIGN KEY([PreferenceId])
REFERENCES [dbo].[CandidatePreferences] ([Id])
GO
ALTER TABLE [dbo].[Goals] CHECK CONSTRAINT [FK_Goals_CandidatePreferences]
GO
ALTER TABLE [dbo].[Goals]  WITH CHECK ADD  CONSTRAINT [FK_Goals_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Goals] CHECK CONSTRAINT [FK_Goals_Users]
GO
