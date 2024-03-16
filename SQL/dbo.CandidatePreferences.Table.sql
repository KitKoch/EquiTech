GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CandidatePreferences](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[MinimumPay] [decimal](18, 2) NOT NULL,
	[DesiredPay] [decimal](18, 2) NOT NULL,
	[IsHourly] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_CandidatePreferences] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CandidatePreferences] ADD  CONSTRAINT [DF_CandidatePreferences_IsHourly]  DEFAULT ((0)) FOR [IsHourly]
GO
ALTER TABLE [dbo].[CandidatePreferences] ADD  CONSTRAINT [DF_CandidatePreferences_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[CandidatePreferences] ADD  CONSTRAINT [DF_CandidatePreferences_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[CandidatePreferences] ADD  CONSTRAINT [DF_CandidatePreferences_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[CandidatePreferences]  WITH CHECK ADD  CONSTRAINT [FK_CandidatePreferences_CandidatePreferences] FOREIGN KEY([Id])
REFERENCES [dbo].[CandidatePreferences] ([Id])
GO
ALTER TABLE [dbo].[CandidatePreferences] CHECK CONSTRAINT [FK_CandidatePreferences_CandidatePreferences]
GO
