GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MeetingParticipants](
	[DailyMeetingId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[Duration] [int] NOT NULL,
	[TimeJoined] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_MeetingParticipants] PRIMARY KEY CLUSTERED 
(
	[DailyMeetingId] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MeetingParticipants] ADD  CONSTRAINT [DF_MeetingParticipants_TimeJoined]  DEFAULT (getutcdate()) FOR [TimeJoined]
GO
ALTER TABLE [dbo].[MeetingParticipants]  WITH CHECK ADD  CONSTRAINT [FK_MeetingParticipants_DailyMeetings] FOREIGN KEY([DailyMeetingId])
REFERENCES [dbo].[DailyMeetings] ([Id])
GO
ALTER TABLE [dbo].[MeetingParticipants] CHECK CONSTRAINT [FK_MeetingParticipants_DailyMeetings]
GO
ALTER TABLE [dbo].[MeetingParticipants]  WITH CHECK ADD  CONSTRAINT [FK_MeetingParticipants_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[MeetingParticipants] CHECK CONSTRAINT [FK_MeetingParticipants_Users]
GO
