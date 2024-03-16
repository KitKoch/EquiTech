GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkPositions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[WorkHistoryId] [int] NOT NULL,
	[WageTypeId] [int] NOT NULL,
	[JobTypeId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_WorkPositions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[WorkPositions] ADD  CONSTRAINT [DF_WorkPositions_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[WorkPositions] ADD  CONSTRAINT [DF_WorkPositions_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[WorkPositions]  WITH CHECK ADD  CONSTRAINT [FK_WorkPositions_JobTypes] FOREIGN KEY([JobTypeId])
REFERENCES [dbo].[JobTypes] ([Id])
GO
ALTER TABLE [dbo].[WorkPositions] CHECK CONSTRAINT [FK_WorkPositions_JobTypes]
GO
ALTER TABLE [dbo].[WorkPositions]  WITH CHECK ADD  CONSTRAINT [FK_WorkPositions_JobWageTypes] FOREIGN KEY([WageTypeId])
REFERENCES [dbo].[JobWageTypes] ([Id])
GO
ALTER TABLE [dbo].[WorkPositions] CHECK CONSTRAINT [FK_WorkPositions_JobWageTypes]
GO
