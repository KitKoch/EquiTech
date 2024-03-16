GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CandidateLocations](
	[UserId] [int] NOT NULL,
	[LocationId] [int] NOT NULL,
	[PreferenceId] [int] NOT NULL,
	[SortOrder] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[IsNegotiable] [bit] NOT NULL,
 CONSTRAINT [PK_CabdidateLocations_1] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LocationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CandidateLocations] ADD  CONSTRAINT [DF_CandidateLocations_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[CandidateLocations] ADD  CONSTRAINT [DF_CandidateLocations_IsNegotiable]  DEFAULT ((0)) FOR [IsNegotiable]
GO
ALTER TABLE [dbo].[CandidateLocations]  WITH CHECK ADD  CONSTRAINT [FK_CabdidateLocations_CandidatePreferences] FOREIGN KEY([PreferenceId])
REFERENCES [dbo].[CandidatePreferences] ([Id])
GO
ALTER TABLE [dbo].[CandidateLocations] CHECK CONSTRAINT [FK_CabdidateLocations_CandidatePreferences]
GO
ALTER TABLE [dbo].[CandidateLocations]  WITH CHECK ADD  CONSTRAINT [FK_CabdidateLocations_Locations] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[CandidateLocations] CHECK CONSTRAINT [FK_CabdidateLocations_Locations]
GO
ALTER TABLE [dbo].[CandidateLocations]  WITH CHECK ADD  CONSTRAINT [FK_CabdidateLocations_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[CandidateLocations] CHECK CONSTRAINT [FK_CabdidateLocations_Users]
GO
