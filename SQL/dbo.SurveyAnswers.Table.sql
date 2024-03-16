GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SurveyAnswers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InstanceId] [int] NOT NULL,
	[QuestionId] [int] NOT NULL,
	[AnswerOptionId] [int] NULL,
	[Answer] [nvarchar](500) NULL,
	[AnswerNumber] [bit] NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_SurveyAnswers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[SurveyAnswers] ADD  CONSTRAINT [DF_SurveyAnswers_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[SurveyAnswers] ADD  CONSTRAINT [DF_SurveyAnswers_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[SurveyAnswers]  WITH CHECK ADD  CONSTRAINT [FK_SurveyAnswers_SurveyQuestionAnswerOptions] FOREIGN KEY([AnswerOptionId])
REFERENCES [dbo].[SurveyQuestionAnswerOptions] ([Id])
GO
ALTER TABLE [dbo].[SurveyAnswers] CHECK CONSTRAINT [FK_SurveyAnswers_SurveyQuestionAnswerOptions]
GO
ALTER TABLE [dbo].[SurveyAnswers]  WITH CHECK ADD  CONSTRAINT [FK_SurveyAnswers_SurveyQuestions] FOREIGN KEY([QuestionId])
REFERENCES [dbo].[SurveyQuestions] ([Id])
GO
ALTER TABLE [dbo].[SurveyAnswers] CHECK CONSTRAINT [FK_SurveyAnswers_SurveyQuestions]
GO
ALTER TABLE [dbo].[SurveyAnswers]  WITH CHECK ADD  CONSTRAINT [FK_SurveyAnswers_SurveysInstances] FOREIGN KEY([InstanceId])
REFERENCES [dbo].[SurveysInstances] ([Id])
GO
ALTER TABLE [dbo].[SurveyAnswers] CHECK CONSTRAINT [FK_SurveyAnswers_SurveysInstances]
GO
