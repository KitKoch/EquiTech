GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DailyMeetings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[HostId] [int] NOT NULL,
	[DailyId] [nvarchar](255) NOT NULL,
	[RoomName] [nvarchar](100) NOT NULL,
	[Duration] [int] NOT NULL,
	[StartTime] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_DailyMeetings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DailyMeetings] ADD  CONSTRAINT [DF_DailyMeetings_StartTime]  DEFAULT (getutcdate()) FOR [StartTime]
GO
ALTER TABLE [dbo].[DailyMeetings]  WITH CHECK ADD  CONSTRAINT [FK_DailyMeetings_Users] FOREIGN KEY([HostId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[DailyMeetings] CHECK CONSTRAINT [FK_DailyMeetings_Users]
GO
