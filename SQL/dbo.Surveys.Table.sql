GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Surveys](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](2000) NOT NULL,
	[StatusId] [int] NOT NULL,
	[SurveyTypeId] [int] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Surveys] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Surveys] ADD  CONSTRAINT [DF_Surveys_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Surveys] ADD  CONSTRAINT [DF_Surveys_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Surveys]  WITH CHECK ADD  CONSTRAINT [FK_Surveys_SurveyStatus] FOREIGN KEY([StatusId])
REFERENCES [dbo].[SurveyStatus] ([Id])
GO
ALTER TABLE [dbo].[Surveys] CHECK CONSTRAINT [FK_Surveys_SurveyStatus]
GO
ALTER TABLE [dbo].[Surveys]  WITH CHECK ADD  CONSTRAINT [FK_Surveys_SurveyTypes] FOREIGN KEY([SurveyTypeId])
REFERENCES [dbo].[SurveyTypes] ([Id])
GO
ALTER TABLE [dbo].[Surveys] CHECK CONSTRAINT [FK_Surveys_SurveyTypes]
GO
ALTER TABLE [dbo].[Surveys]  WITH CHECK ADD  CONSTRAINT [FK_Surveys_Users] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Surveys] CHECK CONSTRAINT [FK_Surveys_Users]
GO
